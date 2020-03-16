using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

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
        public async Task<string> Authenticate([FromBody] JsonElement json)
        {
            var request = ToObject<RequestAuthenticateUser>(json);
            return PrepareResponse(await _userService.AuthenticateUser(request));
        }

        [HttpPost]
        [Route("Api/CreateUser")]
        public async Task<string> CreateUser([FromBody] JsonElement json)
        {
            var request = ToObject<RequestCreateUser>(json);
            return PrepareResponse(await _userService.CreateUser(request));
        }

        [HttpPost]
        [Route("Api/CreateRole")]
        public async Task<string> CreateRole(string roleName)
        {
            return PrepareResponse(await _userService.CreateRole(roleName));
        }

    }
}
