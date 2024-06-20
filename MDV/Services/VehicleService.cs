using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Vehicle;

namespace MDV.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleRepository _repo;

        public VehicleService(IUnitOfWork unitOfWork, IVehicleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<VehicleDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<VehicleDTO> listDto = list.ConvertAll<VehicleDTO>(cat => new VehicleDTO
            {
                Id = cat.Id.AsGuid(),
                licensePlate = cat.licensePlate.vehicleLicensePlate,
                vehicleVIN = cat.vehicleVIN.vehicleVIN,
                vehicleTypeID = cat.vehicleTypeID.vehicleTypeID,
                vehicleEntranceDate = cat.vehicleEntranceDate.date
            });

            return listDto;
        }

        public async Task<VehicleDTO> GetByIdAsync(VehicleID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return new VehicleDTO
            {
                Id = cat.Id.AsGuid(),
                licensePlate = cat.licensePlate.vehicleLicensePlate,
                vehicleVIN = cat.vehicleVIN.vehicleVIN,
                vehicleTypeID = cat.vehicleTypeID.vehicleTypeID,
                vehicleEntranceDate = cat.vehicleEntranceDate.date
            };
        }

        public async Task<VehicleDTO> AddAsync(CreatingVehicleDTO dto)
        {
            var cat = new Vehicle();
            try
            {
                cat = new Vehicle(
                dto.licensePlate,
                dto.vehicleVIN,
                dto.vehicleTypeID,
                dto.vehicleEntranceDate
                );
            }
            
            catch{
                
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return new VehicleDTO
            {
                Id = cat.Id.AsGuid(),
                licensePlate = cat.licensePlate.vehicleLicensePlate,
                vehicleVIN = cat.vehicleVIN.vehicleVIN,
                vehicleTypeID = cat.vehicleTypeID.vehicleTypeID,
                vehicleEntranceDate = cat.vehicleEntranceDate.date
            };
        }

        public async Task<VehicleDTO> DeleteAsync(VehicleID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return new VehicleDTO
            {
                Id = cat.Id.AsGuid(),
                licensePlate = cat.licensePlate.vehicleLicensePlate,
                vehicleVIN = cat.vehicleVIN.vehicleVIN,
                vehicleTypeID = cat.vehicleTypeID.vehicleTypeID,
                vehicleEntranceDate = cat.vehicleEntranceDate.date
            };
        }
    }
}