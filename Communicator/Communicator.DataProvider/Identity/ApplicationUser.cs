using Microsoft.AspNetCore.Identity;

namespace Communicator.DataProvider.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
