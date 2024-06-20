using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Vehicle;

namespace MDV.Services
{
    public interface IVehicleService
    {
        Task<List<VehicleDTO>> GetAllAsync();
        Task<VehicleDTO> GetByIdAsync(VehicleID id);

        Task<VehicleDTO> AddAsync(CreatingVehicleDTO dto);
        Task<VehicleDTO> DeleteAsync(VehicleID id);
    }
}