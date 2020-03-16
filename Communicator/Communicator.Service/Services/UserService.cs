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

        public UserService(RoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request)
        {
            var response = new ResponseAuthenticateUser()
            {
                message = $"Authentication for {request.email} has been succesfull",
                status = ResponseStatus.Success
            };
            return response;
        }

        public ResponseCreateUser CreateUser(RequestCreateUser request)
        {
            var response = new ResponseCreateUser()
            {
                message = $"Authentication for {request.email} has been succesfull",
                status = ResponseStatus.Success
            };
            return response;
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
    }
}
