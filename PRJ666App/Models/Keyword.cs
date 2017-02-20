using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Keyword
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int? QuestionId { get; set; }
        public virtual Question Question { get; set; }
        public int? ProcessId { get; set; }
        public virtual Process Process { get; set; }
    }
}