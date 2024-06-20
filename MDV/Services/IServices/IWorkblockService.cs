using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Workblocks;
using MDV.DTO.Workblocks;

namespace MDV.Services
{
    public interface IWorkblockService
    {
        Task<List<WorkblockDTO>> GetAllAsync();
        Task<WorkblockDTO> GetByIdAsync(WorkblockID id);
        Task<Workblock> GetByCodeAsync(string code);
        Task<WorkblockDTO> AddAsync(CreatingWorkblockDTO dto);
        Task<WorkblockDTO> DeleteAsync(WorkblockID id);
    }
}