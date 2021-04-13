﻿using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTeamFour_Backend.Controllers
{
    [ResponseCache(NoStore = true)]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class ChartsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Chart()
        {
            return View();
        }
    }
}
