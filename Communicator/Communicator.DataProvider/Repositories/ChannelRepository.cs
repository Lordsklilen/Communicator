using Communicator.DataProvider.Models;
using Microsoft.EntityFrameworkCore;
using System;
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
                isGroupChannel = Users.Count > 2
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
            var query = _context.Channels
                 .Include(x => x.ApplicationUserChannels)
                 .Where(x => x.ApplicationUserChannels.Any(y => y.UserId == UserId))
                 .Select(c => new
                 {
                     channel = c,
                     Messages = c.Messages.Select(m => new
                     {
                         Message = m,
                         Sender = m.Sender
                     })
                     .OrderByDescending(x => x.Message.SentTime)
                         .Take(1)
                         .ToList()
                 }).ToList();

            var channels = query.Select(x => x.channel).ToList();

            return channels;
        }

        public Channel SelectChannel(int channelId)
        {
            var query = _context.Channels
                .Include(x => x.ApplicationUserChannels)
                .Select(c => new
                {
                    channel = c,
                    Messages = c.Messages.Select(m => new
                    {
                        Message = m,
                        Sender = m.Sender
                    })
                    .OrderByDescending(x => x.Message.SentTime)
                        .Take(20)
                        .ToList()
                }).First(x => x.channel.ChannelId == channelId);

            var channel = query.channel;
            if (channel.Messages != null)
                channel.Messages = channel.Messages.OrderBy(x => x.SentTime).ToList();
            else
            {
                channel.Messages = new List<Message>();
            }
            return channel;
        }

        public ICollection<Message> SelectMessages(int channelId, DateTime from)
        {
            var query = _context.Channels
                .Include(x => x.ApplicationUserChannels)
                .Select(c => new
                {
                    channel = c,
                    Messages = c.Messages.Select(m => new
                    {
                        Message = m,
                        Sender = m.Sender
                    })
                    .Where(x => x.Message.SentTime > from)
                    .OrderBy(x => x.Message.SentTime)
                    .ToList()
                }).First(x => x.channel.ChannelId == channelId);

            var messages = query.channel.Messages ?? new List<Message>();
            return messages;
        }

        public void SendMessage(ApplicationUser sender, int ChannelId, string Message)
        {
            var channel = _context.Channels
                .Include(p => p.ApplicationUserChannels)
                .Include(p => p.Messages)
                .ThenInclude(x => x.Sender)
                .First(x => x.ChannelId == ChannelId);
            channel.Messages.Add(new Message()
            {
                Content = Message,
                Sender = sender,
                SentTime = DateTime.Now
            });
            _context.SaveChanges();
        }

        public ICollection<Message> SelectPreviousMessages(int channelId, DateTime from)
        {
            var query = _context.Channels
                .Include(x => x.ApplicationUserChannels)
                .Select(c => new
                {
                    channel = c,
                    Messages = c.Messages.Select(m => new
                    {
                        Message = m,
                        Sender = m.Sender
                    })
                    .Where(x => x.Message.SentTime < from)
                    .OrderByDescending(x => x.Message.SentTime)
                    .Take(20)
                    .ToList()
                }).First(x => x.channel.ChannelId == channelId);

            var messages = query.channel.Messages ?? new List<Message>();
            messages = messages.Reverse().ToArray();
            return messages;
        }

        public void DeleteChannel(int channelId)
        {
            var channel = _context.Channels
                .Where(x => x.ChannelId == channelId)
                .Include(x => x.Messages)
                .First();
            _context.Messages.RemoveRange(channel.Messages);
            _context.Channels.Remove(channel);
            _context.SaveChanges();
        }
    }
}
