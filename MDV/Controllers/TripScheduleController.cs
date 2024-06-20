using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using MDV.Services;
using MDV.DTO.Trips;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripScheduleController : ControllerBase
    {
        private readonly ITripService _service;

        public TripScheduleController(ITripService service)
        {
            _service = service;
        }

        // GET: api/TripSchedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/TripSchedule/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new TripID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/TripSchedule
        [HttpPost]
        public async Task<ActionResult<TripDTO>> Create(TripScheduleDTO dto)
        {
            var cat = await _service.AddVarious(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/TripSchedule/5/hard
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<TripDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new TripID(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}