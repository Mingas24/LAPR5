using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Vehicle;
namespace MDV.Map
{
    public class VehicleMap
    {
        public VehicleDTO DomainToDTO(Vehicle vehicle)
        {
            return new VehicleDTO
            {
                Id = vehicle.Id.AsGuid(),
                licensePlate = vehicle.licensePlate.vehicleLicensePlate,
                vehicleVIN = vehicle.vehicleVIN.vehicleVIN,
                vehicleTypeID = vehicle.vehicleTypeID.vehicleTypeID,
                vehicleEntranceDate = vehicle.vehicleEntranceDate.date

            };
        }

        public Vehicle CreatingDTOToDomain(CreatingVehicleDTO vehicleDTO)
        {

            return new Vehicle(
            vehicleDTO.licensePlate,
            vehicleDTO.vehicleVIN,
            vehicleDTO.vehicleTypeID,
            vehicleDTO.vehicleEntranceDate);
        }
    }
}