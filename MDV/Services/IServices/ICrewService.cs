using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.CrewService;
using MDV.DTO.CrewServices;

namespace MDV.Services
{
    public interface ICrewService
    {
        Task<List<CrewServiceDTO>> GetAllAsync();
        Task<CrewServiceDTO> GetByIdAsync(CrewServiceID id);
        Task<CrewServiceDTO> AddAsync(CreatingCrewServiceDTO dto);
        Task<CrewServiceDTO> DeleteAsync(CrewServiceID id);
        Task<List<CrewServiceDTO>> GetByDateAsync(string date);
    }
}