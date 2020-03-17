using Communicator.DataProvider.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Communicator.DataProvider.Repositories
{
    public class UserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();
        public UserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateUser(string userName, string email, string password)
        {
            var existRole = await _userManager.FindByNameAsync(userName);

            if (existRole != null)
            {
                throw new Exception("User is already existing. Cannot create new one");
            }
            var user = new ApplicationUser()
            {
                Id = userName,
                Email = email,
                UserName = userName
            };
            user.PasswordHash = hasher.HashPassword(user, password);
            var response = await _userManager.CreateAsync(user);
            await _userManager.AddToRoleAsync(user, ApplicationRole.stadardRole);

            var res = await SignInUser(userName, password);
            return response;
        }
        public async Task<bool> SignInUser(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new Exception("User does not exist.");
            }

            if (hasher.VerifyHashedPassword(user, user.PasswordHash, password) != PasswordVerificationResult.Failed)
            {
                var result = await _signInManager.PasswordSignInAsync(userName, password, false, false);
                return result.Succeeded;
            }
            return false;
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

    }
}
