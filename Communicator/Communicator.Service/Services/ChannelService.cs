using Communicator.DataProvider.Repositories;
using Communicator.Service.DTO;
using Communicator.Service.DTO.Base;
using Communicator.Service.PublicInterfaces;
using System;

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
                var users = _userRepository.GetByName(r.userIds);
                var channel = _channelRepository.Create(users, r.channelname);

                if (channel != null)
                {

                    return new ResponseCreateChannel()
                    {
                        message = $"Chanel \"{r.channelname}\" been created succesfully",
                        status = ResponseStatus.Success,
                        channel = channel
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

        
    }
}
