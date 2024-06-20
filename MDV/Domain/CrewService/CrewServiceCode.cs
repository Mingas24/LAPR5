using MDV.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDV.Domain.CrewService
{
    public class CrewServiceCode : IValueObject
    {
        Regex rx = new Regex("C[a-zA-Z0-9]{1,4}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string code { get; private set; }

        public CrewServiceCode() { }

        public CrewServiceCode(string code)
        {
            //restrição 9 elementos
            if (!rx.IsMatch(code))
            {
                throw new BusinessRuleValidationException(code + " invalid: CrewService Code invalid");
            }
            this.code = code;
        }
    }
}