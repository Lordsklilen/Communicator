using Communicator.Service.DTO;
using System.Threading.Tasks;

namespace Communicator.Service.PublicInterfaces
{
    public interface IUserService
    {
        Task<ResponseAuthenticateUser> AuthenticateUser(RequestAuthenticateUser request);
        Task<ResponseCreateUser> CreateUser(RequestCreateUser request);
        Task<ResponseBase> CreateRole(string roleName);
    }
}
