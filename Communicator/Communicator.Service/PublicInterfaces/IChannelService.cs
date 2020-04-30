using Communicator.Service.DTO;

namespace Communicator.Service.PublicInterfaces
{
    public interface IChannelService
    {
        ResponseCreateChannel CreateChannel(RequestCreateChannel r);
        ResponseGetUserChannels GetChannelsForUser(RequestGetUserChannels r);
        ResponseSelectChannel SelectChannel(RequestSelectChannel r);
        ResponseSendMessage SendMessage(RequestSendMessage r);
        ResponseUpdateMessages UpdateMessages(RequestUpdateMessages r);
        ResponseLoadPrevious LoadPrevious(RequestLoadPrevious r);
        ResponsDeleteChannel DeleteChannel(RequestDeleteChannel r);
        string GetChannelImage();
    }
}
