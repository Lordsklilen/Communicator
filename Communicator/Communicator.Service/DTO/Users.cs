using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateUser
    {
        public string userName;
        public string email;
        public string password;
    }

    public class RequestGetUser
    {
        public string UserName;
    }

    public class RequestAuthenticateUser
    {
        public string userName;
        public string password;
    }

    //Responses
    public class ResponseCreateUser : ResponseBase
    {
        public ApplicationUser User;
    }

    public class ResponseGetUser : ResponseBase
    {
        public string UserName;
        public ApplicationUser User;
    }

    public class ResponseAuthenticateUser : ResponseBase
    {
        public ApplicationUser User;
        public bool IsSignedIn;
    }
}
