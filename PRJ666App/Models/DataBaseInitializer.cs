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
                //SCENARIO 1
                var scenario = new ScenarioAdd();
                scenario.Name = "Pt in Isolation with MRSA";
                scenario.Description = "Mrs. Blend is in an isolation room because she is positive for MRSA and has a UTI (urinary tract infection)";
                scenario.Goals = "find out how pt is feeling, do proper PPE, take VS";
                m.ScenarioAdd(scenario);

                //SCENARIO 2
                scenario.Name = "Mr. Smith is an 84 year old man with pneumonia";
                scenario.Description = "Mr. Smith has a productive cough and is in isolation.  Today is the second day of his hospitalization. His respiratory function needs to be assessed";
                scenario.Goals = "don proper PPE, find out how pt is feeling, find out about his pneumonia , do a respiratory assessment, find out if pt has any additional concerns, chart findings";
                m.ScenarioAdd(scenario);
            }                     
        }

        public static void LoadSections()
        {

            Manager m = new Controllers.Manager();

            if (m.SectionGetAll().Count() == 0)
            {
                var section = new SectionAdd();

                //SCENARIO 1
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

                //SCENARIO 2
                section.Name = "Background";
                section.ScenarioId = 2;
                m.SectionAdd(section);

                section.Name = "Patient Assessment";
                section.ScenarioId = 2;
                m.SectionAdd(section);

                section.Name = "Background History";
                section.ScenarioId = 2;
                m.SectionAdd(section);

                section.Name = "Immunization";
                section.ScenarioId = 2;
                m.SectionAdd(section);
            }          
            
        }

        public static void LoadQuestions()
        {

            Manager m = new Controllers.Manager();

            if (m.QuestionGetAll().Count() == 0)
            {
                var question = new QuestionAdd();

                //SCENARIO 1
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

                //SCENARIO 2    
                question.Description = "How are you?";
                question.Answer = "A little better this morning.  I still have a cough that’s keeping me up at night.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Could I perform a respiratory assessment on you?";
                question.Answer = "Yes, that’s fine.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "When you cough, do you cough up anything?";
                question.Answer = "Yes.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "What colour is it?";
                question.Answer = "Greenish-yellow.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "What causes the cough?";
                question.Answer = "I’m not sure. I just seem to cough all the time.  Especially when I exert myself or talk a lot.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you ever get short of breath?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you have any chest pain when you cough?";
                question.Answer = "Yes, a little.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Where is the pain?";
                question.Answer = "In the middle of my chest.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you have difficulty breathing?";
                question.Answer = "Yes, at night, with this pneumonia.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "How many pillow do you use to sleep?";
                question.Answer = "Only 1 here in the hospital because they raise the head of my bed which helps my breathing.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you have any allergies?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you smoke?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Have you ever smoked?";
                question.Answer = "No, never";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Does anyone in your home smoke?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "What is your job?";
                question.Answer = "I’m retired but I used to be in sales.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Were you exposed to cigarette smoke at work?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you take any medications?";
                question.Answer = "I take medicine for my arthritis pain, high blood pressure, and eyedrops for glaucoma.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Have you travelled anywhere recently?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 6;
                m.QuestionAdd(question);

                question.Description = "Do you have asthma?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Did you ever have asthma as a child?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you been exposed to anyone with pneumonia?";
                question.Answer = "Not that I know of.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Do you have any lung diseases such as cancer, emphysema, bronchitis, cystic fibrosis?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you ever had or been exposed to tuberculosis?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you had any recent changes in fatigue?";
                question.Answer = "Yes, I’ve been more tired with this pneumonia.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you had any recent changes in weight?";
                question.Answer = "No. But my appetite has decreased with this pneumonia.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you had any night sweats?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you had any swelling in your legs recently?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you ever had any surgery on your lungs?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Have you ever had any injuries to your lungs or chest?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 7;
                m.QuestionAdd(question);

                question.Description = "Did you get an annual flu shot?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 8;
                m.QuestionAdd(question);

                question.Description = "Did you get an annual pneumonia vaccine?";
                question.Answer = "No.";
                question.ScenarioId = 2;
                question.SectionId = 8;
                m.QuestionAdd(question);

            }
            
        }

        public static void LoadKeywords()
        {

            Manager m = new Controllers.Manager();

            if (m.KeywordGetAll().Count() == 0)
            {
                var keyword = new KeywordAdd();

                //SCENARIO 1

                // ************ QUESTION 1 ****************************************
                //How are you?
                keyword.Description = "how";
                keyword.QuestionId = 1;
                m.KeywordAdd(keyword);

                keyword.Description = "are";
                keyword.QuestionId = 1;
                m.KeywordAdd(keyword);

                keyword.Description = "you";
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

                keyword.Description = "sudden";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "gradual";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "begin";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "quick";
                keyword.QuestionId = 3;
                m.KeywordAdd(keyword);

                keyword.Description = "slow";
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

                keyword.Description = "like";
                keyword.QuestionId = 5;
                m.KeywordAdd(keyword);

                // ************ QUESTION 6 ****************************************
                //Does the pain radiate anywhere?

                keyword.Description = "radiate";
                keyword.QuestionId = 6;
                m.KeywordAdd(keyword);

                keyword.Description = "spread";
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

                keyword.Description = "feel";
                keyword.QuestionId = 7;
                m.KeywordAdd(keyword);

                // ************ QUESTION 8 ****************************************
                //How would you rate the pain out of 10 if 0 means no pain and 10 is the worst pain you’ve ever had?

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

                keyword.Description = "how";
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

                keyword.Description = "understand";
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

                // ************ QUESTION 13 ****************************************
                //What do you take to treat arthritis?

                keyword.Description = "treat";
                keyword.QuestionId = 13;
                m.KeywordAdd(keyword);

                keyword.Description = "arthritis";
                keyword.QuestionId = 13;
                m.KeywordAdd(keyword);

                // ************ QUESTION 14 ****************************************
                // Is it ok if I take your vital signs?

                keyword.Description = "take";
                keyword.QuestionId = 14;
                m.KeywordAdd(keyword);

                keyword.Description = "check";
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

                keyword.Description = "any";
                keyword.QuestionId = 15;
                m.KeywordAdd(keyword);

                keyword.Description = "concern";
                keyword.QuestionId = 15;
                m.KeywordAdd(keyword);

                //SCENARIO 2

                // ************ QUESTION 1 ****************************************
                //How are you?
                keyword.Description = "how";
                keyword.QuestionId = 50;
                m.KeywordAdd(keyword);

                keyword.Description = "are";
                keyword.QuestionId = 50;
                m.KeywordAdd(keyword);

                keyword.Description = "you";
                keyword.QuestionId = 50;
                m.KeywordAdd(keyword);

                // ************ QUESTION 2 ****************************************
                //Could I perform a respiratory assessment on you?

                keyword.Description = "respiratory";
                keyword.QuestionId = 51;
                m.KeywordAdd(keyword);

                keyword.Description = "assessment";
                keyword.QuestionId = 51;
                m.KeywordAdd(keyword);

                // ************ QUESTION 3 ****************************************
                //When you cough, do you cough up anything?

                keyword.Description = "cough";
                keyword.QuestionId = 52;
                m.KeywordAdd(keyword);

                keyword.Description = "any";
                keyword.QuestionId = 52;
                m.KeywordAdd(keyword);

                // ************ QUESTION 4 ****************************************
                //What colour is it?

                keyword.Description = "colour";
                keyword.QuestionId = 53;
                m.KeywordAdd(keyword);

                keyword.Description = "what";
                keyword.QuestionId = 53;
                m.KeywordAdd(keyword);

                // ************ QUESTION 5 ****************************************
                //What causes the cough?

                keyword.Description = "cause";
                keyword.QuestionId = 54;
                m.KeywordAdd(keyword);

                keyword.Description = "make";
                keyword.QuestionId = 54;
                m.KeywordAdd(keyword);

                keyword.Description = "cough";
                keyword.QuestionId = 54;
                m.KeywordAdd(keyword);

                // ************ QUESTION 6 ****************************************
                //Do you ever get short of breath?

                keyword.Description = "short";
                keyword.QuestionId = 55;
                m.KeywordAdd(keyword);

                keyword.Description = "breath";
                keyword.QuestionId = 55;
                m.KeywordAdd(keyword);

                // ************ QUESTION 7 ****************************************
                //Do you have any chest pain when you cough?

                keyword.Description = "chest";
                keyword.QuestionId = 57;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 57;
                m.KeywordAdd(keyword);

                keyword.Description = "cough";
                keyword.QuestionId = 57;
                m.KeywordAdd(keyword);

                // ************ QUESTION 8 ****************************************
                //Where is the pain?

                keyword.Description = "where";
                keyword.QuestionId = 58;
                m.KeywordAdd(keyword);

                keyword.Description = "pain";
                keyword.QuestionId = 58;
                m.KeywordAdd(keyword);

                // ************ QUESTION 9 ****************************************
                //Do you have difficulty breathing?

                keyword.Description = "breath";
                keyword.QuestionId = 59;
                m.KeywordAdd(keyword);

                keyword.Description = "difficult";
                keyword.QuestionId = 59;
                m.KeywordAdd(keyword);

                keyword.Description = "hard";
                keyword.QuestionId = 59;
                m.KeywordAdd(keyword);

                // ************ QUESTION 10 ****************************************
                //How many pillow do you use to sleep?

                keyword.Description = "pillow";
                keyword.QuestionId = 60;
                m.KeywordAdd(keyword);

                keyword.Description = "sleep";
                keyword.QuestionId = 60;
                m.KeywordAdd(keyword);

                // ************ QUESTION 11 ****************************************
                //Do you have any allergies?

                keyword.Description = "allerg";
                keyword.QuestionId = 61;
                m.KeywordAdd(keyword);

                keyword.Description = "any";
                keyword.QuestionId = 61;
                m.KeywordAdd(keyword);

                // ************ QUESTION 12 ****************************************
                //Do you smoke?

                keyword.Description = "you";
                keyword.QuestionId = 62;
                m.KeywordAdd(keyword);

                keyword.Description = "smoke";
                keyword.QuestionId = 62;
                m.KeywordAdd(keyword);

                // ************ QUESTION 13 ****************************************
                //Have you ever smoked?

                keyword.Description = "you";
                keyword.QuestionId = 63;
                m.KeywordAdd(keyword);

                keyword.Description = "smoke";
                keyword.QuestionId = 63;
                m.KeywordAdd(keyword);

                keyword.Description = "before";
                keyword.QuestionId = 63;
                m.KeywordAdd(keyword);

                keyword.Description = "past";
                keyword.QuestionId = 63;
                m.KeywordAdd(keyword);

                // ************ QUESTION 14 ****************************************
                //Does anyone in your home smoke?

                keyword.Description = "smoke";
                keyword.QuestionId = 64;
                m.KeywordAdd(keyword);

                keyword.Description = "house";
                keyword.QuestionId = 64;
                m.KeywordAdd(keyword);

                keyword.Description = "home";
                keyword.QuestionId = 64;
                m.KeywordAdd(keyword);

                // ************ QUESTION 15 ****************************************
                //What is your job?

                keyword.Description = "what";
                keyword.QuestionId = 65;
                m.KeywordAdd(keyword);

                keyword.Description = "job";
                keyword.QuestionId = 65;
                m.KeywordAdd(keyword);

                keyword.Description = "occupation";
                keyword.QuestionId = 65;
                m.KeywordAdd(keyword);

                keyword.Description = "work";
                keyword.QuestionId = 65;
                m.KeywordAdd(keyword);

                // ************ QUESTION 16 ****************************************
                //Were you exposed to cigarette smoke at work?

                keyword.Description = "smoke";
                keyword.QuestionId = 66;
                m.KeywordAdd(keyword);

                keyword.Description = "work";
                keyword.QuestionId = 66;
                m.KeywordAdd(keyword);

                // ************ QUESTION 17 ****************************************
                //Do you take any medications?

                keyword.Description = "take";
                keyword.QuestionId = 67;
                m.KeywordAdd(keyword);

                keyword.Description = "medication";
                keyword.QuestionId = 67;
                m.KeywordAdd(keyword);

                keyword.Description = "medicine";
                keyword.QuestionId = 67;
                m.KeywordAdd(keyword);

                // ************ QUESTION 18 ****************************************
                //Have you travelled anywhere recently?

                keyword.Description = "travel";
                keyword.QuestionId = 68;
                m.KeywordAdd(keyword);

                // ************ QUESTION 19 ****************************************
                //Do you have asthma?

                keyword.Description = "do";
                keyword.QuestionId = 69;
                m.KeywordAdd(keyword);

                keyword.Description = "asthma";
                keyword.QuestionId = 69;
                m.KeywordAdd(keyword);

                // ************ QUESTION 20 ****************************************
                // Did you ever have asthma as a child?

                keyword.Description = "have";
                keyword.QuestionId = 70;
                m.KeywordAdd(keyword);

                keyword.Description = "asthma";
                keyword.QuestionId = 70;
                m.KeywordAdd(keyword);

                keyword.Description = "past";
                keyword.QuestionId = 70;
                m.KeywordAdd(keyword);

                keyword.Description = "before";
                keyword.QuestionId = 70;
                m.KeywordAdd(keyword);

                keyword.Description = "child";
                keyword.QuestionId = 70;
                m.KeywordAdd(keyword);

                // ************ QUESTION 21 ****************************************
                //Have you been exposed to anyone with pneumonia?

                keyword.Description = "any";
                keyword.QuestionId = 71;
                m.KeywordAdd(keyword);

                keyword.Description = "pneumonia";
                keyword.QuestionId = 71;
                m.KeywordAdd(keyword);

                // ************ QUESTION 22 ****************************************
                //Do you have any lung diseases such as cancer, emphysema, bronchitis, cystic fibrosis?

                keyword.Description = "lung";
                keyword.QuestionId = 72;
                m.KeywordAdd(keyword);

                keyword.Description = "disease";
                keyword.QuestionId = 72;
                m.KeywordAdd(keyword);

                // ************ QUESTION 23 ****************************************
                //Have you ever had or been exposed to tuberculosis?

                keyword.Description = "tuberculosis";
                keyword.QuestionId = 73;
                m.KeywordAdd(keyword);

                // ************ QUESTION 24 ****************************************
                //Have you had any recent changes in fatigue?

                keyword.Description = "fatigue";
                keyword.QuestionId = 74;
                m.KeywordAdd(keyword);

                keyword.Description = "have";
                keyword.QuestionId = 74;
                m.KeywordAdd(keyword);

                // ************ QUESTION 25 ****************************************
                //Have you had any recent changes in weight?

                keyword.Description = "weight";
                keyword.QuestionId = 75;
                m.KeywordAdd(keyword);

                keyword.Description = "have";
                keyword.QuestionId = 75;
                m.KeywordAdd(keyword);

                // ************ QUESTION 26 ****************************************
                //Have you had any night sweats?

                keyword.Description = "sweat";
                keyword.QuestionId = 77;
                m.KeywordAdd(keyword);

                keyword.Description = "night";
                keyword.QuestionId = 77;
                m.KeywordAdd(keyword);

                // ************ QUESTION 27 ****************************************
                //Have you had any swelling in your legs recently?

                keyword.Description = "leg";
                keyword.QuestionId = 78;
                m.KeywordAdd(keyword);

                keyword.Description = "swell";
                keyword.QuestionId = 78;
                m.KeywordAdd(keyword);

                // ************ QUESTION 28 ****************************************
                //Have you ever had any surgery on your lungs?

                keyword.Description = "surgery";
                keyword.QuestionId = 80;
                m.KeywordAdd(keyword);

                keyword.Description = "lung";
                keyword.QuestionId = 80;
                m.KeywordAdd(keyword);

                // ************ QUESTION 29 ****************************************
                //Have you ever had any injuries to your lungs or chest?

                keyword.Description = "injur";
                keyword.QuestionId = 81;
                m.KeywordAdd(keyword);

                keyword.Description = "lung";
                keyword.QuestionId = 81;
                m.KeywordAdd(keyword);

                keyword.Description = "chest";
                keyword.QuestionId = 81;
                m.KeywordAdd(keyword);

                // ************ QUESTION 30 ****************************************
                //Did you get an annual flu shot?

                keyword.Description = "flu";
                keyword.QuestionId = 82;
                m.KeywordAdd(keyword);

                keyword.Description = "shot";
                keyword.QuestionId = 82;
                m.KeywordAdd(keyword);

                keyword.Description = "vaccine";
                keyword.QuestionId = 82;
                m.KeywordAdd(keyword);

                // ************ QUESTION 31 ****************************************
                //Did you get an annual pneumonia vaccine?

                keyword.Description = "pneumonia";
                keyword.QuestionId = 83;
                m.KeywordAdd(keyword);

                keyword.Description = "vaccine";
                keyword.QuestionId = 83;
                m.KeywordAdd(keyword);

            }
        }
    }
}