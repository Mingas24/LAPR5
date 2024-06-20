using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Utils
{
    public class Date : IValueObject
    {
        Regex rx = new Regex("^([1-9]|[0-2][0-9]|(3)[0-1])(-)([1-9]|((0)[1-9])|((1)[0-2]))(-)(1|2)[0-9]{3}$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string date { get; private set; }

        public Date() { }

        public Date(string date)
        {
            if (!rx.IsMatch(date))
            {
                throw new BusinessRuleValidationException("Date isn´t in Regex Format");
            }
            this.date = date;
        }
    }
}