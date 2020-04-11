using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Communicator.DataProvider.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        [JsonIgnore]
        public ApplicationUser Sender { get; set; }
        public string Content { get; set; }
        public DateTime SentTime { get; set; }

        [NotMapped]
        public string UserId
        {
            get { return Sender.Id; }
        }
    }
}
