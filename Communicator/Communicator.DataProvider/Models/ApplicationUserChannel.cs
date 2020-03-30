namespace Communicator.DataProvider.Models
{
    public class ApplicationUserChannel
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int ChannelId { get; set; }
        public Channel Channel { get; set; }
    }
}
