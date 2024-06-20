using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.VehicleService;

namespace MDV.Services
{
    public interface IVehicleServiceService
    {
        Task<List<VehicleServiceDTO>> GetAllAsync();
        Task<VehicleServiceDTO> GetByIdAsync(VehicleServiceID id);
        Task<List<VehicleServiceDTO>> GetByDateAsync(string date);
        Task<VehicleServiceDTO> AddAsync(CreatingVehicleServiceDTO dto);
        Task<VehicleServiceDTO> DeleteAsync(VehicleServiceID id);
    }
}