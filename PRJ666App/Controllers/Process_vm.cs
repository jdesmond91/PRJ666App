using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{
    public class ProcessAdd
    {
        public string Description { get; set; }
        public string Hint { get; set; }
        public string Output { get; set; }
        public int ScenarioId { get; set; }
        public int SectionId { get; set; }
    }

    public class ProcessBase : ProcessAdd
    {
        public int Id { get; set; }
        public ICollection<KeywordBase> Keywords { get; set; }
    }
}