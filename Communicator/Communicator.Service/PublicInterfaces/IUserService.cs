using Communicator.Service.DTO;

namespace Communicator.Service.PublicInterfaces
{
    public interface IUserService
    {
        ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request);
        ResponseCreateUser CreateUser(RequestCreateUser request);
    }
}
