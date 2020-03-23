using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Communicator.Website.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {

        private readonly IUserService _userService;
        public UserController(IUserService service)
        {
            _userService = service;
        }

        [HttpPost]
        [Route("Api/Authenticate")]
        public string Authenticate([FromBody] JsonElement json)
        {
            var request = ToObject<RequestAuthenticateUser>(json);
            return PrepareResponse(_userService.AuthenticateUser(request));
        }

        [HttpPost]
        [Route("Api/CreateUser")]
        public string CreateUser([FromBody] JsonElement json)
        {
            var request = ToObject<RequestCreateUser>(json);
            return PrepareResponse(_userService.CreateUser(request));
        }

        [HttpPost]
        [Route("Api/CreateRole")]
        public string CreateRole(string roleName)
        {
            return PrepareResponse(_userService.CreateRole(roleName));
        }

        //Authorized Methods
        [HttpGet]
        [Route("Api/CheckAuthorization")]
        [Authorize(Roles = "User")]
        public bool CheckAuthorization()
        {
            return true;
        }

        [HttpPost]
        [Route("Api/GetUser")]
        [Authorize(Roles = "User")]
        public string GetUser([FromBody] JsonElement json)
        {
            var request = ToObject<RequestGetUser>(json);
            return PrepareResponse(_userService.GetUser(request));
        }

        [HttpPost]
        [Route("Api/SignOut")]
        [Authorize(Roles = "User")]
        public string SignOut()
        {
            _userService.SignOutAsync();
            return PrepareResponse(true);
        }

        [HttpGet]
        [Route("Api/GetUsers")]
        [Authorize(Roles = "User")]
        public string CheckAuthorization([FromBody] JsonElement json)
        {
            var request = ToObject<RequestGetUsers>(json);
            return PrepareResponse(_userService.GetUsersById(request));
        }

    }
}
