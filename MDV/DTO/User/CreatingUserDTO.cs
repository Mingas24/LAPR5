using System;


namespace MDV.DTO.User
{
    public class CreatingUserDTO
    {
        public Guid Id { get; set; }
        public string Mail { get; private set; }
        public string Pass { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
        public long PNumber { get; private set; }
        public string Role { get; private set; }
        public string Age { get; private set; }


        public CreatingUserDTO(string mail, string pass, string name, string address, long pNumber, string role, string age)
        {
            this.Mail = mail;
            this.Pass = pass;
            this.Name = name;
            this.Address = address;
            this.PNumber = pNumber;
            this.Role = role;
            this.Age = age;
        }

         public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingUserDTO driver = (CreatingUserDTO)obj;
                return (this.Mail.Equals(driver.Mail)) &&
                (this.Pass.Equals(driver.Pass)) &&
                (this.Name.Equals(driver.Name)) &&
                (this.Address.Equals(driver.Address)) &&
                (this.PNumber.Equals(driver.PNumber))&&
                (this.Role.Equals(driver.Role)) &&
                (this.Age.Equals(driver.Age)) ;
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Mail, Pass, Name, Address, PNumber,Role,Age);
        }
    }
}