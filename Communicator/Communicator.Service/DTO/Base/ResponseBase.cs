using System;

namespace Communicator.Service.DTO.Base
{
    public class ResponseBase
    {
        public string message;
        public ResponseStatus status;
        public Exception exception;
    }
}
