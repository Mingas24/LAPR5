using MDV.Domain.Driver;
using MDV.Infrastructure.Shared;

namespace MDV.Infrastructure.Drivers
{
    public class DriverRepository : BaseRepository<Driver, DriverID>, IDriverRepository
    {
        public DriverRepository(DDDSample1DbContext context):base(context.Driver)
        {
           
        }

    }
}