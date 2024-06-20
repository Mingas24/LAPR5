using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Driver;
using MDV.Map;
namespace MDV.Services
{
    public class DriverService:IDriverService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDriverRepository _repo;

        private DriverMap driverMap = new DriverMap();

        public DriverService(IUnitOfWork unitOfWork, IDriverRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<DriverDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<DriverDTO> listDto = list.ConvertAll<DriverDTO>(cat => driverMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<DriverDTO> GetByIdAsync(DriverID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return driverMap.DomainToDTO(cat);
        }

        public async Task<DriverDTO> AddAsync(CreatingDriverDTO dto)
        {
            var cat = new Driver();
            try
            {
                cat = driverMap.CreatingDTOToDomain(dto);
            }
            catch (Exception)
            {
                throw(new Exception("Error Adding a Driver"));
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return driverMap.DomainToDTO(cat);
        }

        public async Task<DriverDTO> DeleteAsync(DriverID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return driverMap.DomainToDTO(cat);
        }
    }
}