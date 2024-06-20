using MDV.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDV.Domain.Trips
{
    public class TripCode : IValueObject
    {
        Regex rx = new Regex("T[a-zA-Z0-9]{1,4}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string code { get; private set; }

        public TripCode() { }

        public TripCode(string code)
        {
            //restrição 9 elementos
            if (!rx.IsMatch(code))
            {
                throw new BusinessRuleValidationException(code + " invalid: Trip Code invalid");
            }
            this.code = code;
        }
    }
}