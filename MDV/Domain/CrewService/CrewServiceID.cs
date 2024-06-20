using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.CrewService
{
    public class CrewServiceID : EntityId
    {
        [JsonConstructor]
        public CrewServiceID(Guid value) : base(value)
        {
        }

        public CrewServiceID(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}