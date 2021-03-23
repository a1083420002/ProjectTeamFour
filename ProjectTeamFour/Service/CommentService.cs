﻿using ProjectTeamFour.Models;
using ProjectTeamFour.ViewModels;
using ProjectTeamFour.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Linq.Expressions;

namespace ProjectTeamFour.Service
{
    public class CommentService
    {
        private DbContext _ctx;

        private BaseRepository _repository;

        public CommentService()
        {
            _ctx = new ProjectContext();
            _repository = new BaseRepository(_ctx);
        }

        public Comment GetComment(Expression<Func<Comment, bool>> KeySelector)
        {
            var entity = _repository.GetAll<Comment>().FirstOrDefault(KeySelector);
            if (entity != null)
            { 
                var comments = new Comment
                {
                ProjectId = entity.ProjectId,
                MemberId = entity.MemberId,
                Comment_Question = entity.Comment_Question,
                Comment_Time = entity.Comment_Time,
                Comment_Answer = entity.Comment_Answer
                //public Member Member
                //public Project Project
                };
             return comments;
            }
            return null;
        }
        //贊助者留言後，在資料庫創造一筆Comment資料
        public string CreateANewComment(CommentViewModel commentVM)
        {
            var newComment = new Comment
            {
                ProjectId=commentVM.ProjectId,
                MemberId=commentVM.MemberId,
                Comment_Question=commentVM.Comment_Question,
                Comment_Time=commentVM.Comment_Time,
                ReadStatus=false
            };
            
            using(var transaction=_ctx.Database.BeginTransaction())
            {
                try
                {
                    _repository.Create(newComment);
                    transaction.Commit();
                    return "success";
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                    return ex.ToString();
                }
            }
        }


        public List<CommentForMemberViewModel> QueryCommentByMemberId(int memberId )
        {
           
            
            var result = new List<CommentForMemberViewModel>();

            var mycomment = _repository.GetAll<Comment>().Where(c => c.MemberId == memberId).Select(c => c).ToList();
            if(mycomment!=null)
            {
                foreach (var comment in mycomment)
                {
                    var commentProject = _repository.GetAll<Project>().FirstOrDefault(p => p.ProjectId == comment.ProjectId);
                    CommentForMemberViewModel commentForMemberVM = new CommentForMemberViewModel
                    {
                        ProjectId=comment.ProjectId,
                        ProjectName=commentProject.ProjectName,
                        ProjectMainUrl=commentProject.ProjectMainUrl,
                        CommentId=comment.CommentId,
                        Comment_Answer=comment.Comment_Answer,
                        Comment_Question=comment.Comment_Question,
                        Comment_Time=comment.Comment_Time,
                        ReadStatus=comment.ReadStatus,
                        MemberId= memberId,
                        AskedMemberId= commentProject.MemberId
                    };
                    
                    result.Add(commentForMemberVM);
                }
                
                return result;
                
            }
            else
            {
                return result;
            }


            
        }
    }
}