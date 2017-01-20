using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{
    public class KeywordAdd
    {
        public string Description { get; set; }
        public int QuestionId { get; set; }
    }

    public class KeywordBase : KeywordAdd
    {
        public int Id { get; set; }
    }
}