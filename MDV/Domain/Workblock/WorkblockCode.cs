using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace MDV.Domain.Workblocks
{
    public class WorkblockCode : IValueObject
    {
        Regex rx = new Regex("WB[a-zA-Z0-9]{4}", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string code { get; private set; }

        public WorkblockCode() { }

        public WorkblockCode(string code)
        {
            //restrição 9 elementos
            if (!rx.IsMatch(code))
            {
                throw new BusinessRuleValidationException(code + " invalid: Driver Number invalid");
            }
            this.code = code;
        }
    }
}