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

            //SCENARIO
            Mapper.CreateMap<Controllers.ScenarioAdd, Models.Scenario>();
            Mapper.CreateMap<Models.Scenario, Controllers.ScenarioBase>();

            //SECTION
            Mapper.CreateMap<Controllers.SectionAdd, Models.Section>();
            Mapper.CreateMap<Models.Section, Controllers.SectionBase>();

            //QUESTION
            Mapper.CreateMap<Controllers.QuestionAdd, Models.Question>();
            Mapper.CreateMap<Models.Question, Controllers.QuestionBase>();

            //KEYWORD
            Mapper.CreateMap<Controllers.KeywordAdd, Models.Keyword>();
            Mapper.CreateMap<Models.Keyword, Controllers.KeywordBase>();

            //MARK
            Mapper.CreateMap<Controllers.MarkAdd, Models.Mark>();
            Mapper.CreateMap<Models.Mark, Controllers.MarkBase>();

#pragma warning restore CS0618
        }
    }
}