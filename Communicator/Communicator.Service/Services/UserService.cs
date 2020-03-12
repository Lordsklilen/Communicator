using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;

namespace Communicator.Service.Services
{
    public class UserService : IUserService
    {
        public ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request)
        {
            var response = new ResponseAuthenticateUser()
            {
                message = $"Authentication for {request.email} has been succesfull",
                status = ResponseStatus.Success
            };
            return response;
        }
    }
}
