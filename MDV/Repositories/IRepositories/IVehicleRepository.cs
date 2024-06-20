using MDV.Domain.Shared;

namespace MDV.Domain.Vehicle
{
    public interface IVehicleRepository: IRepository<Vehicle, VehicleID>
    {
    }
}