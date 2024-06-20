using MDV.Domain.Trips;
using MDV.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MDV.Infrastructure.Trips
{
    public class TripRepository : BaseRepository<Trip, TripID>, ITripRepository
    {
        DbSet<Trip> trips;
        public TripRepository(DDDSample1DbContext context) : base(context.Trip)
        {
            this.trips = context.Trip;
        }
        public Task<Trip> GetByCode(string code)
        {
            var query =
                from v in this.trips
                where v.tripCode.code == code
                select v;

            return Task.Run(() => query.Single<Trip>());
        }
    }
}