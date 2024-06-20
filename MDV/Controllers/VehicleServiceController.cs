using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.VehicleService;
using MDV.Services;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleServiceController : ControllerBase
    {
        private readonly IVehicleServiceService _service;

        public VehicleServiceController(IVehicleServiceService service)
        {
            _service = service;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleServiceDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/VehicleService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleServiceDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new VehicleServiceID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }
        
        // POST: api/Driver
        [HttpPost]
        public async Task<ActionResult<VehicleServiceDTO>> Create(CreatingVehicleServiceDTO dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/Driver/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<VehicleServiceDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new VehicleServiceID(id));

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

        // GET: api/VehicleService/date/5
        [HttpGet("date/{date}")]
        public async Task<ActionResult<List<VehicleServiceDTO>>> GetGetByDate(string date)
        {   
            return await _service.GetByDateAsync(date);
        }
    }
}