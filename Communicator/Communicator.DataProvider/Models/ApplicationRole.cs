using Microsoft.AspNetCore.Identity;
using System;

namespace Communicator.DataProvider.Models
{
    public class ApplicationRole : IdentityRole
    {
        public const string USER_ROLE = "User";
        public const string ADMIN_ROLE = "Admin";
        public ApplicationRole(string rolename) : base(rolename) { }
        public ApplicationRole() : base() { }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
