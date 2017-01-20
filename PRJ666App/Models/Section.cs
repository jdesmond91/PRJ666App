using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Section
    {
        public Section()
        {
            Questions = new HashSet<Question>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ScenarioId { get; set; }
        public virtual Scenario Scenario { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}