using Communicator.DataProvider.Repositories;
using Communicator.Service.DTO;
using Communicator.Service.DTO.Base;
using Communicator.Service.PublicInterfaces;
using System;

namespace Communicator.Service.Services
{
    public class UserService : IUserService
    {
        private readonly RoleRepository _roleRepository;
        private readonly UserRepository _userRepository;

        public UserService(RoleRepository roleRepository, UserRepository userRepository)
        {
            _roleRepository = roleRepository;
            _userRepository = userRepository;
        }


        //USERS

        public void SignOutAsync()
        {
            _userRepository.SignOutAsync();
        }
        public ResponseCreateUser CreateUser(RequestCreateUser r)
        {
            try
            {
                _roleRepository.CreateDefaultRoles();
                var isCreated = _userRepository.Create(r.userName, r.email, r.password);
                if (isCreated)
                {
                    var user = GetUser(new RequestGetUser()
                    {
                        UserName = r.userName
                    });
                    return new ResponseCreateUser()
                    {
                        message = $"User \"{r.userName}\" been created succesfully",
                        status = ResponseStatus.Success,
                        User = user.User
                    };
                }
                return new ResponseCreateUser()
                {
                    message = $"User \"{r.userName}\" cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseCreateUser()
                {
                    message = $"User \"{r.userName}\" cannot be created.",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseGetUser GetUser(RequestGetUser request)
        {
            try
            {
                var user = _userRepository.GetByName(request.UserName);
                if (user != null)
                {
                    return new ResponseGetUser()
                    {
                        message = $"User \"{user.UserName}\" is correct.",
                        status = ResponseStatus.Success,
                        User = user
                    };
                }
                return new ResponseGetUser()
                {
                    message = $"User \"{request.UserName}\" cannot be get.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseGetUser()
                {
                    message = $"User \"{request.UserName}\" cannot be get.",
                    status = ResponseStatus.Error,
                    exception = ex
                };
            }
        }
        public ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request)
        {
            try
            {
                var user = _userRepository.GetByName(request.userName);
                var result = _userRepository.SignIn(user, request.password);
                if (result)
                {
                    return new ResponseAuthenticateUser()
                    {
                        message = $"User \"{request.userName}\" is authenticated.",
                        status = ResponseStatus.Success,
                        IsSignedIn = result,
                        User = user
                    };
                }
                return new ResponseAuthenticateUser()
                {
                    message = $"User \"{request.userName}\" cannot be authenticated.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseAuthenticateUser()
                {
                    message = $"User \"{request.userName}\" cannot be authenticated.",
                    status = ResponseStatus.Error,
                    exception = ex
                };
            }
        }
        //ROLES
        public ResponseBase CreateRole(string roleName)
        {
            try
            {
                var created = _roleRepository.Create(roleName);
                if (created.Succeeded)
                {
                    return new ResponseBase()
                    {
                        message = $"Role \"{roleName}\" been created succesfully",
                        status = ResponseStatus.Success
                    };
                }
                return new ResponseBase()
                {
                    message = $"Role \"{roleName}\" cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };

            }
            catch (Exception ex)
            {
                return new ResponseBase()
                {
                    message = $"Role \"{roleName}\" cannot be created.",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }
    }
}
