using MDV.Domain.Shared;

namespace MDV.Domain.User
{
    public class UserPass : IValueObject
    {
        public string pass { get; private set; }
        public UserPass() { }

        public UserPass(string pass)
        {
            if (pass.Length < 6)
            {
                throw new BusinessRuleValidationException(pass + " invalid: Password invalid");
            }
            this.pass = pass;
        }
    }
}