using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Services;
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
        private readonly IRepository repository;
        private readonly ILogger<GenresController> logger;

        public GenresController(IRepository repository, ILogger<GenresController> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }
        [HttpGet]
        [HttpGet("list")]
        [HttpGet("/allgenres")]
        /*[ResponseCache(Duration =60)]*/
        [ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<List<Genre>>> GetAll()
        {
            logger.LogInformation("Getting all the genres");
            return await repository.GetAllGenres();
        } 
        [HttpGet("{Id:int}", Name ="getGenre")]
        public ActionResult<Genre> Get(int Id,string param2)
        {
            logger.LogDebug("get by Id method executing...");
            var genre = repository.GetGenreById(Id);
            if (genre == null)
            {
                logger.LogWarning($"Genre with Id {Id} not found");
                logger.LogError("This is an error");
/*                throw new ApplicationException();*/
                return NotFound();
            }
            return genre;
        }
        [HttpPost]
        public ActionResult CreateGenre([FromBody] Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            repository.AddGenre(genre);
            return NoContent();
        }
        [HttpPut]
        public ActionResult EditGenre([FromBody] Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return NoContent();
        }
    }
}
