using MDV.Domain.Categories;
using MDV.Infrastructure.Shared;

namespace MDV.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
    
        public CategoryRepository(DDDSample1DbContext context):base(context.Categories)
        {
           
        }


    }
}