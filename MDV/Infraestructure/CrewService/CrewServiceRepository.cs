using MDV.Domain.CrewService;
using MDV.Infrastructure.Shared;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace MDV.Infrastructure.CrewServices

{
    public class CrewServiceRepository : BaseRepository<CrewService, CrewServiceID>, ICrewServiceRepository
    {
        DbSet<CrewService> crew;
        public CrewServiceRepository(DDDSample1DbContext context):base(context.CrewService)
        {
            
            this.crew = context.CrewService;
            context.CrewService.Include(vs=>vs.Workblocks.ToList());;
           
        }
    }
}