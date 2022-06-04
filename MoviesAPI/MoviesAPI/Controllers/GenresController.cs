using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController: ControllerBase
    {

        private readonly ILogger<GenresController> logger;

        public GenresController( ILogger<GenresController> logger)
        {
            this.logger = logger;
        }
        [HttpGet]
        public async Task<ActionResult<List<Genre>>> GetAll()
        {
            logger.LogInformation("Getting all the genres");
            return new List<Genre>() { new Genre() { Id = 1, Name = "Comedy" } };
        } 
        [HttpGet("{Id:int}", Name ="getGenre")]
        public ActionResult<Genre> Get(int Id)
        {
            throw new NotImplementedException();
        }
        [HttpPost]
        public ActionResult CreateGenre([FromBody] Genre genre)
        {
            throw new NotImplementedException();
        }
        [HttpPut]
        public ActionResult EditGenre([FromBody] Genre genre)
        {
            throw new NotImplementedException();
        }
        [HttpDelete]
        public ActionResult DeleteGenre()
        {
            throw new NotImplementedException();
        }
    }
}
