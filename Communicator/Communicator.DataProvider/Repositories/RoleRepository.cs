using Communicator.DataProvider.Models;
using Microsoft.AspNetCore.Identity;
using System;

namespace Communicator.DataProvider.Repositories
{
    public class RoleRepository
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        public RoleRepository(RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public IdentityResult Create(string roleName)
        {
            var existRole = _roleManager.FindByNameAsync(roleName).Result;
            if (existRole != null)
            {
                throw new Exception("Role is already existing. Cannot create new one");
            }

            var response = _roleManager.CreateAsync(new ApplicationRole(roleName)
            {
                Id = roleName,
                Name = roleName,
                Description = "Sample Description",
                CreatedDate = DateTime.UtcNow,

            }).Result;
            return response;
        }
        public void CreateDefaultRoles()
        {
            try
            {
                var existRole = _roleManager.FindByNameAsync(ApplicationRole.USER_ROLE).Result;
                if (existRole == null)
                {
                    Create(ApplicationRole.USER_ROLE);
                }
                var existAdminRole = _roleManager.FindByNameAsync(ApplicationRole.ADMIN_ROLE).Result;
                if (existAdminRole == null)
                {
                    Create(ApplicationRole.ADMIN_ROLE);
                }
            }
            catch (Exception) { }
        }

        public ApplicationRole GetByName(string roleName)
        {
            return _roleManager.FindByNameAsync(roleName).Result;
        }
    }
}
