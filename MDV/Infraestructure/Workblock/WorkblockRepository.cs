using MDV.Domain.Workblocks;
using MDV.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MDV.Infrastructure.Workblocks
{
    public class WorkblockRepository : BaseRepository<Workblock, WorkblockID>, IWorkblockRepository
    {
        DbSet<Workblock> workblocks;
        public WorkblockRepository(DDDSample1DbContext context):base(context.Workblock)
        {
            this.workblocks = context.Workblock;
            context.Workblock.Include(vs=>vs.trips).ToList();;
        }
        public Task<Workblock> GetByCodeAsync (string wb){
            var query = 
                from v in this.workblocks
                where v.workblockCode.code == wb
                select v;
                return Task.Run (() => query.Single<Workblock>());
        }
    }
}