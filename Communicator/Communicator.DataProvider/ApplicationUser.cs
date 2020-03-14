using Microsoft.AspNetCore.Identity;

namespace Communicator.DataProvider
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
