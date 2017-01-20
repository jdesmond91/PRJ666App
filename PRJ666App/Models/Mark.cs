using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Mark
    {
        public int Id { get; set; }
        public double Grade { get; set; }
        public DateTime PracticeDate { get; set; }
        public int UserId { get; set; }
        public int? ScenarioId { get; set; }
        public virtual Scenario Scenario { get; set; }
        public int? SectionId { get; set; }
        public virtual Section Section { get; set; }
        public string ApplicationUserID { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}