using System;
using MDV.Domain.Shared;
using MDV.Domain.Workblocks;
using System.Collections.Generic;

namespace MDV.Domain.CrewService
{
    public class CrewService : Entity<CrewServiceID>, IAggregateRoot
    {
        public CrewServiceCode Code { get; private set; }

        public List<Workblock> Workblocks { get; private set; }

        public CrewService() { }

        public CrewService(string code, List<Workblock> workblocks)
        {
            try
            {
                this.Id = new CrewServiceID(Guid.NewGuid());
                this.Code = new CrewServiceCode(code);
                if (workblocks.Count == 0)
                {
                    throw new BusinessRuleValidationException("List is null or empty");
                }
                this.Workblocks = workblocks;
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("invalid: invalid vehicle");
            }
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CrewService crew = (CrewService)obj;
                return (this.Code.Equals(crew.Code));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Code);
        }



    }

}