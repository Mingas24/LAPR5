using System;

namespace MDV.DTO.User
{

    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Mail { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public long PNumber { get; set; }
        public string Role { get; set; }
        public string Age { get; set; }
        
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                UserDTO driver = (UserDTO)obj;
                return (this.Mail.Equals(driver.Mail)) &&
                (this.Pass.Equals(driver.Pass)) &&
                (this.Name.Equals(driver.Name)) &&
                (this.Address.Equals(driver.Address)) &&
                (this.PNumber.Equals(driver.PNumber)) &&
                (this.Role.Equals(driver.Role)) &&
                (this.Age.Equals(driver.Age));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Mail, Pass, Name, Address, PNumber, Role, Age);
        }
    }

}
