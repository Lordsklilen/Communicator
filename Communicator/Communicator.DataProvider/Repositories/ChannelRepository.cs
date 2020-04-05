using Communicator.DataProvider.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
        public ICollection<Channel> GetUserChannels(string UserId)
        {
            var channels = _context.Channels
                .Include(x => x.ApplicationUserChannels)
                .ThenInclude(x => x.Channel)
                .Where(x => x.ApplicationUserChannels.Any(y => y.UserId == UserId))
                .ToList();
            return channels;
        }

        public Channel SelectChannel(int channelId)
        {
            var channel = _context.Channels
                .Include(p => p.ApplicationUserChannels)
                .Include(p => p.Messages)
                .First(x => x.ChannelId == channelId);
            return channel;
        }
    }
}
