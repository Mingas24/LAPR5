using System;
using MDV.Domain.Shared;
using System.ComponentModel.DataAnnotations;


namespace MDV.Domain.Vehicle
{
    public class Vehicle : Entity<VehicleID>, IAggregateRoot
    {
        [Key]
        public VehicleLicensePlate licensePlate { get; private set; }

        public VehicleVIN vehicleVIN { get; private set; }

        public VehicleTypeID vehicleTypeID { get; private set; }

        public VehicleEntranceDate vehicleEntranceDate { get; private set; }

        

        public Vehicle() { }

        public Vehicle(string licensePlate, string vehicleVIN, string vehicleTypeID, string vehicleEntranceDate)
        {
            try
            {
                this.Id = new VehicleID(Guid.NewGuid());
                this.licensePlate = new VehicleLicensePlate(licensePlate);
                this.vehicleVIN = new VehicleVIN(vehicleVIN);
                this.vehicleTypeID = new VehicleTypeID(vehicleTypeID);
                this.vehicleEntranceDate = new VehicleEntranceDate(vehicleEntranceDate);
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("invalid: invalid vehicle");
            }
        }

         public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Vehicle vehicle = (Vehicle)obj;
                return (this.licensePlate.Equals(vehicle.licensePlate)) &&
                (this.vehicleVIN.Equals(vehicle.vehicleVIN)) &&
                (this.vehicleTypeID.Equals(vehicle.vehicleTypeID)) &&
                (this.vehicleEntranceDate.Equals(vehicle.vehicleEntranceDate));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(licensePlate, vehicleVIN, vehicleTypeID, vehicleEntranceDate);
        } 

        
        
    }

}