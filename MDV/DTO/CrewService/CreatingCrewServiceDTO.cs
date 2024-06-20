using System;
using System.Collections.Generic;

namespace MDV.DTO.CrewServices
{
    public class CreatingCrewServiceDTO
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public List<string> Workblocks { get; set; }
        public CreatingCrewServiceDTO(string code, List<string> workblocks)
        {
            this.Code = code;
            this.Workblocks = workblocks;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingCrewServiceDTO workblock = (CreatingCrewServiceDTO)obj;
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