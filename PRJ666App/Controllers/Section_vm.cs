using PRJ666App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{
    public class SectionAdd
    {
        public string Name { get; set; }

        public int ScenarioId { get; set; }
    }

    public class SectionBase : SectionAdd
    {
        public int Id { get; set; }

        public ICollection<QuestionBase> Questions { get; set; }

        public ICollection<ProcessBase> Processes { get; set; }
    }
}