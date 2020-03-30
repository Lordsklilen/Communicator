using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;


namespace Communicator.DataProvider.Models
{
    public class Channel
    {
        public int ChannelId { get; set; }
        public string ChannelName { get; set; }
        public bool isGroupChannel { get; set; }
        public ICollection<Message> Messages { get; set; }
        [JsonIgnore]
        public ICollection<ApplicationUserChannel> ApplicationUserChannels { get; set; }

        [NotMapped]
        public string[] UserIds
        {
            get { return ApplicationUserChannels.Select(x => x.UserId).ToArray(); }
        }

    }
}
