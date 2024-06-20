using MDV.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDV.Domain.Driver
{
    public class DriverName : IValueObject
    {
        Regex rx = new Regex("[a-zA-Z]+", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string name { get; private set; }
        public DriverName() { }

        public DriverName(string name)
        {
            if (!rx.IsMatch(name))
            {
              throw new BusinessRuleValidationException("Invalid Name");  
            }
            this.name = name;
        }
    }
}