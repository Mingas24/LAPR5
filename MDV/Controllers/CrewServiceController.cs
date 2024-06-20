using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.CrewService;
using MDV.DTO.CrewServices;
using MDV.Services;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrewServiceController : ControllerBase
    {
        private readonly ICrewService _service;

        public CrewServiceController(ICrewService service)
        {
            _service = service;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrewServiceDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/CrewService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrewServiceDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new CrewServiceID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }
        
        // POST: api/Driver
        [HttpPost]
        public async Task<ActionResult<CrewServiceDTO>> Create(CreatingCrewServiceDTO dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/Driver/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<CrewServiceDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new CrewServiceID(id));

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

        //GET: api/CrewService/date/5
        [HttpGet("date/{date}")]
        public async Task<ActionResult<List<CrewServiceDTO>>> GetGetByDate(string date)
        {   
            return await _service.GetByDateAsync(date);
        }
    }
}