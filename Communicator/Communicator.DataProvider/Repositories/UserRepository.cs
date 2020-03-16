using Communicator.DataProvider.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Communicator.DataProvider.Repositories
{
    public class UserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public UserRepository(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
                UserName = userName,
                PasswordHash = HashPassword(password)
            };
            var response = await _userManager.CreateAsync(user);
            await _userManager.AddToRoleAsync(user, ApplicationRole.stadardRole);

            return response;
        }
        public async Task<bool> AuthenticateUser(string userName, string password)
        {
            var existRole = await _userManager.FindByNameAsync(userName);

            if (existRole == null)
            {
                throw new Exception("User does not exist.");
            }
            return await VerifyUser(userName, password);
        }


        private string HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            return Convert.ToBase64String(hashBytes);
        }

        private async Task<bool> VerifyUser(string userName, string password)
        {
            var savedPasswordHash = (await _userManager.FindByNameAsync(userName)).PasswordHash;
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                    throw new UnauthorizedAccessException();
            return true;
        }
    }
}
