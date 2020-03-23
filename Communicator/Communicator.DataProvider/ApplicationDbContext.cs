using Communicator.DataProvider.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Communicator.DataProvider
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            var IsAlive = CheckAlive();
        }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }

        public bool CheckAlive()
        {
            return Database.CanConnect();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUserChannel>()
                .HasKey(bc => new { bc.ChannelId, bc.UserId });
            modelBuilder.Entity<ApplicationUserChannel>()
                .HasOne(bc => bc.Channel)
                .WithMany(b => b.ApplicationUserChannels)
                .HasForeignKey(bc => bc.ChannelId);
            modelBuilder.Entity<ApplicationUserChannel>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.ApplicationUserChannels)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
