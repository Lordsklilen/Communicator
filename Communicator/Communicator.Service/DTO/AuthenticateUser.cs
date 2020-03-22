using Communicator.DataProvider.Identity;

namespace Communicator.Service.DTO
{
    public class RequestAuthenticateUser
    {
        public string userName;
        public string password;
    }

    public class ResponseAuthenticateUser : ResponseBase
    {
        public ApplicationUser User;
        public bool IsSignedIn;
    }
}
