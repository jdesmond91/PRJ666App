using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PRJ666App.Controllers
{
    public class SectionsController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/Sections
        public IHttpActionResult Get()
        {
            return Ok(m.SectionGetAll());
        }

        // GET: api/Sections/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Sections
        public IHttpActionResult Post([FromBody]SectionAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            // Attempt to add the new object
            var addedItem = m.SectionAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/Sections/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Sections/5
        public void Delete(int id)
        {
        }
    }
}
