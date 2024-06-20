using MDV.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace MDV.Domain.Trips
{
    public interface ITripRepository: IRepository<Trip, TripID>
    {
        Task<Trip> GetByCode(string code);
    }
}