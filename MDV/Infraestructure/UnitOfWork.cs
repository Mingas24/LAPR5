using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DDDSample1DbContext _context;

        public UnitOfWork(DDDSample1DbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}