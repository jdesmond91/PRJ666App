using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Controllers
{   
        public class ScenarioAdd
        {
            public string Name { get; set; }
        }

        public class ScenarioBase : ScenarioAdd
        {
            public int Id { get; set; }
        }
    
}