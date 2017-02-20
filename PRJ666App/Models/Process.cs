using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Process
    {
        public Process()
        {
            Keywords = new HashSet<Keyword>();
        }
        public int Id { get; set; }
        public string Description { get; set; }
        public string Hint { get; set; }
        public string Output { get; set; }
        public int? ScenarioId { get; set; }
        public virtual Scenario Scenario { get; set; }
        public int? SectionId { get; set; }
        public virtual Section Section { get; set; }
        public ICollection<Keyword> Keywords { get; set; }
    }
}