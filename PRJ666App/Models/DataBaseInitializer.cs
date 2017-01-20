using PRJ666App.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRJ666App.Models
{
    public static class DataBaseInitializer
    {
        public static void LoadCaims()
        {

            Manager m = new Controllers.Manager();

            
           /* if (m.AppClaimGetAll().Count() == 0)
            {
                var claimSales = new AppClaimAdd();
                claimSales.Description = "Organizational Unit for Sales Employees";
                claimSales.ClaimType = "OU";
                claimSales.ClaimValue = "Sales";
                m.AppClaimAdd(claimSales);

                var claimProdMan = new AppClaimAdd();
                claimProdMan.Description = "Organizational Unit for Product Managers";
                claimProdMan.ClaimType = "OU";
                claimProdMan.ClaimValue = "ProductManager";
                m.AppClaimAdd(claimProdMan);

                var claimAdvert = new AppClaimAdd();
                claimAdvert.Description = "Organizational Unit for Product Advertisers";
                claimAdvert.ClaimType = "OU";
                claimAdvert.ClaimValue = "ProductAdvertiser";
                m.AppClaimAdd(claimAdvert);

                var claimCustService = new AppClaimAdd();
                claimCustService.Description = "Organizational Unit for Customer Service Employees";
                claimCustService.ClaimType = "OU";
                claimCustService.ClaimValue = "CustomerService";
                m.AppClaimAdd(claimCustService);

                var webDev = new AppClaimAdd();
                webDev.Description = "Organizational Unit for Web Site Developers";
                webDev.ClaimType = "OU";
                webDev.ClaimValue = "WebDeveloper";
                m.AppClaimAdd(webDev);

                var custEdit = new AppClaimAdd();
                custEdit.Description = "Task for Customer Edition";
                custEdit.ClaimType = "Task";
                custEdit.ClaimValue = "CustomerEditor";
                m.AppClaimAdd(custEdit);

                var albumEdit = new AppClaimAdd();
                albumEdit.Description = "Task for Album Edition";
                albumEdit.ClaimType = "Task";
                albumEdit.ClaimValue = "AlbumEditor";
                m.AppClaimAdd(albumEdit);

                var employeeEdit = new AppClaimAdd();
                employeeEdit.Description = "Task for Employee Edition";
                employeeEdit.ClaimType = "Task";
                employeeEdit.ClaimValue = "EmployeeEditor";
                m.AppClaimAdd(employeeEdit);

                var albumFetch = new AppClaimAdd();
                albumFetch.Description = "Task for Fetching Album";
                albumFetch.ClaimType = "Task";
                albumFetch.ClaimValue = "AlbumFetch";
                m.AppClaimAdd(albumFetch);

                var invoiceFetch = new AppClaimAdd();
                invoiceFetch.Description = "Task for Fetching Invoice";
                invoiceFetch.ClaimType = "Task";
                invoiceFetch.ClaimValue = "InvoiceFetch";
                m.AppClaimAdd(invoiceFetch);

            }*/
        }
    }
}