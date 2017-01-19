using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Question
    {
        public Question()
        {
            Keywords = new HashSet<string>();
        }

        public int Id { get; set; }

        public string Description { get; set; }

        public string Answer { get; set; }

        public int? ScenarioId { get; set; }

        public virtual Scenario Scenario { get; set; }

        public int? SectionId { get; set; }

        public virtual Section Section { get; set; }

        public ICollection<string> Keywords { get; set; }
    }
}