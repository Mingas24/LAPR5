using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MDV.Infrastructure.Workblocks
{
    public interface IWorkblockRepository: IRepository<Workblock, WorkblockID>
    {
        Task<Workblock> GetByCodeAsync(string code);
    }
}