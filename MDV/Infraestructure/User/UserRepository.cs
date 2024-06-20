using MDV.Domain.User;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace MDV.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserID>, IUserRepository
    {
        DbSet<User> users;
        public UserRepository(DDDSample1DbContext context) : base(context.User)
        {
            this.users = context.User;
        }
        public Task<User> GetByMail(string mail)
        {
            var query =
                from v in this.users
                where v.Mail.mail == mail
                select v;
            return Task.Run(() => query.Single<User>());
        }
    }
}