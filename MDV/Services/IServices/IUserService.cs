using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.User;
using MDV.DTO.User;

namespace MDV.Services
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetAllAsync();
        Task<UserDTO> GetByMail(string mail);

        Task<UserDTO> AddAsync(CreatingUserDTO dto);
        Task<UserDTO> DeleteByMail(string mail);
    }
}