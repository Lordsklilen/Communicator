using Communicator.DataProvider.Identity;

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
}
