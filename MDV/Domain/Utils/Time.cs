using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Utils
{
    public class Time : IValueObject
    {
        Regex rx = new Regex("^([1-9]|[0-2][0-9]|(3)[0-1])(-)([1-9]|((0)[1-9])|((1)[0-2]))(-)(1|2)[0-9]{3} (([0-1][0-9])|([2][0-3])):([0-5][0-9])$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string datetime { get; private set; }

        public Time() { }

        public Time(string datetime)
        {
            if (!rx.IsMatch(datetime))
            {
                throw new BusinessRuleValidationException(datetime + " invalid: Date invalid");
            }
            this.datetime = datetime;
        }
    }
}