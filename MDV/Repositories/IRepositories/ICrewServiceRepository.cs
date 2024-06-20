using MDV.Domain.Shared;
using MDV.Domain.CrewService;
using System.Threading.Tasks;

namespace MDV.Infrastructure.CrewServices
{
    public interface ICrewServiceRepository: IRepository<CrewService, CrewServiceID>
    {
    }
}