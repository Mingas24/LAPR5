using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.User;
using Xunit;

namespace Tests.UserTest
{
    public class UserTest
    {

        [Fact]
        public void CreateValidUser()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Normal";
            string Age = "10-10-2020";
            
            var user = new User(mail, pass, name, address, PNumber, Role, Age);
            Assert.True(user.GetType().Equals(new User().GetType()));
        }

        [Fact]
        public void CreateUserWithNullMail()
        {
            string mail = null;
            string pass = "123456789";
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail,  pass, name, address, PNumber, Role, Age));

        }

        [Fact]
        public void CreateUserWithoutPassword()
        {
            string mail = "test@test";
            string pass = null;
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";
            
            Assert.Throws<BusinessRuleValidationException>(() => new User(mail, pass, name, address, PNumber, Role, Age));
            
        }

        [Fact]
        public void CreateUserWithoutName()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = null;
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail, pass, name, address, PNumber, Role, Age));
            
        }

        [Fact]
        public void CreateUserWithoutAddress()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = "test";
            string address = null;
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail, pass, name, address, PNumber, Role, Age));
        }

        [Fact]
        public void CreateUserWithoutPhoneNumber()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = "test";
            string address = "testAdd";
            long PNumber = 123456789;
            string Role = "Admin";
            string Age = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail,  pass, name, address, PNumber, Role, Age));
            
        }

        [Fact]
        public void CreateUserWithoutRole()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = "test";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = null;
            string Age = "10-10-2020";

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail,  pass, name, address, PNumber, Role, Age));
            
        }

        [Fact]
        public void CreateUserWithoutAge()
        {
            string mail = "test@test";
            string pass = "123456789";
            string name = "test";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = null;

            Assert.Throws<BusinessRuleValidationException>(() => new User(mail,  pass, name, address, PNumber, Role, Age));
            
        }

        
    }
}
