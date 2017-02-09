using System.Web;
using System.Web.Optimization;

namespace PRJ666App
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            bundles.Add(new StyleBundle("~/bundles/nursingapp/style").Include(
                     "~/Content/bootstrap.css"));

           bundles.Add(new ScriptBundle("~/bundles/nursingapp/script").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-resource.js",
                      "~/Scripts/jquery-1.10.2.js",
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js",                     
                      "~/app/app.js",
                      "~/app/Services/common.services.js",
                      "~/app/Services/loginService.js",
                      "~/app/Controllers/loginController.js",
                      "~/app/Controllers/registerController.js",
                      "~/app/Services/userProfile.js",
                      "~/app/Services/questionService.js",
                      "~/app/Controllers/questionController.js",
                      "~/app/Services/scenarioService.js",
                      "~/app/Controllers/scenarioController.js",
                      "~/app/Controllers/headerController.js",
                      "~/app/Controllers/practiceController.js",
                      "~/app/Services/semanticService.js"));

        }
    }
}
