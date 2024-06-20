using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Trips;
using System;
using MDV.Domain.Workblocks;
using MDV.Map;
using MDV.DTO.Workblocks;
using MDV.Infrastructure.Workblocks;

namespace MDV.Services
{
    public class WorkblockService : IWorkblockService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWorkblockRepository _repo;
        private readonly ITripRepository tRepo;

        private WorkblockMap driverMap = new WorkblockMap();

        public WorkblockService(IUnitOfWork unitOfWork, IWorkblockRepository repo, ITripRepository trip)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this.tRepo = trip;
        }

        public async Task<List<WorkblockDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<WorkblockDTO> listDto = list.ConvertAll<WorkblockDTO>(cat => driverMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<WorkblockDTO> GetByIdAsync(WorkblockID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return driverMap.DomainToDTO(cat);
        }

        public async Task<WorkblockDTO> AddAsync(CreatingWorkblockDTO dto)
        {
            var cat = new Workblock();
            List<Trip> ts = new List<Trip>();
            try
            {
                foreach (string s in dto.trips){
                    var aux = await this.tRepo.GetByCode(s);
                    ts.Add(aux);
                }
                cat = driverMap.CreatingDTOToDomain(dto, ts);
            }
            catch (Exception)
            {
                throw (new Exception("Error Adding a Workblock"));
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return driverMap.DomainToDTO(cat);
        }

        public async Task<WorkblockDTO> DeleteAsync(WorkblockID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return driverMap.DomainToDTO(cat);
        }

        public async Task<Workblock> GetByCodeAsync(string code)
        {
            var cat = await this._repo.GetByCodeAsync(code);

            if (cat == null)
                return null;

            return cat;
        }
    }

}