using Communicator.Service.DTO;
using Communicator.Service.DTO.Base;

namespace Communicator.Service.PublicInterfaces
{
    public interface IUserService
    {
        ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request);
        ResponseCreateUser CreateUser(RequestCreateUser request);
        ResponseBase CreateRole(string roleName);
        ResponseGetUser GetUser(RequestGetUser request);
        ResponseUpdateUser UpdateUser(RequestUpdateUser request);
        void SignOutAsync();
        ResponseGetUsers GetUsersById(RequestGetUsers request);
        string GetProfileImage(string UserId);
    }
}
