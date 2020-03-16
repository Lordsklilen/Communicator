using Communicator.Service.DTO;
using System.Threading.Tasks;

namespace Communicator.Service.PublicInterfaces
{
    public interface IUserService
    {
        ResponseAuthenticateUser AuthenticateUser(RequestAuthenticateUser request);
        ResponseCreateUser CreateUser(RequestCreateUser request);
        Task<ResponseBase> CreateRole(string roleName);
    }
}
