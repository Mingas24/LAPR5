using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Vehicle
{
    public class VehicleEntranceDate : IValueObject
    {
        Regex rx = new Regex("^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)[1-9][0-9]{3}$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string date { get; private set; }

        public VehicleEntranceDate() { }

        public VehicleEntranceDate(string date)
        {
            if (!rx.IsMatch(date))
            {
                throw new BusinessRuleValidationException(date + " invalid: invalid date!");
            }
            this.date = date;
        }
    }
}