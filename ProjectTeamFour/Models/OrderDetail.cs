﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectTeamFour.Models
{
    public class OrderDetail
    {
        public Guid OrderDetailId { get; set; }
        public string OrderDetailDes { get; set; }
        public Guid OrderId { get; set; }
        public Guid OrderDetailPlanId { get; set; }
        //導覽屬性
        public virtual Order Order { get; set; }
        [ForeignKey("OrderDetailPlanId")]
        public virtual Plan Plan { get; set; }
    }
}