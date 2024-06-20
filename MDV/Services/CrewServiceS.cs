using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using MDV.Domain.Trips;
using System;
using MDV.Domain.CrewService;
using MDV.Map;
using MDV.DTO.CrewServices;
using MDV.Infrastructure.CrewServices;
using MDV.Infrastructure.Workblocks;

namespace MDV.Services
{
    public class CrewServiceS : ICrewService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICrewServiceRepository _repo;
        private readonly IWorkblockRepository wRepo;

        private CrewServiceMap crewMap = new CrewServiceMap();

        public CrewServiceS(IUnitOfWork unitOfWork, ICrewServiceRepository repo, IWorkblockRepository workblock)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this.wRepo = workblock;
        }

        public async Task<List<CrewServiceDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<CrewServiceDTO> listDto = list.ConvertAll<CrewServiceDTO>(cat => crewMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<CrewServiceDTO> GetByIdAsync(CrewServiceID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return crewMap.DomainToDTO(cat);
        }

        public async Task<CrewServiceDTO> AddAsync(CreatingCrewServiceDTO dto)
        {
            var cat = new CrewService();
            List<Workblock> ts = new List<Workblock>();
            try
            {
                foreach (string s in dto.Workblocks)
                {
                    var aux = await this.wRepo.GetByCodeAsync(s);
                    ts.Add(aux);
                }
                cat = crewMap.CreatingDTOToDomain(dto, ts);
            }
            catch (Exception)
            {
                throw (new Exception("Error Adding a CrewService"));
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return crewMap.DomainToDTO(cat);
        }

        public async Task<CrewServiceDTO> DeleteAsync(CrewServiceID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return crewMap.DomainToDTO(cat);
        }

        public async Task<List<CrewServiceDTO>> GetByDateAsync(string date)
        {
            var finalList = new List<CrewServiceDTO>();
            var checkCSCode = new List<string>();
            var list = await this._repo.GetAllAsync();

            List<CrewServiceDTO> listDto = list.ConvertAll<CrewServiceDTO>(cat => crewMap.DomainToDTO(cat));
            foreach (CrewServiceDTO csDTO in listDto)
            {
                if(csDTO.Workblocks == null){
                    break;
                }
                foreach (Workblock wb in csDTO.Workblocks)
                {
                    foreach (Trip trip in wb.trips)
                        if (trip.startDate.date == date && !checkCSCode.Contains(csDTO.Code))
                        {
                            checkCSCode.Add(csDTO.Code);
                            finalList.Add(csDTO);
                        }
                }
            }
            return finalList;
        }

    }

}