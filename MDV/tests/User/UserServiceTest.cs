using System.Collections.Generic;
using MDV.Domain.User;
using MDV.Domain.Shared;
using MDV.DTO.User;
using MDV.Infrastructure.Users;
using MDV.Services;
using Moq;
using Xunit;

namespace Tests.UserTest
{

    public class UserServiceTest
    {

        [Fact]
        public async void GetAllAsyncTest()
        {
            var repo = new Mock<IUserRepository>();
            var uow = new Mock<IUnitOfWork>();

            string mail = "test@test";
            string pass = "123456789";
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";
            

            var user = new User(mail, pass, name, address, PNumber, Role, Age);
            var userID = new UserID(user.Id.AsGuid());
            var userDTO = new UserDTO
            {
                Id = user.Id.AsGuid(),
                Mail = mail,
                Pass = pass,
                Name = name,
                Address = address,
                PNumber = PNumber,
                Role = Role,
                Age = Age
            };

            var usersDTO = new List<UserDTO>() { userDTO };

            var userList = new List<User>() { user };

            repo.Setup(_ => _.GetAllAsync()).ReturnsAsync(userList);

            var userService = new UserService(uow.Object, repo.Object);

            var actual = await userService.GetAllAsync();

            Assert.Equal(usersDTO, actual);

        }

        [Fact]
        public async void GetByMailTest()
        {
            var repo = new Mock<IUserRepository>();
            var uow = new Mock<IUnitOfWork>();

            string mail = "test@test";
            string pass = "123456789";
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";

            var user = new User(mail, pass, name, address, PNumber, Role, Age);
            var userID = new UserID(user.Id.AsGuid());

            var userDTO = new UserDTO
            {
                Id = user.Id.AsGuid(),
                Mail = mail,
                Pass = pass,
                Name = name,
                Address = address,
                PNumber = PNumber,
                Role = Role,
                Age = Age
            };
            repo.Setup(_ => _.GetByMail(user.Mail.mail)).ReturnsAsync(user);

            var userService = new UserService(uow.Object, repo.Object);

            var actual = await userService.GetByMail(user.Mail.mail);

            Assert.Equal(userDTO, actual);
        }

        [Fact]
        public async void AddUser()
        {
            var repo = new Mock<IUserRepository>();
            var uow = new Mock<IUnitOfWork>();

            string mail = "test@test";
            string pass = "123456789";
            string name = "UserTes";
            string address = "testAdd";
            long PNumber = 987654321;
            string Role = "Admin";
            string Age = "10-10-2020";

            var user = new User(mail, pass, name, address, PNumber, Role, Age);
            var userID = new UserID(user.Id.AsGuid());

            var userDTO = new UserDTO
            {
                Id = user.Id.AsGuid(),
                Mail = mail,
                Pass = pass,
                Name = name,
                Address = address,
                PNumber = PNumber,
                Role = Role,
                Age = Age
            };

            var creatingUserDTO = new CreatingUserDTO(mail,pass,name,address,PNumber,Role,Age);

            repo.Setup(_ => _.AddAsync(user)).ReturnsAsync(user);

            var userService = new UserService(uow.Object, repo.Object);

            var actual = await userService.AddAsync(creatingUserDTO);

            Assert.Equal(userDTO, actual);
        }

    }

}