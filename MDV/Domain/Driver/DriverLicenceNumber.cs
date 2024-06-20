using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Driver
{
    public class DriverLicenceNumber : IValueObject
    {
        Regex rx = new Regex("P-[0-9]{7} [0-9]", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string number { get; private set; }
        public int Length { get; }

        public DriverLicenceNumber(){}

        public DriverLicenceNumber(string number)
        {
            //restrição 9 elementos
            if (!rx.IsMatch(number))
            {
                throw new BusinessRuleValidationException(number + " invalid: Driver Number invalid");
            }
            this.number = number;
        }
    }
}