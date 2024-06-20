using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.User;
using MDV.DTO.User;
using MDV.Infrastructure.Users;
using MDV.Map;

namespace MDV.Services
{
    public class UserService:IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository uRepo;
        private UserMap userMap = new UserMap();

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this.uRepo = repo;
        }

        public async Task<List<UserDTO>> GetAllAsync()
        {
            var list = await this.uRepo.GetAllAsync();

            List<UserDTO> listDto = list.ConvertAll<UserDTO>(cat => userMap.DomainToDTO(cat));

            return listDto;
        }

        public async Task<UserDTO> GetByMail(string mail)
        {
            var cat = await this.uRepo.GetByMail(mail);

            if (cat == null)
                return null;

            return userMap.DomainToDTO(cat);
        }

        public async Task<UserDTO> AddAsync(CreatingUserDTO dto)
        {
            var cat = new User();
            try
            {
                cat = userMap.CreatingDTOToDomain(dto);
            }
            catch (Exception)
            {
                throw (new Exception("Error Adding User"));
            }
            await this.uRepo.AddAsync(cat);
            await this._unitOfWork.CommitAsync();

            return userMap.DomainToDTO(cat);
        }
        public async Task<UserDTO> DeleteByMail(string mail)
        {
            var cat = await this.uRepo.GetByMail(mail);

            if (cat == null)
                return null;

            this.uRepo.Remove(cat);
            await this._unitOfWork.CommitAsync();

            return userMap.DomainToDTO(cat);
        }
    }
}