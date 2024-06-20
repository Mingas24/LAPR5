using System.Collections.Generic;
using MDV.Domain.VehicleService;
using MDV.Domain.Workblocks;


namespace MDV.Map
{
    public class VehicleServiceMap
    {
        public VehicleServiceDTO DomainToDTO(VehicleServiceD vs)
        {
            return new VehicleServiceDTO
            {
                Id = vs.Id.AsGuid(),
                vehicleServiceName = vs.vehicleServiceName.name,
                vehicleServiceCode = vs.vehicleServiceCode.code,
                vehicleServiceColor = vs.vehicleServiceColor.color,
                workblockList = vs.workblockCodeList
            };
        }

        public VehicleServiceD CreatingDTOToDomain(CreatingVehicleServiceDTO vsDTO,List<Workblock> wbList)
        {
            return new VehicleServiceD(
            vsDTO.vehicleServiceName,
            vsDTO.vehicleServiceCode,
            vsDTO.vehicleServiceColor,
            wbList);
        }
    }
}