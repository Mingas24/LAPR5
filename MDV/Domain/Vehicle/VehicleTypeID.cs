using MDV.Domain.Shared;

namespace MDV.Domain.Vehicle
{
    public class VehicleTypeID : IValueObject
    {
        public string vehicleTypeID { get; private set; }
        public VehicleTypeID() { }

        public VehicleTypeID(string vehicleTypeID)
        {
            if (string.IsNullOrEmpty(vehicleTypeID))
            {
                throw new BusinessRuleValidationException("invalid: invalid Vehicle Type ID ");
            }
            this.vehicleTypeID = vehicleTypeID;
        }
    }
}