using MDV.Domain.Shared;

namespace MDV.Domain.Driver
{
    public class DriverNIF : IValueObject
    {
        public long nif { get; private set; }

        public DriverNIF() { }

        public DriverNIF(long nif)
        {
            //restrição 9 números
            if (99999999 > nif || nif > 1000000000)
            {
                throw new BusinessRuleValidationException(nif + " invalid: Driver NIF invalid");
            }
            this.nif = nif;
        }
    }
}