using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.Categories
{
    public class CategoryId : EntityId
    {
        [JsonConstructor]
        public CategoryId(Guid value) : base(value)
        {
        }

        public CategoryId(String value) : base(value)
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