using MDV.Domain.Shared;

namespace MDV.Domain.Products
{
    public interface IProductRepository: IRepository<Product,ProductId>
    {
    }
}