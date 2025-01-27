﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using ProjectTeamFour.Models;
using ProjectTeamFour.Repositories;
using ProjectTeamFour.ViewModels;

namespace ProjectTeamFour.Service
{
    enum Fliter
    {
        FundingAmount,
        Fundedpeople,
        Time
    }

    public class ProjectsService
    {
        private DbContext _context;
        private BaseRepository _reposity;

        public ProjectsService()
        {
            _context = new ProjectContext();
            _reposity = new BaseRepository(_context);
        }

        public ProjectListViewModel GetByWhere(Expression<Func<Project, bool>> KeySelctor) //判斷是否符合條件判斷
        {
            var result = _reposity.GetAll<Project>().Where(KeySelctor); //篩選條件邏輯
            var project = new ProjectListViewModel
            {
                ProjectItems = new List<ProjectViewModel>()
            };
            
            foreach (var item in result)
            {
                if (item.ProjectStatus == "集資中" || item.ProjectStatus == "集資成功")
                {
                    var projectbox = new ProjectViewModel
                    {
                        ProjectMainUrl = item.ProjectMainUrl,
                        Category = item.Category,
                        ProjectStatus = item.ProjectStatus,
                        ProjectName = item.ProjectName,
                        CreatorName = item.CreatorName,
                        FundingAmount = item.FundingAmount,
                        AmountThreshold = item.AmountThreshold,
                        EndDate = item.EndDate,
                        StartDate = item.StartDate,
                        ProjectId = item.ProjectId
                    };
                    project.ProjectItems.Add(projectbox); //在list加入這筆資料
                }                    
            }
            return project;
        }


        public ProjectListViewModel OrderBy(Expression<Func<Project, decimal>> KeySelector)
        {

            var result = _reposity.GetAll<Project>().OrderBy(KeySelector);
            var project = new ProjectListViewModel
            {
                ProjectItems = new List<ProjectViewModel>()
            };
            foreach (var item in result)
            {

                var projectbox = new ProjectViewModel
                {
                    ProjectMainUrl = item.ProjectMainUrl,
                    Category = item.Category,
                    ProjectStatus = item.ProjectStatus,
                    ProjectName = item.ProjectName,
                    CreatorName = item.CreatorName,
                    FundingAmount = item.FundingAmount,
                    AmountThreshold = item.AmountThreshold,
                    EndDate = item.EndDate,
                    StartDate = item.StartDate,
                    Fundedpeople = item.Fundedpeople,
                    ProjectId = item.ProjectId
                };
                project.ProjectItems.Add(projectbox);
            }
            return project;

        }

        public ProjectListViewModel OrderByTime()//過濾結束時間的排序
        {
            DateTime today = DateTime.Now;
            var result = _reposity.GetAll<Project>();
            var project = new ProjectListViewModel
            {
                ProjectItems = new List<ProjectViewModel>()
            };
            foreach (var item in result)
            {
                var timespan = item.EndDate.Subtract(today); //endDate - 今天
                var projectbox = new ProjectViewModel
                {
                    ProjectMainUrl = item.ProjectMainUrl,
                    Category = item.Category,
                    ProjectStatus = item.ProjectStatus,
                    ProjectName = item.ProjectName,
                    CreatorName = item.CreatorName,
                    FundingAmount = item.FundingAmount,
                    AmountThreshold = item.AmountThreshold,
                    EndDate = item.EndDate,
                    StartDate = item.StartDate,
                    Fundedpeople = item.Fundedpeople,
                    dateLine = timespan,
                    ProjectId = item.ProjectId
                };
                project.ProjectItems.Add(projectbox);
            };
            return project;
        }

        public ProjectListViewModel GetAllTotal() //全部產生
        {
            var project = new ProjectListViewModel
            {
                ProjectItems = new List<ProjectViewModel>()
            };

            foreach (var item in _reposity.GetAll<Project>())
            {
                if(item.ProjectStatus =="集資中" || item.ProjectStatus == "集資成功")
                {
                    ProjectViewModel pv = new ProjectViewModel
                    {
                        ProjectMainUrl = item.ProjectMainUrl,
                        Category = item.Category,
                        ProjectStatus = item.ProjectStatus,
                        ProjectName = item.ProjectName,
                        CreatorName = item.CreatorName,
                        FundingAmount = (int)item.FundingAmount,
                        AmountThreshold = item.AmountThreshold,
                        EndDate = item.EndDate,
                        StartDate = item.StartDate,
                        ProjectId = item.ProjectId,
                        ApprovingStatus = item.ApprovingStatus
                    };
                    project.ProjectItems.Add(pv);
                }
               
            }
            return project;
        }

        public ProjectListViewModel GetAllTotalFliter(string category, string projectStatus ,string id) //全部產生過濾完3層
        {
            var project = new ProjectListViewModel
            {
                ProjectItems = new List<ProjectViewModel>()
            };
            var source = _reposity.GetAll<Project>();
            if (!string.IsNullOrEmpty(category))
            {
                source = source.Where((x) => x.Category == category);
            }
            if (!string.IsNullOrEmpty(projectStatus))
            {
                source = source.Where((x) => x.ProjectStatus == projectStatus);
            }
            if (!string.IsNullOrEmpty(id))
            {
                if (id == "FundingAmount")
                {
                    source = source.OrderBy((x) => x.FundingAmount);
                }
                if (id == "Fundedpeople")
                {
                    source = source.OrderBy((x) => x.Fundedpeople);
                }
                if(id == "EndDate")
                {
                    source = source.OrderBy((x) => x.EndDate);
                }
            }
            foreach (var item in source)
            {

                ProjectViewModel pv = new ProjectViewModel
                {
                    ProjectMainUrl = item.ProjectMainUrl,
                    Category = item.Category,
                    ProjectStatus = item.ProjectStatus,
                    ProjectName = item.ProjectName,
                    CreatorName = item.CreatorName,
                    FundingAmount = (int)item.FundingAmount,
                    AmountThreshold = item.AmountThreshold,
                    EndDate = item.EndDate,
                    StartDate = item.StartDate,
                    ProjectId = item.ProjectId,
                    ApprovingStatus =item.ApprovingStatus
                };
                project.ProjectItems.Add(pv);
            }
            return project;
        }
   
    }
}        
