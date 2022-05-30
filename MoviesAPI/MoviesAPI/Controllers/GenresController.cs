using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Entities;
using MoviesAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/genres")]
    public class GenresController: ControllerBase
    {
        private readonly IRepository repository;

        public GenresController(IRepository repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        [HttpGet("list")]
        [HttpGet("/allgenres")]
        public ActionResult<List<Genre>> GetAll()
        {
            return repository.GetAllGenres();
        } 
        [HttpGet("{Id:int}/{param2=felipe}")]
        public ActionResult<Genre> Get(int Id, string param2)
        {
            var genre = repository.GetGenreById(Id);
            if (genre == null)
            {
                return NotFound();
            }
            return genre;
        }
    }
}
