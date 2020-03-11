using Microsoft.AspNetCore.Mvc;

namespace Communicator.Website.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public UserController()
        {
        }

        [HttpGet]
        public string Test()
        {
            return "site testing";
        }
    }
}
