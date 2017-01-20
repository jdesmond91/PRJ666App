using PRJ666App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{
    public class QuestionAdd
    {
        public string Description { get; set; }

        public string Answer { get; set; }

        public int ScenarioId { get; set; }

        public int SectionId { get; set; }
    
    }

    public class QuestionBase : QuestionAdd
    {
        public int Id { get; set; }
        public ICollection<KeywordBase> Keywords { get; set; }
    }
}