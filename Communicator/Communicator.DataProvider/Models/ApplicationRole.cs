using Microsoft.AspNetCore.Identity;
using System;

namespace Communicator.DataProvider.Models
{
    public class ApplicationRole : IdentityRole
    {
        public static string stadardRole = "User";
        public ApplicationRole(string rolename) : base(rolename) { }
        public ApplicationRole() : base() { }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
