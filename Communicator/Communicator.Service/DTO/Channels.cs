﻿using Communicator.DataProvider.Models;
using Communicator.Service.DTO.Base;
using System;
using System.Collections.Generic;

namespace Communicator.Service.DTO
{
    //Requests
    public class RequestCreateChannel : RequestBase
    {
        public string[] userIds;
        public string channelname;
    }
    public class RequestGetUserChannels : RequestBase { }

    public class RequestSelectChannel : RequestBase
    {
        public int ChannelId;
    }

    public class RequestSendMessage : RequestBase
    {
        public int ChannelId;
        public string message;
    }

    public class RequestUpdateMessages : RequestBase
    {
        public int ChannelId;
        public DateTime date;
    }
    public class RequestLoadPrevious : RequestBase
    {
        public int ChannelId;
        public DateTime date;
    }
    public class RequestDeleteChannel : RequestBase
    {
        public int ChannelId;
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

    public class ResponseSelectChannel : ResponseBase
    {
        public Channel Channel;
    }

    public class ResponseSendMessage : ResponseBase { }
    public class ResponseUpdateMessages : ResponseBase
    {
        public ICollection<Message> Messages;
        public ICollection<Channel> Channels;
    }
    public class ResponseLoadPrevious : ResponseBase
    {
        public ICollection<Message> Messages;
    }
    public class ResponsDeleteChannel : ResponseBase
    {
        public ICollection<Channel> Channels;
    }
}
