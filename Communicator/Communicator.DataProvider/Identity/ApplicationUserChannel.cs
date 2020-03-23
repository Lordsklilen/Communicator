namespace Communicator.DataProvider.Identity
{
    public class ApplicationUserChannel
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int ChannelId { get; set; }
        public Channel Channel { get; set; }
    }
}
