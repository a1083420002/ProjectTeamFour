﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectTeamFour.ViewModels
{
    public class ProjectListViewModel
    {
        public List<ProjectViewModel> ProjectItems { get; set; }

        //public static implicit operator ProjectListViewModel(ProjectListViewModel v)
        //{
        //    throw new NotImplementedException();
        //}
    }
}