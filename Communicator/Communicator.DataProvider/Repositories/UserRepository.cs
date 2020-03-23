using Communicator.DataProvider.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Communicator.DataProvider.Repositories
{
    public class UserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();
        public UserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext context)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        //Users
        public bool Create(string userName, string email, string password)
        {
            var existRole = _userManager.FindByNameAsync(userName).Result;

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
            _userManager.CreateAsync(user).RunSynchronously();
            _userManager.AddToRoleAsync(user, ApplicationRole.stadardRole).RunSynchronously();

            var res = SignIn(user, password);
            return res;
        }

        public ApplicationUser GetById(string id)
        {
            return _userManager.FindByIdAsync(id).Result;
        }

        public HashSet<ApplicationUser> GetById(string[] ids)
        {
            var result = new HashSet<ApplicationUser>();
            foreach (var id in ids)
            {
                result.Add(_userManager.FindByIdAsync(id).Result);
            }
            return result;
        }


        //Friends list
        public IEnumerable<ApplicationUser> GetUsersById(string word)
        {
            var users = _context.Users
                .Where(x => x.Id.Contains(word))
                .AsEnumerable();
            return users;
        }

        // SignIn/Out
        public bool SignIn(ApplicationUser user, string password)
        {

            if (user == null)
            {
                throw new Exception("User does not exist.");
            }

            if (hasher.VerifyHashedPassword(user, user.PasswordHash, password) != PasswordVerificationResult.Failed)
            {
                var result = _signInManager.PasswordSignInAsync(user.UserName, password, false, false).Result;
                return result.Succeeded;
            }
            return false;
        }

        public void SignOutAsync()
        {
            _signInManager.SignOutAsync();
        }

    }
}
