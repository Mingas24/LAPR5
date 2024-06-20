using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Utils
{
    public class Hours : IValueObject
    {
        Regex rx = new Regex("^(([0-1][0-9])|([2][0-3])):([0-5][0-9])$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string datetime { get; private set; }

        public Hours() { }

        public Hours(string datetime)
        {
            if (!rx.IsMatch(datetime))
            {
                throw new BusinessRuleValidationException(datetime + " invalid: Time invalid");
            }
            this.datetime = datetime;
        }
    }
}