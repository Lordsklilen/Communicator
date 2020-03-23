using Communicator.DataProvider.Repositories;
using Communicator.Service.DTO;
using Communicator.Service.DTO.Base;
using Communicator.Service.PublicInterfaces;
using System;
using System.Linq;

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
                var isCreated = _userRepository.Create(r.UserId, r.email, r.password);
                if (isCreated)
                {
                    var user = GetUser(new RequestGetUser()
                    {
                        UserId = r.UserId
                    });
                    return new ResponseCreateUser()
                    {
                        message = $"User \"{r.UserId}\" been created succesfully",
                        status = ResponseStatus.Success,
                        User = user.User
                    };
                }
                return new ResponseCreateUser()
                {
                    message = $"User \"{r.UserId}\" cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseCreateUser()
                {
                    message = $"User \"{r.UserId}\" cannot be created.",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseGetUser GetUser(RequestGetUser request)
        {
            try
            {
                var user = _userRepository.GetById(request.UserId);
                if (user != null)
                {
                    return new ResponseGetUser()
                    {
                        message = $"User \"{user.Id}\" is correct.",
                        status = ResponseStatus.Success,
                        User = user
                    };
                }
                return new ResponseGetUser()
                {
                    message = $"User \"{request.UserId}\" cannot be get.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseGetUser()
                {
                    message = $"User \"{request.UserId}\" cannot be get.",
                    status = ResponseStatus.Error,
                    exception = ex
                };
            }
        }

        public ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request)
        {
            try
            {
                var user = _userRepository.GetById(request.UserId);
                var result = _userRepository.SignIn(user, request.password);
                if (result)
                {
                    return new ResponseAuthenticateUser()
                    {
                        message = $"User \"{request.UserId}\" is authenticated.",
                        status = ResponseStatus.Success,
                        IsSignedIn = result,
                        User = user
                    };
                }
                return new ResponseAuthenticateUser()
                {
                    message = $"User \"{request.UserId}\" cannot be authenticated.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseAuthenticateUser()
                {
                    message = $"User \"{request.UserId}\" cannot be authenticated.",
                    status = ResponseStatus.Error,
                    exception = ex
                };
            }
        }

        //Friends List
        public ResponseGetUsers GetUsersById(RequestGetUsers request)
        {
            try
            {
                var users = _userRepository.GetUsersById(request.word);
                if (users != null)
                {
                    return new ResponseGetUsers()
                    {
                        message = $"Users \"{request.word}\" searched succesfully",
                        status = ResponseStatus.Success,
                        users = users.ToArray()
                    };
                }
                return new ResponseGetUsers()
                {
                    message = $"Users \"{request.word}\" cannot be found.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseGetUsers()
                {
                    message = $"User \"{request.word}\" cannot be found.",
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
