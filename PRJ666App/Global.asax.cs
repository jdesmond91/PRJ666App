﻿using PRJ666App.App_Start;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using PRJ666App.Models;

namespace PRJ666App
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutoMapperConfig.RegisterMappings();

            //recreate the DB
            Database.SetInitializer<Models.ApplicationDbContext>(new DropCreateDatabaseIfModelChanges<Models.ApplicationDbContext>());

            //Database.SetInitializer<Models.ApplicationDbContext>(new DropCreateDatabaseAlways<Models.ApplicationDbContext>());      

            DataBaseInitializer.LoadScenarios();

            DataBaseInitializer.LoadSections();

            DataBaseInitializer.LoadQuestions();

            DataBaseInitializer.LoadKeywords();

        }
    }
}
