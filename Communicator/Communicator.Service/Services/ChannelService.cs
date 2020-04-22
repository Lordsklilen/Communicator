using Communicator.DataProvider.Models;
using Communicator.DataProvider.Repositories;
using Communicator.Service.DTO;
using Communicator.Service.DTO.Base;
using Communicator.Service.PublicInterfaces;
using System;
using System.Collections.Generic;

namespace Communicator.Service.Services
{
    public class ChannelService : IChannelService
    {
        private readonly ChannelRepository _channelRepository;
        private readonly UserRepository _userRepository;

        public ChannelService(ChannelRepository channelRepository, UserRepository userRepository)
        {
            _channelRepository = channelRepository;
            _userRepository = userRepository;
        }
        public ResponseCreateChannel CreateChannel(RequestCreateChannel r)
        {
            try
            {
                var users = _userRepository.GetById(r.userIds);
                var channel = _channelRepository.Create(users, r.channelname);
                var channels = _channelRepository.GetUserChannels(r.UserId);
                if (channel != null)
                {

                    return new ResponseCreateChannel()
                    {
                        message = $"Chanel \"{r.channelname}\" been created succesfully",
                        status = ResponseStatus.Success,
                        channels = channels
                    };
                }
                return new ResponseCreateChannel()
                {
                    message = $"Chanel \"{r.channelname}\" cannot be created due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseCreateChannel()
                {
                    message = $"Chanel \"{r.channelname}\" cannot be created.",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseGetUserChannels GetChannelsForUser(RequestGetUserChannels r)
        {
            try
            {
                var channels = _channelRepository.GetUserChannels(r.UserId);

                if (channels != null)
                {

                    return new ResponseGetUserChannels()
                    {
                        message = $"Channels \"{r.UserId}\" get  succesfully",
                        status = ResponseStatus.Success,
                        channels = channels
                    };
                }
                return new ResponseGetUserChannels()
                {
                    message = $"Cannot get chanenls for user  \"{r.UserId}\" due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseGetUserChannels()
                {
                    message = $"Cannot get chanenls for user  \"{r.UserId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseSelectChannel SelectChannel(RequestSelectChannel r)
        {
            try
            {
                var channel = _channelRepository.SelectChannel(r.ChannelId);

                if (channel != null)
                {

                    return new ResponseSelectChannel()
                    {
                        message = $"Channels \"{r.UserId}\" selected succesfully",
                        status = ResponseStatus.Success,
                        Channel = channel
                    };
                }
                return new ResponseSelectChannel()
                {
                    message = $"Cannot SelectChannel for user  \"{r.UserId}\" due to unknown problem.",
                    status = ResponseStatus.Error
                };
            }
            catch (Exception ex)
            {
                return new ResponseSelectChannel()
                {
                    message = $"Cannot SelectChannel for user  \"{r.UserId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseSendMessage SendMessage(RequestSendMessage r)
        {
            try
            {
                var sender = _userRepository.GetById(r.UserId);
                _channelRepository.SendMessage(sender, r.ChannelId, r.message);


                return new ResponseSendMessage()
                {
                    message = $"Message sent from  \"{r.UserId}\"",
                    status = ResponseStatus.Success,
                };
            }
            catch (Exception ex)
            {
                return new ResponseSendMessage()
                {
                    message = $"Cannot send message for user  \"{r.UserId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseUpdateMessages UpdateMessages(RequestUpdateMessages r)
        {
            try
            {
                var messages = _channelRepository.SelectMessages(r.ChannelId, r.date);
                var channels = _channelRepository.GetUserChannels(r.UserId);

                return new ResponseUpdateMessages()
                {
                    message = $"Message updated from  \"{r.UserId}\", new messages: {messages.Count} ",
                    status = ResponseStatus.Success,
                    Messages = messages,
                    Channels = channels

                };
            }
            catch (Exception ex)
            {
                return new ResponseUpdateMessages()
                {
                    message = $"Cannot get new messages from channel \"{r.ChannelId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponseLoadPrevious LoadPrevious(RequestLoadPrevious r)
        {
            try
            {
                var messages = _channelRepository.SelectPreviousMessages(r.ChannelId, r.date);

                return new ResponseLoadPrevious()
                {
                    message = $"Message updated from  \"{r.UserId}\", new messages: {messages.Count} ",
                    status = ResponseStatus.Success,
                    Messages = messages

                };
            }
            catch (Exception ex)
            {
                return new ResponseLoadPrevious()
                {
                    message = $"Cannot get new messages from channel \"{r.ChannelId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }

        public ResponsDeleteChannel DeleteChannel(RequestDeleteChannel r)
        {
            try
            {
                _channelRepository.DeleteChannel(r.ChannelId);
                var channels = _channelRepository.GetUserChannels(r.UserId);
                return new ResponsDeleteChannel()
                {
                    message = $"Channel \"{r.ChannelId}\", deleted",
                    status = ResponseStatus.Success,
                    Channels = channels

                };
            }
            catch (Exception ex)
            {
                return new ResponsDeleteChannel()
                {
                    message = $"Cannot delete channel \"{r.ChannelId}\".",
                    exception = ex,
                    status = ResponseStatus.Error
                };
            }
        }
    }
}
