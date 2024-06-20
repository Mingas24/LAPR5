using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.User;
using MDV.DTO.User;
using MDV.Services;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService uService;

        public UserController(UserService service)
        {
            uService = service;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll()
        {
            return await uService.GetAllAsync();
        }

        // GET: api/User/5
        [HttpGet("{mail}")]
        public async Task<ActionResult<UserDTO>> GetGetById(string mail)
        {
            var cat = await uService.GetByMail(mail);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserDTO>> Create(CreatingUserDTO dto)
        {
            var cat = await uService.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { mail = cat.Mail }, cat);
        }
        
        // // DELETE: api/User/5
        // [HttpDelete("{id}/hard")]
        // public async Task<ActionResult<UserDTO>> HardDelete(Guid id)
        // {
        //     try
        //     {
        //         var cat = await uService.DeleteAsync(new UserID(id));

        //         if (cat == null)
        //         {
        //             return NotFound();
        //         }

        //         return Ok(cat);
        //     }
        //     catch(BusinessRuleValidationException ex)
        //     {
        //        return BadRequest(new {Message = ex.Message});
        //     }
        // }

        [HttpDelete("{mail}")]
        public async Task<ActionResult<UserDTO>> DeleteByMail(string mail)
        {
            try
            {
                var cat = await uService.DeleteByMail(mail);

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