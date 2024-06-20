using MDV.Domain.Products;
using MDV.Infrastructure.Shared;

namespace MDV.Infrastructure.Products
{
    public class ProductRepository : BaseRepository<Product, ProductId>,IProductRepository
    {
        public ProductRepository(DDDSample1DbContext context):base(context.Products)
        {
           
        }
    }
}