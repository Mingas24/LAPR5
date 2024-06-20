using System;
using System.Collections.Generic;
using MDV.Domain.Workblocks;

namespace MDV.Domain.VehicleService
{
    public class VehicleServiceDTO
    {

        public Guid Id { get; set; }
        public string vehicleServiceName { get; set; }
        public string vehicleServiceCode { get; set; }
        public string vehicleServiceColor { get; set; }
        public List<Workblock> workblockList { get; set; }
       
       public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                VehicleServiceDTO driver = (VehicleServiceDTO)obj;
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