using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ActorApi.DTOs;
using ActorApi.Data.DAL;
using ActorApi.Data.Entities;
using ActorApi.DTOs.Actor;
using AutoMapper;

namespace ActorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ActorsController(AppDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Actors
        [HttpGet]
        public async Task<ActionResult> GetActors()
        {
           List<ActorGetDto>  actorDtos = _mapper.Map<List<ActorGetDto>>(await _context.Actors.ToListAsync());
            return Ok(actorDtos) ;
        }

        // GET: api/Actors/5
        [HttpGet("{name}")]
        public ActionResult GetActor(string name)
        {
            var actors = _mapper.Map<List<ActorGetDto>>(_context.Actors.Where(actor => actor.Name.ToLower().Contains(name.ToLower()))); 

            if (actors == null)
                return NotFound();
            
            return Ok(actors);
        }

        // PUT: api/Actors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, ActorUpdateDto dtoactor)
        {
            Actor dbactor=await _context.Actors.FindAsync(id);
            if(dbactor == null) return BadRequest();

            dbactor.Name= dtoactor.Name==""? dbactor.Name.Trim():dtoactor.Name.Trim();
            dbactor.Url=dtoactor.Url==""?dbactor.Url:dtoactor.Url;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Actors
        [HttpPost]
        public async Task<ActionResult> PostActor(ActorCreateDto dtoactor)
        {
            if(!ModelState.IsValid) return BadRequest();
            await _context.Actors.AddAsync(_mapper.Map<Actor>(dtoactor));
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Actors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
                return NotFound();

            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
