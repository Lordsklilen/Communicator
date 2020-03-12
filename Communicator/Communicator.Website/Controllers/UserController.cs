using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
namespace Communicator.Website.Controllers
{

    public class DTO
    {
        public string email;
        public string password;
    }
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        [HttpPost]
        [Route("Api/Authenticate")]
        public string Authenticate([FromBody] JsonElement json)
        {
            var request = ToObject<DTO>(json);
            return $"Email {request.email} authenticated with password: {request.password}";
        }

    }
}
