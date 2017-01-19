using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace PRJ666App.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            // Disable AutoMapper v4.2.x warnings
            #pragma warning disable CS0618

            Mapper.CreateMap<Controllers.ScenarioAdd, Models.Scenario>();
            Mapper.CreateMap<Models.Scenario, Controllers.ScenarioBase>();

            Mapper.CreateMap<Controllers.SectionAdd, Models.Section>();
            Mapper.CreateMap<Models.Section, Controllers.SectionBase>();

            Mapper.CreateMap<Controllers.QuestionAdd, Models.Question>();
            Mapper.CreateMap<Models.Question, Controllers.QuestionBase>();

            #pragma warning restore CS0618
        }
    }
}