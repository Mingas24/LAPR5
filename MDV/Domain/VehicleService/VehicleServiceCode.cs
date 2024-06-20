using MDV.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDV.Domain.VehicleService
{
    public class VehicleServiceCode : IValueObject
    {
        Regex rx = new Regex("[a-zA-Z0-9]{10}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string code { get; private set; }
        public VehicleServiceCode() { }

        public VehicleServiceCode(string code)
        {
            if(!rx.IsMatch(code)){
                throw new BusinessRuleValidationException("Vehicle Service Code is Invalid");
            }
            this.code = code;
        }
    }
}