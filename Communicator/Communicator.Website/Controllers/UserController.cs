using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;
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
    }
}
