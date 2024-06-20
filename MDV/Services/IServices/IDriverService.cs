using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Driver;

namespace MDV.Services
{
    public interface IDriverService
    {
        Task<List<DriverDTO>> GetAllAsync();
        Task<DriverDTO> GetByIdAsync(DriverID id);

        Task<DriverDTO> AddAsync(CreatingDriverDTO dto);
        Task<DriverDTO> DeleteAsync(DriverID id);
    }
}