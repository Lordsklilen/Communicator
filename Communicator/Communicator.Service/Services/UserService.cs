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

        public async Task<ResponseAuthenticateUser> AuthenticateUser(RequestAuthenticateUser request)
        {

            try
            {
                var result = await _userRepository.AuthenticateUser(request.userName, request.password);
                if (result)
                {
                    return new ResponseAuthenticateUser()
                    {
                        message = $"User {request.userName} is authenticated.",
                        status = ResponseStatus.Success
                    };
                }
                return new ResponseAuthenticateUser()
                {
                    message = $"User {request.userName} cannot be authenticated.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseAuthenticateUser()
                {
                    message = $"User {request.userName} cannot be authenticated. Message: {ex.Message}, Call stack:{ex.StackTrace}",
                    status = ResponseStatus.Error
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
                        message = $"Role {roleName} been created succesfully",
                        status = ResponseStatus.Success
                    };
                }
                return new ResponseBase()
                {
                    message = $"Role {roleName} cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };

            }
            catch (Exception ex)
            {
                return new ResponseBase()
                {
                    message = $"Role {roleName} cannot be created. Message: {ex.Message}, Call stack:{ex.StackTrace}",
                    status = ResponseStatus.Error
                };
            }
        }
        //USERS
        public async Task<ResponseCreateUser> CreateUser(RequestCreateUser r)
        {
            try
            {
                await _roleRepository.CreateDefaultRoles();

                var created = await _userRepository.CreateUser(r.userName, r.email, r.password);
                if (created.Succeeded)
                {
                    return new ResponseCreateUser()
                    {
                        message = $"User {r.userName} been created succesfully",
                        status = ResponseStatus.Success
                    };
                }
                return new ResponseCreateUser()
                {
                    message = $"User {r.userName} cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseCreateUser()
                {
                    message = $"User {r.userName} cannot be created. Message: {ex.Message}, Call stack:{ex.StackTrace}",
                    status = ResponseStatus.Error
                };
            }
        }

    }
}
