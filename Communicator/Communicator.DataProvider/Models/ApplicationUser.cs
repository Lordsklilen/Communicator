﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Communicator.DataProvider.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<ApplicationUser> Friends { get; set; }
        public ICollection<ApplicationUserChannel> ApplicationUserChannels { get; set; }
    }
}
