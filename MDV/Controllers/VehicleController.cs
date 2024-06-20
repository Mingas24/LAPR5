using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.Vehicle;
using MDV.Services;

namespace MDV.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _service;

        public VehicleController(IVehicleService service)
        {
            _service = service;
        }

        // GET: api/Vehicle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Vehicle/<id>
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new VehicleID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Vehicle
        [HttpPost]
        public async Task<ActionResult<VehicleDTO>> Create(CreatingVehicleDTO dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/Vehicle/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<VehicleDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new VehicleID(id));

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