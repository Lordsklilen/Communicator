using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateChannel : RequestBase
    {
        public string[] userIds;
        public string channelname;
    }

    //Responses
    public class ResponseCreateChannel : ResponseBase
    {
        public Channel channel;
    }
}
