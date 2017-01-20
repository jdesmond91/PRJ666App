using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PRJ666App.Controllers
{
    public class KeywordsController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/Keywords
        public IHttpActionResult Get()
        {
            return Ok(m.KeywordGetAll());
        }

        // GET: api/Keywords/5
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.KeywordGetById(id.GetValueOrDefault());

            // Continue?
            if (o == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(o);
            }
        }

        // GET: api/Keywords/5/byquestion
        [Route("api/keywords/{questionid}/byquestion")]
        public IHttpActionResult GetByQuestion(int? questionid)
        {
            if (!questionid.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.KeywordGetByQuestionId(questionid.GetValueOrDefault());

            // Continue?
            if (o == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(o);
            }
        }

        // POST: api/Keywords
        public IHttpActionResult Post([FromBody]KeywordAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            // Attempt to add the new object
            var addedItem = m.KeywordAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/Keywords/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Keywords/5
        public void Delete(int id)
        {
        }
    }
}
