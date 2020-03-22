using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Communicator.DataProvider.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<ApplicationUser> Friends { get; set; }
    }
}
