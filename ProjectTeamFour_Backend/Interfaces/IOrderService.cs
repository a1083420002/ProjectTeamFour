﻿using ProjectTeamFour_Backend.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTeamFour_Backend.Interfaces
{
    public interface IOrderService
    {
        OrderViewModel.OrderListResult GetAll();
        string DeleteOrder(OrderViewModel.OrderSingleResult order);

        string UpdateOrder(OrderViewModel.OrderSingleResult orderUpdate);
    }
}
