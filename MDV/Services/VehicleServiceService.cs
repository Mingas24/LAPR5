using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.VehicleService;
using MDV.Map;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;

namespace MDV.Services
{
    public class VehicleServiceService : IVehicleServiceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleServiceRepository _repo;
        private readonly IWorkblockService _repoWB;


        private VehicleServiceMap vsMap = new VehicleServiceMap();
        public VehicleServiceService(IUnitOfWork unitOfWork, IVehicleServiceRepository repo, IWorkblockService repoWB)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWB = repoWB;
        }

        public async Task<List<VehicleServiceDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<VehicleServiceDTO> listDto = list.ConvertAll<VehicleServiceDTO>(cat => vsMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<VehicleServiceDTO> GetByIdAsync(VehicleServiceID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return vsMap.DomainToDTO(cat);
        }
        public async Task<List<VehicleServiceDTO>> GetByDateAsync(string date)
        {
            var finalList = new List<VehicleServiceDTO>();
            var checkVSCode = new List<string>();
            var list = await this._repo.GetAllAsync();

            List<VehicleServiceDTO> listDto = list.ConvertAll<VehicleServiceDTO>(cat => vsMap.DomainToDTO(cat));
            foreach (VehicleServiceDTO vsDTO in listDto)
            {
                if (vsDTO.workblockList == null)
                {
                    break;
                }
                foreach (Workblock wb in vsDTO.workblockList)
                {
                    foreach (Trip trip in wb.trips)
                        if (trip.startDate.date == date && !checkVSCode.Contains(vsDTO.vehicleServiceCode))
                        {
                            checkVSCode.Add(vsDTO.vehicleServiceCode);
                            finalList.Add(vsDTO);
                        }
                }
            }
            return finalList;
        }

        public async Task<VehicleServiceDTO> AddAsync(CreatingVehicleServiceDTO dto)
        {
            var cat = new VehicleServiceD();
            List<Workblock> wbList = new List<Workblock>();
            try
            {
                foreach (string s in dto.workblockList)
                {
                    var aux = await this._repoWB.GetByCodeAsync(s);
                    wbList.Add(aux);
                }
                cat = vsMap.CreatingDTOToDomain(dto, wbList);
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Error Adding Vehicle Service");
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();
            return vsMap.DomainToDTO(cat);
        }

        public async Task<VehicleServiceDTO> DeleteAsync(VehicleServiceID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return vsMap.DomainToDTO(cat);
        }
    }
}