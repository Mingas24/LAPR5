using MDV.Domain.Shared;

namespace MDV.Domain.Driver
{
    public class DriverTypeID : IValueObject
    {
        public string driverTypeID { get; private set; }
        public DriverTypeID() { }

        public DriverTypeID(string driverTypeID)
        {
            if (string.IsNullOrEmpty(driverTypeID))
            {
                throw new BusinessRuleValidationException("invalid: Driver Type ID invalid");
            }
            this.driverTypeID = driverTypeID;
        }
    }
}