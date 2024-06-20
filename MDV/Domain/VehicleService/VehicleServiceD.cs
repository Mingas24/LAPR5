using System;
using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using System.Collections.Generic;

namespace MDV.Domain.VehicleService
{
    public class VehicleServiceD : Entity<VehicleServiceID>, IAggregateRoot
    {
        public VehicleServiceName vehicleServiceName { get; private set; }

        public VehicleServiceCode vehicleServiceCode { get; private set; }

        public VehicleServiceColor vehicleServiceColor { get; private set; }

        public List<Workblock> workblockCodeList { get; private set; }

        public VehicleServiceD() { }

        public VehicleServiceD(string vehicleServiceName, string vehicleServiceCode, string vehicleServiceColor, List<Workblock> workblockList)
        {
            try
            {
                this.Id = new VehicleServiceID(Guid.NewGuid());
                this.vehicleServiceName = new VehicleServiceName(vehicleServiceName);
                this.vehicleServiceCode = new VehicleServiceCode(vehicleServiceCode);
                this.vehicleServiceColor = new VehicleServiceColor(vehicleServiceColor);
                if (workblockList.Count == 0)
                {
                    throw new BusinessRuleValidationException("Workblock is null or empty");
                }
                this.workblockCodeList = workblockList;
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("invalid: Vehicle Service invalid");
            }
        }
    }

}