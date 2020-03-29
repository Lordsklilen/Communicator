using Communicator.Service.DTO;

namespace Communicator.Service.PublicInterfaces
{
    public interface IChannelService
    {
        ResponseCreateChannel CreateChannel(RequestCreateChannel r);
        ResponseGetUserChannels GetChannelsForUser(RequestGetUserChannels r);
    }
}
