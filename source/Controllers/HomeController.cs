using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AspNet_Vue.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            // TODO
            //if (Request.IsAuthenticated)
            //{
            //    return new FilePathResult("~/dist/index.html", "text/html");
            //}
            //else
            //{
            //    return new FilePathResult("~/dist/login.html", "text/html");
            //}

            return new FilePathResult("~/dist/index.html", "text/html");
        }
    }
}