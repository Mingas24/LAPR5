using MDV.Domain.Shared;

namespace MDV.Domain.User
{
    public class UserAddress : IValueObject
    {
        public string address { get; private set; }
        public UserAddress() { }

        public UserAddress(string address)
        {
            if (string.IsNullOrEmpty(address))
            {
                throw new BusinessRuleValidationException(address + " invalid: Address invalid");
            }
            this.address = address;
        }
    }
}