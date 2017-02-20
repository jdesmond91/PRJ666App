using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using PRJ666App.Models;

namespace PRJ666App.Controllers
{
    public class Manager
    {
        private ApplicationDbContext ds = new ApplicationDbContext();

        // *********************************** SCENARIO SECTION *****************************************************
        public IEnumerable<ScenarioBase> ScenarioGetAll()
        {
            // Fetch the collection
            var c = ds.Scenarios.OrderBy(e => e.Name);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<ScenarioBase>>(c);
        }

        public ScenarioBase ScenarioGetByIdWithSection(int id)
        {
            // Attempt to fetch the object
            var o = ds.Scenarios.Include("Sections")                       
                .SingleOrDefault(a => a.Id == id);

            return (o == null) ? null : Mapper.Map<ScenarioBase>(o);
        }

        public ScenarioBase ScenarioGetByIdWithAll(int id)
        {
            // Attempt to fetch the object
            var o = ds.Scenarios.Include("Sections.Questions.Keywords").Include("Sections.Processes.Keywords")
                .SingleOrDefault(a => a.Id == id);

            return (o == null) ? null : Mapper.Map<ScenarioBase>(o);
        }

        public ScenarioBase ScenarioAdd(ScenarioAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            // Attempt to add the object
            var addedItem = ds.Scenarios.Add(Mapper.Map<Scenario>(newItem));
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return (addedItem == null) ? null : Mapper.Map<ScenarioBase>(addedItem);
        }

        // ************************************** SECTION SECTION **********************************************************

        public IEnumerable<SectionBase> SectionGetAll()
        {
            // Fetch the collection
            var c = ds.Sections.OrderBy(e => e.Name);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<SectionBase>>(c);
        }

        public SectionBase SectionGetByIdWithQuestion(int id)
        {
            // Attempt to fetch the object
            var o = ds.Sections.Include("Questions").Include("Processes")
                .SingleOrDefault(a => a.Id == id);

            return (o == null) ? null : Mapper.Map<SectionBase>(o);
        }

        public SectionBase SectionAdd(SectionAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedItem = ds.Scenarios.Find(newItem.ScenarioId);
            if (associatedItem == null)
            {
                return null;
            }

            Section addedItem = Mapper.Map<Section>(newItem);
            addedItem.ScenarioId = newItem.ScenarioId;

            ds.Sections.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<SectionBase>(addedItem);
        }

        // *************************************************** QUESTION SECTION ************************************************
        public IEnumerable<QuestionBase> QuestionGetAll()
        {
            // Fetch the collection
            var c = ds.Questions.OrderBy(e => e.Description);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<QuestionBase>>(c);
        }

        public QuestionBase QuestionGetByIdWithKeyword(int id)
        {
            // Attempt to fetch the object
            var o = ds.Questions.Include("Keywords")
                .SingleOrDefault(a => a.Id == id);

            return (o == null) ? null : Mapper.Map<QuestionBase>(o);
        }

        public QuestionBase QuestionAdd(QuestionAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedItem = ds.Scenarios.Find(newItem.ScenarioId);
            var associatedItem2 = ds.Sections.Find(newItem.SectionId);
            if (associatedItem == null || associatedItem2 == null)
            {
                return null;
            }

            Question addedItem = Mapper.Map<Question>(newItem);
            addedItem.ScenarioId = newItem.ScenarioId;
            addedItem.SectionId = newItem.SectionId;         

            ds.Questions.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<QuestionBase>(addedItem);
        }

        // ************************************************** PROCESS SECTION *************************************************

        public IEnumerable<ProcessBase> ProcessGetAll()
        {
            // Fetch the collection
            var c = ds.Processes.OrderBy(e => e.Description);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<ProcessBase>>(c);
        }

        public ProcessBase ProcessGetByIdWithKeyword(int id)
        {
            // Attempt to fetch the object
            var o = ds.Processes.Include("Keywords")
                .SingleOrDefault(a => a.Id == id);

            return (o == null) ? null : Mapper.Map<ProcessBase>(o);
        }

        public ProcessBase ProcessAdd(ProcessAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedItem = ds.Scenarios.Find(newItem.ScenarioId);
            var associatedItem2 = ds.Sections.Find(newItem.SectionId);
            if (associatedItem == null || associatedItem2 == null)
            {
                return null;
            }

            Process addedItem = Mapper.Map<Process>(newItem);
            addedItem.ScenarioId = newItem.ScenarioId;
            addedItem.SectionId = newItem.SectionId;

            ds.Processes.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<ProcessBase>(addedItem);
        }


        // ***************************************************KEYWORD SECTION ************************************************

        public IEnumerable<KeywordBase> KeywordGetAll()
        {
            // Fetch the collection
            var c = ds.Keywords.OrderBy(e => e.Description);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<KeywordBase>>(c);
        }

        public KeywordBase KeywordGetById(int id)
        {
            // Fetch the collection
            var o = ds.Keywords.Find(id);

            return (o == null) ? null : Mapper.Map<KeywordBase>(o);
         
        }

        public IEnumerable<KeywordBase> KeywordGetByQuestionId(int questionId)
        {
            // Fetch the collection
            var c = ds.Keywords.Where(d => d.QuestionId == questionId).ToList();

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<KeywordBase>>(c);
        }

        public KeywordBase KeywordAdd(KeywordAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedQuestion = ds.Questions.Find(newItem.QuestionId);

            var associatedProcess = ds.Processes.Find(newItem.ProcessId);

            if (associatedQuestion == null && associatedProcess == null)
            {
                return null;
            }
          
            Keyword addedItem = Mapper.Map<Keyword>(newItem);

            if (associatedQuestion != null)
            {
                addedItem.QuestionId = newItem.QuestionId;
            }
            if(associatedProcess != null)
            {
                addedItem.ProcessId = newItem.ProcessId;
            }

            ds.Keywords.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<KeywordBase>(addedItem);
        }

        // ***************************************************KEYWORD SECTION ************************************************

        public IEnumerable<MarkBase> MarkGetAll()
        {
            // Fetch the collection
            var c = ds.Marks.Find();

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<MarkBase>>(c);
        }

        public MarkBase MarkAdd (MarkAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedItem = ds.Scenarios.Find(newItem.ScenarioId);
            var associatedItem2 = ds.Sections.Find(newItem.SectionId);

            if (associatedItem == null || associatedItem2 == null)
            {
                return null;
            }

            Mark addedItem = Mapper.Map<Mark>(newItem);
            addedItem.ScenarioId = newItem.ScenarioId;
            addedItem.SectionId = newItem.SectionId;

            ds.Marks.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<MarkBase>(addedItem);
        }



    }

}