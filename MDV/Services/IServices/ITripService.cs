using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Trips;
using MDV.DTO.Trips;

namespace MDV.Services
{
    public interface ITripService
    {
        Task<List<TripDTO>> GetAllAsync();
        Task<TripDTO> GetByIdAsync(TripID id);
        Task<TripDTO> AddAsync(CreatingTripDTO dto);
        Task<TripDTO> AddVarious(TripScheduleDTO dto);
        Task<TripDTO> GetByCode(string code);
        Task<TripDTO> DeleteAsync(TripID id);
    }
}