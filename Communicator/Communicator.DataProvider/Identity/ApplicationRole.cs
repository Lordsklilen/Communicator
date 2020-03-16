using Microsoft.AspNetCore.Identity;
using System;

namespace Communicator.DataProvider.Identity
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole(string rolename) : base(rolename) { }
        public ApplicationRole() : base() { }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
