using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.DTOs;
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
    public class GenresController : ControllerBase
    {

        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public GenresController(ILogger<GenresController> logger, ApplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<GenreDTO>>> GetAll()
        {
            logger.LogInformation("Getting all the genres");
            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<GenreDTO>>(genres);
        }
        [HttpGet("{Id:int}", Name = "getGenre")]
        public async Task<ActionResult<GenreDTO>> Get(int Id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == Id);
            if (genre == null)
            {
                return NotFound();
            }
            return mapper.Map<GenreDTO>(genre);
        }
        [HttpPost]
        public async Task<ActionResult> CreateGenre([FromBody] GenreCreatetionDTO genreCreatetionDTO)
        {
            var genre = mapper.Map<Genre>(genreCreatetionDTO);
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditGenre(int id, [FromBody] GenreCreatetionDTO genrecreatetionDTO)
        {
            var genre = mapper.Map<Genre>(genrecreatetionDTO);
            genre.Id = id;
            context.Entry(genre).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteGenre(int id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == id);
            if(genre == null)
            {
                NotFound();
            }
            context.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
