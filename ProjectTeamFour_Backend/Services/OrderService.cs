﻿using Microsoft.EntityFrameworkCore;
using ProjectTeamFour_Backend.Context;
using ProjectTeamFour_Backend.Models;
using ProjectTeamFour_Backend.Repository;
using ProjectTeamFour_Backend.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTeamFour_Backend.Services
{
    public class OrderService
    {
        private DbContext _dbContext;
        private BaseRepository _repository;

        //public System.Web.HttpResponse Response { get; }

        public OrderService()
        {
            _dbContext = new LabContext();
            _repository = new BaseRepository();
        }

        public OrderViewModel CatchOrderDb() //撈出資料庫order的全部資料
        {

            var order = new OrderViewModel()
            {
                MyOrder = new List<Order>()
            };

            foreach (var item in _repository.GetAll<Order>())
            {

                Order o = new Order
                {
                    OrderId = item.OrderId,
                    OrderName = item.OrderName,
                    OrderAddress = item.OrderAddress,
                    OrderConEmail = item.OrderConEmail,
                    OrderPhone = item.OrderPhone,
                    OrderTotalAccount = item.OrderTotalAccount,
                    TradeNo = item.TradeNo,
                    Condition = item.Condition,
                    MemberId = item.MemberId
                };
                order.MyOrder.Add(o);
            }
            return order;
            //return _repository.GetAll<Order>();
        }
    }
}
