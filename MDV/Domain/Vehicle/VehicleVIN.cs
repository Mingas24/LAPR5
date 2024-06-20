using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Vehicle
{
    public class VehicleVIN : IValueObject
    {
        Regex rx = new Regex(@"^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public string vehicleVIN { get; private set; }

        public VehicleVIN() { }

        public VehicleVIN(string vehicleVIN)
        {
            
            if (!rx.IsMatch(vehicleVIN))
            {
                throw new BusinessRuleValidationException("invalid vehicle identification number!");
            }
            this.vehicleVIN = vehicleVIN;
        }
    }
}