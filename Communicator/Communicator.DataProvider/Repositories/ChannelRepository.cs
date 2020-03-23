using Communicator.DataProvider.Models;
using System.Collections.Generic;

namespace Communicator.DataProvider.Repositories
{
    public class ChannelRepository
    {
        private readonly ApplicationDbContext _context;
        public ChannelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Channel Create(HashSet<ApplicationUser> Users, string channelName)
        {

            var channel = new Channel()
            {
                ChannelName = channelName,
            };
            foreach (var user in Users)
            {
                var link = new ApplicationUserChannel()
                {
                    Channel = channel,
                    User = user
                };
                _context.Add(link);
            }
            _context.Add(channel);
            _context.SaveChanges();
            return channel;
        }
    }
}
