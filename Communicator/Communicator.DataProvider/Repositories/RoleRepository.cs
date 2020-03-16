using Communicator.DataProvider.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Communicator.DataProvider.Repositories
{
    public class RoleRepository
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        public RoleRepository(RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> CreateRole(string roleName)
        {
            var existRole = await _roleManager.FindByNameAsync(roleName);
            if (existRole != null)
            {
                throw new Exception("Role is already existing. Cannot create new one");
            }

            var response = await _roleManager.CreateAsync(new ApplicationRole(roleName)
            {
                Id = roleName,
                Name = roleName,
                Description = "Sample Description",
                CreatedDate = DateTime.UtcNow,

            });
            return response;
        }

        public async Task<ApplicationRole> GetRoleByName(string roleName)
        {
            return await _roleManager.FindByNameAsync(roleName);
        }
    }
}
