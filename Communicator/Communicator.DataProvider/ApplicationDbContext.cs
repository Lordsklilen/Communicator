using Communicator.DataProvider.Identity;
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

        public bool CheckAlive()
        {
            return Database.CanConnect();
        }
    }
}
