using Communicator.Service.PublicInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace Communicator.Website.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ChannelController : BaseController
    {

        private readonly IChannelService _channelService;
        public ChannelController(IChannelService service)
        {
            _channelService = service;
        }
    }
}
