using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Workblocks;
using System;
using MDV.Domain.CrewService;
using MDV.DTO.CrewServices;

namespace MDV.Map
{
    public class CrewServiceMap
    {
        public CrewServiceDTO DomainToDTO(CrewService CrewService)
        {
            return new CrewServiceDTO
            {
                Id = CrewService.Id.AsGuid(),
                Code = CrewService.Code.code,
                Workblocks = CrewService.Workblocks
            };
        }

        public CrewService CreatingDTOToDomain(CreatingCrewServiceDTO CrewServiceDTO, List<Workblock> workblocks)
        {
            return new CrewService(
            CrewServiceDTO.Code,
            workblocks
            );
        }
    }
}