﻿using ProjectTeamFour_Backend.Interfaces;
using ProjectTeamFour_Backend.Models;
using ProjectTeamFour_Backend.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTeamFour_Backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IRepository _dbRepository;

        public ProjectService(IRepository repository)
        {
            _dbRepository = repository;
        }

        public ProjectViewModel.ProjectListResult GetAll()
        {
            var result = new ProjectViewModel.ProjectListResult();


            return result;
        }

        public ProjectViewModel.ProjectListResult GetByCategory(ProjectViewModel.GetByCategoryRequest request)
        {
            ProjectViewModel.ProjectListResult result = new ProjectViewModel.ProjectListResult();

            result.ProjectList = _dbRepository.GetAll<Project>()
                .Where(x => x.Category == request.Category)
                .Select(x => new ProjectViewModel.ProjectSingleResult()
                {
                    ProjectId = x.ProjectId,
                    ProjectName = x.ProjectName,
                    ProjectMainUrl = x.ProjectMainUrl,
                    Category = x.Category,
                    ProjectStatus = x.ProjectStatus,
                    CreatorName = x.CreatorName,
                    FundingAmount = x.FundingAmount,
                    AmountThreshold = x.AmountThreshold,
                    EndDate = x.EndDate,
                    StartDate = x.StartDate,
                    Fundedpeople = x.Fundedpeople,
                }).ToList();

            return result;
        }

        public ProjectViewModel.ProjectSingleResult GetById(ProjectViewModel.GetByIdRequest request)
        {
            var data = _dbRepository.GetAll<Project>()
                .FirstOrDefault(x => x.ProjectId == request.ProjectId);

            var result = new ProjectViewModel.ProjectSingleResult()
            {
                ProjectId = data.ProjectId,
                ProjectName = data.ProjectName,
                ProjectMainUrl = data.ProjectMainUrl,
                Category = data.Category,
                ProjectStatus = data.ProjectStatus,
                CreatorName = data.CreatorName,
                FundingAmount = data.FundingAmount,
                AmountThreshold = data.AmountThreshold,
                EndDate = data.EndDate,
                StartDate = data.StartDate,
                Fundedpeople = data.Fundedpeople,
            };

            return result;
        }

        public ProjectViewModel.ProjectListResult GetTotalSale()
        {
            return null;
        }
    }
}