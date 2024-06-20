using MDV.Domain.Vehicle;
using MDV.Infrastructure.Shared;
using MDV.Infrastructure.Vehicles;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace MDV.Infrastructure.Vehicles

{
    public class VehicleRepository : BaseRepository<Vehicle, VehicleID>, IVehicleRepository
    {
        DbSet<Vehicle> vehicles;
        public VehicleRepository(DDDSample1DbContext context):base(context.Vehicle)
        {
            
            this.vehicles = context.Vehicle;
           
        }

        public Task<List<Vehicle>> GetVehicleByVIN (VehicleVIN VIN){
            var query = 
                from v in this.vehicles
                where v.vehicleVIN.vehicleVIN == VIN.vehicleVIN
                select v;

                return Task.Run (() => query.ToList<Vehicle> ());
        }

    }
}