using MDV.DTO.User;
using MDV.Domain.User;

namespace MDV.Map
{
    public class UserMap
    {
        public UserDTO DomainToDTO(User user){
            return new UserDTO
            {
                Id = user.Id.AsGuid(),
                Mail = user.Mail.mail,
                Pass = user.Pass.pass,
                Name = user.Name.name,
                Address = user.Address.address,
                PNumber = user.PNumber.number,
                Role = user.Role.role,
                Age = user.Age.date
            };
        }

        public User CreatingDTOToDomain(CreatingUserDTO userDTO){
                return new User(
                userDTO.Mail,
                userDTO.Pass,
                userDTO.Name,
                userDTO.Address,
                userDTO.PNumber,
                userDTO.Role,
                userDTO.Age);
        }
    }
}