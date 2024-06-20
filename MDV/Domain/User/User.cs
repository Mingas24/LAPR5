using MDV.Domain.Shared;
using MDV.Domain.Utils;
using System;


namespace MDV.Domain.User
{
    public class User : Entity<UserID>, IAggregateRoot
    {
        public bool Active { get; private set; }
        public UserMail Mail { get; private set; }
        public UserPass Pass { get; private set; }
        public UserName Name { get; private set; }
        public UserAddress Address { get; private set; }
        public UserNumber PNumber { get; private set; }
        public UserRole Role { get; private set; }
        public Date Age { get; private set; }
        public User()
        {
            this.Active = true;
        }

        public User(string mail, string pass, string name, string address, long pNumber, string role, string age)
        {
            try
            {
                this.Id = new UserID(Guid.NewGuid());
                this.Mail = new UserMail(mail);
                this.Pass = new UserPass(pass);
                this.Name = new UserName(name);
                this.Address = new UserAddress(address);
                this.PNumber = new UserNumber(pNumber);
                this.Role = new UserRole(role);
                this.Age = new Date(age);
                this.Active = true;
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("invalid: User invalid");
            }
        }

        public void ChangeAddress(string address)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the address to an inactive User.");
            this.Address = new UserAddress(address);
        }

        public void ChangeRole(string role)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the role to an inactive User.");
            this.Role = new UserRole(role);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}