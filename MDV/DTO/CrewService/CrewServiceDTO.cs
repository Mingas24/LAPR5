using System;
using System.Collections.Generic;
using MDV.Domain.Workblocks;

namespace MDV.DTO.CrewServices
{
    public class CrewServiceDTO
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public List<Workblock> Workblocks { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CrewServiceDTO workblock = (CrewServiceDTO)obj;
                return (this.Code.Equals(workblock.Code))
                ;
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Code);
        }
    }
}