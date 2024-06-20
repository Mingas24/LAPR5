using MDV.Domain.Families;
using MDV.Infrastructure.Shared;

namespace MDV.Infrastructure.Families
{
    public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
    {
      
        public FamilyRepository(DDDSample1DbContext context):base(context.Families)
        {
            
        }

    }
}