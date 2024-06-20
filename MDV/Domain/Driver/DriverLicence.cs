using System;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.Utils;

namespace MDV.Domain.Driver
{

    public class DriverLicence : Entity<DriverLicenceID>, IAggregateRoot
    {
        public Date dled { get; private set; }
        public DriverLicenceNumber dln { get; private set; }

        public DriverLicence() { }

        public DriverLicence(string dledString,string dlnString)
        {
            try
            {
                this.Id = new DriverLicenceID(Guid.NewGuid());
                this.dln = new DriverLicenceNumber(dlnString);
                this.dled = new Date(dledString);
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("invalid: Driver Licence invalid");
            }
        }
    }
}