using MDV.Domain.Shared;

namespace MDV.Domain.User
{
    public class UserRole : IValueObject
    {
        public string role { get; private set; }
        public UserRole() { }

        public UserRole(string role)
        {
            if (role == "Admin" || role == "Normal")
            {
                this.role = role;
            }
            else
            {
                throw new BusinessRuleValidationException(role + " invalid: role invalid");
            }

        }
    }
}