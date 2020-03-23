using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateUser : RequestBase
    {
        public string email;
        public string password;
    }

    public class RequestGetUser : RequestBase
    {
    }

    public class RequestGetUsers
    {
        public string word;
        public string IdUser;
    }

    public class RequestAuthenticateUser : RequestBase
    {
        public string password;
    }

    //Responses
    public class ResponseCreateUser : ResponseBase
    {
        public ApplicationUser User;
    }
    public class ResponseGetUsers : ResponseBase
    {
        public ApplicationUser[] users;
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
