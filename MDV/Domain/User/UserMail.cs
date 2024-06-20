using MDV.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDV.Domain.User
{
    public class UserMail : IValueObject
    {
        Regex rx = new Regex(".+@.+", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public string mail { get; private set; }
        public UserMail() { }

        public UserMail(string mail)
        {
            if (!rx.IsMatch(mail))
            {
                throw new BusinessRuleValidationException(mail + " invalid: Email invalid");
            }
            this.mail = mail;
        }
    }
}