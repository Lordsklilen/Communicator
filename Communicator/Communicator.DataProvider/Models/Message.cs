using System;

namespace Communicator.DataProvider.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public ApplicationUser Sender { get; set; }
        public string Content { get; set; }
        public DateTime SentTime { get; set; }
    }
}
