using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.VehicleService;
using System.Threading.Tasks;

namespace MDV.Domain.VehicleService
{
    public interface IVehicleServiceRepository: IRepository<VehicleServiceD, VehicleServiceID>
    {
    }
}