using Communicator.DataProvider.Repositories;
using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;
using System;
using System.Threading.Tasks;

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

        public async Task<bool> SignOut()
        {
            await _userRepository.SignOutAsync();
            return true;
        }
        public async Task<ResponseCreateUser> CreateUser(RequestCreateUser r)
        {
            try
            {
                await _roleRepository.CreateDefaultRoles();

                var isCreated = await _userRepository.CreateUser(r.userName, r.email, r.password);

                if (isCreated)
                {
                    var user = await GetUser(new RequestGetUser()
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
        public async Task<ResponseGetUser> GetUser(RequestGetUser request)
        {
            try
            {
                var user = await _userRepository.GetUser(request.UserName);
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
        public async Task<ResponseAuthenticateUser> AuthenticateUser(RequestAuthenticateUser request)
        {
            try
            {
                var user = await _userRepository.GetUser(request.userName);
                var result = await _userRepository.SignInUser(user, request.password);
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
        public async Task<ResponseBase> CreateRole(string roleName)
        {
            try
            {
                var created = await _roleRepository.CreateRole(roleName);
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
