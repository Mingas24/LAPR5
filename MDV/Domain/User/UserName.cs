using MDV.Domain.Shared;

namespace MDV.Domain.User
{
    public class UserName : IValueObject
    {
        public string name { get; private set; }
        public UserName() { }

        public UserName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new BusinessRuleValidationException(name + " invalid: name invalid");
            }
            this.name = name;
        }
    }
}