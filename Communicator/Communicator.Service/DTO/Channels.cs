using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;

namespace Communicator.Service.DTO
{
    public class RequestCreateChannel
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
