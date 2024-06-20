using MDV.Domain.Shared;

namespace MDV.Domain.Driver
{
    public class DriverCC : IValueObject
    {
        public long citizenCardNumber { get; private set; }

        public DriverCC() { }

        public DriverCC(long citizenCardNumber)
        {
            //restrição 8 números
            if ((9999999 > citizenCardNumber || citizenCardNumber > 100000000))
            {
                throw new BusinessRuleValidationException(citizenCardNumber + " invalid: Driver Citizen Card Number invalid");
            }
            this.citizenCardNumber = citizenCardNumber;
        }
    }
}