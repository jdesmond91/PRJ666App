using Microsoft.AspNet.Identity.EntityFramework;
using PRJ666App.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace PRJ666App.Models
{
    public static class DataBaseInitializer
    {
        public static async void LoadUserAccounts()
        {
            // Get a reference to the objects we need
            var ds = new ApplicationDbContext();
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(ds));

            // Add the user(s) that the app needs when loaded for the first time
            // Change any of the data below to better match your app's needs
            if (userManager.Users.Count() == 0)
            {
                var user = new ApplicationUser
                {
                    UserName = "admin@nurseapp.com",
                    Email = "admin@nurseapp.com",
                    GivenName = "Administrator",
                    Surname = "Adm"
                };
                var result = await userManager.CreateAsync(user, "NurseApp123");
                if (result.Succeeded)
                {
                    // Add claims                   
                    await userManager.AddClaimAsync(user.Id, new Claim(ClaimTypes.Role, "Administrator"));                   
                }
            }
        }
        public static void LoadScenarios()
        {

            Manager m = new Controllers.Manager();

            
            if (m.ScenarioGetAll().Count() == 0)
            {
                var scenario = new ScenarioAdd();
                scenario.Name = "Pt in Isolation with MRSA";
                scenario.Description = "Mrs. Blend is in an isolation room because she is positive for MRSA and has a UTI (urinary tract infection)";
                scenario.Goals = "find out how pt is feeling, do proper PPE, take VS";
                m.ScenarioAdd(scenario);
            }
        }

        public static void LoadSections()
        {

            Manager m = new Controllers.Manager();

            if (m.SectionGetAll().Count() == 0)
            {
                var section = new SectionAdd();

                section.Name = "Background";
                section.ScenarioId = 1;        
                m.SectionAdd(section);

                section.Name = "Part1";
                section.ScenarioId = 1;
                m.SectionAdd(section);

                section.Name = "VitalSigns1";
                section.ScenarioId = 1;
                m.SectionAdd(section);

                section.Name = "Doff PPE and Leave Room";
                section.ScenarioId = 1;
                m.SectionAdd(section);
            }
        }

        public static void LoadQuestions()
        {

            Manager m = new Controllers.Manager();

            if (m.QuestionGetAll().Count() == 0)
            {
                var question = new QuestionAdd();

                question.Description = "How are you?";
                question.Answer = "I’m having pain in my back.  I couldn’t sleep all night. I don’t feel well today";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "When did this pain start?";
                question.Answer = "After my first night in this hospital.  I think it’s this bed that’s making me so uncomfortable.  I haven’t moved from this bed for a few days and my back is getting stiffer every day";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Did the pain start suddenly or gradually?";
                question.Answer = "Not suddenly.  I’ve had this back pain on and off for years";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "What makes the pain worse";
                question.Answer = "When I don’t move around or sleep on an uncomfortable bed";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Can you describe the pain?";
                question.Answer = "It feels like a dull ache in my back";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Does the pain radiate anywhere?";
                question.Answer = "No, it’s just in my back";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Where in your back is your pain located?";
                question.Answer = "Mostly in my middle and lower back";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "How would you rate the pain out of 10 if 0 means no pain and 10 is the worst pain you’ve ever had?";
                question.Answer = "About 7/10";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "What do you take to help treat the back pain?";
                question.Answer = "I usually take Advil";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "What is your understanding of this pain?";
                question.Answer = "I’m not sure. Maybe it’s this uncomfortable bed or my arthritis acting up";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "How long have you had arthritis?";
                question.Answer = "5 years";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Where is the arthritis located?";
                question.Answer = "In my back and hands";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "What do you take to treat arthritis?";
                question.Answer = "I usually take Advil";
                question.ScenarioId = 1;
                question.SectionId = 2;
                m.QuestionAdd(question);

                question.Description = "Is it ok if I take your vital signs?";
                question.Answer = "Yes, you may take my vital signs";
                question.ScenarioId = 1;
                question.SectionId = 3;
                m.QuestionAdd(question);

                question.Description = "Is there anything else that you’re concerned about?";
                question.Answer = "Can you get me something for the pain";
                question.ScenarioId = 1;
                question.SectionId = 3;
                m.QuestionAdd(question);           

            }
        }

        public static void LoadKeywords()
        {

            Manager m = new Controllers.Manager();

            if (m.KeywordGetAll().Count() == 0)
            {
                var keyword = new KeywordAdd();

                // ************ QUESTION 1 ****************************************
                //How are you?

                keyword.Description = "how";
                keyword.QuestionId = 1;
                m.KeywordAdd(keyword);

                keyword.Description = "you";
                keyword.QuestionId = 1;
                m.KeywordAdd(keyword);

                keyword.Description = "feeling";
                keyword.QuestionId = 1;
                m.KeywordAdd(keyword);

                // ************ QUESTION 2 ****************************************
                //When did this pain start?

                keyword.Description = "when";
                keyword.QuestionId = 2;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 2;
                m.KeywordAdd(keyword);

                keyword.Description = "start";
                keyword.QuestionId = 2;
                m.KeywordAdd(keyword);

                // ************ QUESTION 3 ****************************************
                //Did the pain start suddenly or gradually?

                keyword.Description = "pain";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "start";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "suddenly";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "gradually";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                // ************ QUESTION 4 ****************************************
                //What makes the pain worse?

                keyword.Description = "what";
                keyword.QuestionId = 4;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 4;
                m.KeywordAdd(keyword);

                keyword.Description = "worse";
                keyword.QuestionId = 4;
                m.KeywordAdd(keyword);

                // ************ QUESTION 5 ****************************************
                //Can you describe the pain?

                keyword.Description = "describe";
                keyword.QuestionId = 5;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 5;
                m.KeywordAdd(keyword);

                // ************ QUESTION 6 ****************************************
                //Does the pain radiate anywhere?

                keyword.Description = "radiate";
                keyword.QuestionId = 6;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 6;
                m.KeywordAdd(keyword);

                // ************ QUESTION 7 ****************************************
                //Where in your back is your pain located?

                keyword.Description = "where";
                keyword.QuestionId = 7;
                m.KeywordAdd(keyword);

                keyword.Description = "back";
                keyword.QuestionId = 7;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 7;
                m.KeywordAdd(keyword);

                // ************ QUESTION 8 ****************************************
                //How would you rate the pain out of 10 if 0 means no pain and 10 is the worst pain you’ve ever had?

                keyword.Description = "how";
                keyword.QuestionId = 8;
                m.KeywordAdd(keyword);

                keyword.Description = "rate";
                keyword.QuestionId = 8;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 8;
                m.KeywordAdd(keyword);

                // ************ QUESTION 9 ****************************************
                //What do you take to help treat the back pain?

                keyword.Description = "what";
                keyword.QuestionId = 9;
                m.KeywordAdd(keyword);

                keyword.Description = "take";
                keyword.QuestionId = 9;
                m.KeywordAdd(keyword);

                keyword.Description = "treat";
                keyword.QuestionId = 9;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 9;
                m.KeywordAdd(keyword);

                // ************ QUESTION 10 ****************************************
                //What is your understanding of this pain?

                keyword.Description = "what";
                keyword.QuestionId = 10;
                m.KeywordAdd(keyword);

                keyword.Description = "understanding";
                keyword.QuestionId = 10;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 10;
                m.KeywordAdd(keyword);

                // ************ QUESTION 11 ****************************************
                //How long have you had arthritis?

                keyword.Description = "how";
                keyword.QuestionId = 11;
                m.KeywordAdd(keyword);

                keyword.Description = "long";
                keyword.QuestionId = 11;
                m.KeywordAdd(keyword);

                keyword.Description = "arthritis";
                keyword.QuestionId = 11;
                m.KeywordAdd(keyword);

                // ************ QUESTION 12 ****************************************
                //Where is the arthritis located?

                keyword.Description = "where";
                keyword.QuestionId = 12;
                m.KeywordAdd(keyword);

                keyword.Description = "arthritis";
                keyword.QuestionId = 12;
                m.KeywordAdd(keyword);

                keyword.Description = "located";
                keyword.QuestionId = 12;
                m.KeywordAdd(keyword);

                // ************ QUESTION 13 ****************************************
                //What do you take to treat arthritis?

                keyword.Description = "take";
                keyword.QuestionId = 13;
                m.KeywordAdd(keyword);

                keyword.Description = "treat";
                keyword.QuestionId = 13;
                m.KeywordAdd(keyword);

                keyword.Description = "arthritis";
                keyword.QuestionId = 13;
                m.KeywordAdd(keyword);

                // ************ QUESTION 14 ****************************************
                // Is it ok if I take your vital signs?

                keyword.Description = "ok";
                keyword.QuestionId = 14;
                m.KeywordAdd(keyword);

                keyword.Description = "take";
                keyword.QuestionId = 14;
                m.KeywordAdd(keyword);

                keyword.Description = "vital";
                keyword.QuestionId = 14;
                m.KeywordAdd(keyword);

                keyword.Description = "signs";
                keyword.QuestionId = 14;
                m.KeywordAdd(keyword);

                // ************ QUESTION 15 ****************************************
                // Is there anything else that you’re concerned about?

                keyword.Description = "anything";
                keyword.QuestionId = 15;
                m.KeywordAdd(keyword);

                keyword.Description = "concerned";
                keyword.QuestionId = 15;
                m.KeywordAdd(keyword);

                keyword.Description = "about";
                keyword.QuestionId = 15;
                m.KeywordAdd(keyword);

            }
        }
    }
}