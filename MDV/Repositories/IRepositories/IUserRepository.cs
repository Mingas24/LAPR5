using MDV.Domain.Shared;
using MDV.Domain.User;
using System.Threading.Tasks;

namespace MDV.Infrastructure.Users
{
    public interface IUserRepository: IRepository<User, UserID>
    {
        Task<User> GetByMail(string mail);
    }
}