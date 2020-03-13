namespace Communicator.Service.DTO
{
    public class RequestCreateUser
    {
        public string email;
        public string password;
    }

    public class ResponseCreateUser
    {
        public string message;
        public ResponseStatus status;
    }
}
