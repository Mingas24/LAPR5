using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using MDV.Services;
using MDV.DTO.Workblocks;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkblockController : ControllerBase
    {
        private readonly IWorkblockService _service;

        public WorkblockController(IWorkblockService service)
        {
            _service = service;
        }

        // GET: api/Workblock
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkblockDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Workblock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkblockDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new WorkblockID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Workblock
        [HttpPost]
        public async Task<ActionResult<WorkblockDTO>> Create(CreatingWorkblockDTO dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }
        
        // DELETE: api/Workblock/5/hard
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<WorkblockDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new WorkblockID(id));

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