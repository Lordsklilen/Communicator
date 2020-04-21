import * as React from 'react';
import { Label, FormGroup, Input, NavbarToggler, NavbarBrand, Container, Navbar, NavItem, Collapse, NavLink } from 'reactstrap';
import * as SettingsStore from '../store/Settings';
import { SettingsState } from '../store/Settings';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import { CookiesManager } from '../Managers/CookiesManager'
import { Link } from 'react-router-dom';


type SettingsProps =
    SettingsState &
    typeof SettingsStore.actionCreators &
    RouteComponentProps<{ email: string }>;

class SettingsComponent extends React.Component<SettingsProps, SettingsState> {

    state: Readonly<SettingsState> = {
        UserName: "",
        User: null,
        errorMessage: "",
        ConfirmationField: "",
    };

    componentDidMount() {
        let username = CookiesManager.GetUserName();
        if (username === "") {
            this.props.history.push("/");
        }
        this.props.GetUser(username);
        this.setState({ UserName: username })
        console.log("component Mounted, fetching data for user" + username)
    }

    componentWillUnmount() {
        this.setState({
            User: null,
        })
    }

    public render() {
        let Email = "";
        if (this.props.User !== null)
            Email = this.props.User.Email;
        return (
            <React.Fragment>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/messages">Communicator</NavbarBrand>
                            <NavbarToggler className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/messages">Hello {this.state.UserName}
                                            <img className="profilImage" src={"/User/GetImage/" + this.state.UserName} alt="Profile" />
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark LogOut" onClick={this.LogOut.bind(this)} to="/">Log out</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>

                <div className="LoginForm">
                    <title title="Communicator" />
                    <h1>Update your data</h1>
                    <div className="Register">
                        <FormGroup>
                            <Label>User name</Label>
                            <Input
                                autoFocus
                                id="registerUserName"
                                type="text"
                                value={this.state.UserName}
                                name="UserId"
                                disabled={true}
                            />
                        </FormGroup>
                        <FormGroup>

                            <Label>Email</Label>
                            <Input
                                autoFocus
                                id="updateEmail"
                                type="email"
                                name="Email"
                                placeholder={Email}
                            />
                        </FormGroup>
                        <img className="bigProfilImage" src={"/User/GetImage/" + this.state.UserName} alt="Profile" />
                        <FormGroup>
                            <Label>Current Profile Image</Label>
                            <Input
                                autoFocus
                                id="uploadImage"
                                type="file"
                                name="Image"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Old Password</Label>
                            <Input
                                id="oldPassword"
                                name="OldPassword"
                                type="password" />
                        </FormGroup>
                        <FormGroup>
                            <Label>New Password</Label>
                            <Input
                                id="newPassword"
                                name="NewPassword"
                                type="password" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm new password</Label>
                            <Input
                                id="newPasswordConfirm"
                                type="password" />
                        </FormGroup>
                        <Label className="errorField">{this.props.errorMessage}</Label>
                        <Label className="errorField">{this.state.errorMessage}</Label>
                        <Label className="ConfirmationField">{this.props.ConfirmationField}</Label>
                        <Input type="button" onClick={this.UpdateUser.bind(this)} value="Update User" />

                    </div>
                </div>
            </React.Fragment>
        );
    }

    LogOut(event: React.FormEvent<HTMLInputElement>) {
        this.props.LogOut();
        this.setState({ UserName: "" });
        CookiesManager.FillUserName("");
        this.props.history.push('/');
    }
    UpdateUser(event: React.FormEvent<HTMLInputElement>) {
        var email = (document.getElementById("updateEmail") as HTMLInputElement).value;
        var oldpassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
        var newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
        var newPasswordConfirm = (document.getElementById("newPasswordConfirm") as HTMLInputElement).value;
        if (email === "" && this.props.User !== null) {
            email = this.props.User.Email;
        }
        if (newPassword !== newPasswordConfirm) {
            this.setState({
                errorMessage: "New password do not match",
            })
            return;
        }
        this.setState({
            errorMessage: "",
        })

        var inputFile = (document.getElementById("uploadImage") as HTMLInputElement)
        const formData = new FormData();
        formData.set('UserId', this.state.UserName);
        formData.set('Email', email);
        formData.set('OldPassword', oldpassword);
        formData.set('NewPassword', newPassword);
        if (inputFile != null) {
            let files = inputFile.files as FileList;
            formData.set('File', files[0]);
        }
        this.props.UpdateUser(formData);
    }
}

export default connect(
    (state: ApplicationState) => state.settings,
    SettingsStore.actionCreators
)(SettingsComponent as any);
