using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;
using System.Collections.Generic;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateChannel : RequestBase
    {
        public string[] userIds;
        public string channelname;
    }
    public class RequestGetUserChannels : RequestBase
    {
    }


    //Responses
    public class ResponseCreateChannel : ResponseBase
    {
        public ICollection<Channel> channels;
    }
    public class ResponseGetUserChannels : ResponseBase
    {
        public ICollection<Channel> channels;
    }
}
