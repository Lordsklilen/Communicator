namespace Communicator.Service.DTO
{
    public class RequestAuthenticateUser
    {
        public string email;
        public string password;
    }

    public class ResponseAuthenticateUser
    {
        public string message;
        public ResponseStatus status;
    }
}
