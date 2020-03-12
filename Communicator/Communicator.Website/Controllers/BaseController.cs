﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json;

namespace Communicator.Website.Controllers
{
    public abstract partial class BaseController : Controller
    {
        [HttpGet]
        public bool Ping()
        {
            return true;
        }
        protected T ToObject<T>(JsonElement json)
        {
            var j = json.GetRawText();
            return JsonConvert.DeserializeObject<T>(j);
        }
        protected string PrepareResponse(object response)
        {
            return JsonConvert.SerializeObject(response);
        }
    }
}
