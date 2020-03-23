using System.Collections.Generic;

namespace Communicator.DataProvider.Identity
{
    public class Channel
    {
        public int ChannelId { get; set; }
        public string ChannelName { get; set; }
        public ICollection<Message> Messages { get; set; }
        public ICollection<ApplicationUserChannel> ApplicationUserChannels { get; set; }



    }
}
