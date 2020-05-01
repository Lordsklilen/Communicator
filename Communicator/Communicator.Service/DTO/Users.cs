using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;
using Microsoft.AspNetCore.Http;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateUser : RequestBase
    {
        public string email;
        public string password;
        public UserRole role;
    }

    public class RequestGetUser : RequestBase
    {
    }

    public class RequestUpdateUser
    {
        public IFormFile File { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class RequestGetUsers : RequestBase
    {
        public string word;
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
        public ApplicationUser[] SearchedFriends;
    }

    public class ResponseGetUser : ResponseBase
    {
        public string UserName;
        public ApplicationUser User;
    }

    public class ResponseUpdateUser : ResponseBase
    {
        public ApplicationUser User;
    }

    public class ResponseAuthenticateUser : ResponseBase
    {
        public ApplicationUser User;
        public bool IsSignedIn;
    }
}
