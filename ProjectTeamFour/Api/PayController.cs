﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using ProjectTeamFour.Service;
using ProjectTeamFour.ViewModels;
using AcceptVerbsAttribute = System.Web.Http.AcceptVerbsAttribute;

namespace ProjectTeamFour.Api
{   
    public class PayController : ApiController
    {
        private readonly PayService _payService;
        
        public PayController(PayService payService)
        {
            _payService = new PayService();
        }
    }
}