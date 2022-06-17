using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/movietheaters")]
    public class MovieTheatersController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieTheatersController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<MovieTheaterDTO>>> GetAll([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.MovieTheaters.AsQueryable();
            await HttpContext.InsertParamentersPaginationInHeader(queryable);
            var entities = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<MovieTheaterDTO>>(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieTheaterDTO>> GetById(int id)
        {
            var entities = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);
            if (entities == null)
            {
                return NotFound();
            }
            return mapper.Map<MovieTheaterDTO>(entities);
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] MovieTheaterCreationDTO movieTheaterCreationDTO)
        {
            var entities = mapper.Map<MovieTheater>(movieTheaterCreationDTO);
            context.Add(entities);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] MovieTheaterCreationDTO movieTheaterCreationDTO)
        {
            var entities = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);
            if (entities == null)
            {
                return NotFound();
            }
            entities = mapper.Map(movieTheaterCreationDTO, entities);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entities = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);
            if (entities == null)
            {
                return NotFound();
            }
            context.Remove(entities);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
