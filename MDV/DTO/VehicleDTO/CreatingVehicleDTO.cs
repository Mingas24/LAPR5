using System;


namespace MDV.Domain.Vehicle
{
    public class CreatingVehicleDTO
    {
        public Guid Id { get; set; }
        public string licensePlate { get; set; }
        public string vehicleVIN { get; set; }
        public string vehicleTypeID { get; set; }
        public string vehicleEntranceDate { get; set; }


        public CreatingVehicleDTO(string licensePlate, string vehicleVIN, string vehicleType, string vehicleEntranceDate)

        {
            this.licensePlate = licensePlate;
            this.vehicleVIN = vehicleVIN;
            this.vehicleTypeID = vehicleType;
            this.vehicleEntranceDate = vehicleEntranceDate;

        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingVehicleDTO vehicle = (CreatingVehicleDTO)obj;
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