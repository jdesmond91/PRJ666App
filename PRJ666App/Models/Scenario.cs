using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public class Scenario
    {
        public Scenario()
        {
            Sections = new HashSet<Section>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Goals { get; set; }
        public ICollection<Section> Sections { get; set; }
    }
}