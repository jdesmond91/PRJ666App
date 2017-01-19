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
            addedItem.ScenarioId = newItem.SectionId;
            addedItem.SectionId = newItem.SectionId;

            //foreach (var keyword in addedItem.Keywords)
            //{

            //}

            ds.Questions.Add(addedItem);
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return Mapper.Map<QuestionBase>(addedItem);
        }

    }

}