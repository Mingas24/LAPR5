using MDV.Domain.VehicleService;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MDV.Infrastructure.VehicleServices
{
    public class VehicleServiceRepository : BaseRepository<VehicleServiceD, VehicleServiceID>, IVehicleServiceRepository
    {
        DbSet<VehicleServiceD> vs;
        public VehicleServiceRepository(DDDSample1DbContext context):base(context.VehicleService)
        {
            this.vs=context.VehicleService;
           context.VehicleService.Include(vs=>vs.workblockCodeList).ToList();
        }

    }
}