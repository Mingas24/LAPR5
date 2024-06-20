using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.Driver;
using MDV.Services;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IDriverService _service;

        public DriverController(IDriverService service)
        {
            _service = service;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Driver/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new DriverID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Driver
        [HttpPost]
        public async Task<ActionResult<DriverDTO>> Create(CreatingDriverDTO dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/Driver/5/hard
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DriverDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new DriverID(id));

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