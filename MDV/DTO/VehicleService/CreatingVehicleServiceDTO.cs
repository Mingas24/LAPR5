using System;
using System.Collections.Generic;
using MDV.Domain.Workblocks;
using MDV.DTO.Workblocks;

namespace MDV.Domain.VehicleService
{
    public class CreatingVehicleServiceDTO
    {
        public Guid Id { get; set; }
        public string vehicleServiceName { get; set; }
        public string vehicleServiceCode { get; set; }
        public string vehicleServiceColor { get; set; }
        public List<string> workblockList { get; set; }

        public CreatingVehicleServiceDTO(string vehicleServiceName, string vehicleServiceCode, string vehicleServiceColor, List<string> workblockCodeList)
        {
            this.vehicleServiceName = vehicleServiceName;
            this.vehicleServiceCode = vehicleServiceCode;
            this.vehicleServiceColor = vehicleServiceColor;
            this.workblockList = workblockCodeList;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingVehicleServiceDTO driver = (CreatingVehicleServiceDTO)obj;
                return (this.vehicleServiceCode.Equals(driver.vehicleServiceCode)) &&
                (this.vehicleServiceColor.Equals(driver.vehicleServiceColor)) &&
                (this.vehicleServiceName.Equals(driver.vehicleServiceName));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(vehicleServiceCode, vehicleServiceColor, vehicleServiceName);
        }
    }
}