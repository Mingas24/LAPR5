using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Trips;
using MDV.Map;
using MDV.DTO.Trips;
using MDV.Services;

namespace MDV.Services
{
    public class TripService : ITripService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITripRepository _repo;
        private TripMap tripMap = new TripMap();
        private TripScheduleMap tripScheduleMap = new TripScheduleMap();

        public TripService(IUnitOfWork unitOfWork, ITripRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<TripDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<TripDTO> listDto = list.ConvertAll<TripDTO>(cat => tripMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<TripDTO> GetByIdAsync(TripID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return tripMap.DomainToDTO(cat);
        }

        public async Task<TripDTO> AddAsync(CreatingTripDTO dto)
        {
            var cat = new Trip();
            try
            {
                cat = tripMap.CreatingDTOToDomain(dto);
            }
            catch (Exception)
            {
                throw (new Exception("Error Adding a Trip"));
            }
            await this._repo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return tripMap.DomainToDTO(cat);
        }

        public async Task<TripDTO> AddVarious(TripScheduleDTO dto)
        {
            var cat = new Trip();
            var frequency = Int64.Parse("0");
            while (dto.counter > 0)
            {
                List<TripDTO> list = await this.GetAllAsync();
                frequency = frequency + dto.frequency;
                try
                {
                    cat = tripScheduleMap.CreatingDTOToDomain(dto, list, frequency);
                }
                catch (Exception)
                {
                    throw (new Exception("Error Creating a Trip"));
                }
                await this._repo.AddAsync(cat);
                await this._unitOfWork.CommitAsync();
                dto.counter--;
            }
            return tripMap.DomainToDTO(cat);
        }
        public async Task<TripDTO> GetByCode(string code)
        {
            var cat = await this._repo.GetByCode(code);
            if (cat == null)
                return null;

            return tripMap.DomainToDTO(cat);

        }
        public async Task<TripDTO> DeleteAsync(TripID id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            this._repo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return tripMap.DomainToDTO(cat);
        }
    }
}