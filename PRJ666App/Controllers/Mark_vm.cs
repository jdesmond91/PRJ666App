using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{
    public class MarkAdd
    {
        public MarkAdd()
        {
            PracticeDate = DateTime.Now;
        }
        public double Grade { get; set; }
        public DateTime PracticeDate { get; set; }
        public int UserId { get; set; }
        public int ScenarioId { get; set; }
        public int SectionId { get; set; }
        public string ApplicationUserID { get; set; }
    }

    public class MarkBase : MarkAdd
    {
        public int Id { get; set; }

    }
}