using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Driver
{
    public class DriverNumber : IValueObject
    {
        Regex rx = new Regex("[a-zA-Z0-9]{9}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string number { get; private set; }
        public int Length { get; }

        public DriverNumber() { }

        public DriverNumber(string number)
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