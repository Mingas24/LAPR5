using MDV.Domain.Shared;

namespace MDV.Domain.User
{
    public class UserNumber : IValueObject
    {
        public long number { get; private set; }
        public bool IsNull { get; }
        public UserNumber() { }

        public UserNumber(long number)
        {
            if ((number < 910000000 || number > 999999999))
            {
                throw new BusinessRuleValidationException(number + " invalid: Phone Number invalid");
            }
            this.number = number;
        }
    }
}