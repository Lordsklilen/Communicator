using Communicator.Service.DTO;
using Communicator.Service.PublicInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
        [HttpPost]
        [Route("Api/CreateChannel")]
        [Authorize(Roles = "User")]
        public string CreateChannel([FromBody] JsonElement json)
        {
            var request = ToObject<RequestCreateChannel>(json);
            return PrepareResponse(_channelService.CreateChannel(request));
        }


        [HttpPost]
        [Route("Api/GetChannelsForUser")]
        [Authorize(Roles = "User")]
        public string GetChannelsForUser([FromBody] JsonElement json)
        {
            var request = ToObject<RequestGetUserChannels>(json);
            return PrepareResponse(_channelService.GetChannelsForUser(request));
        }
    }
}
