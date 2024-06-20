using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.Workblocks
{
    public class WorkblockID : EntityId
    {

        private string wbID { get; set; }

        [JsonConstructor]
        public WorkblockID(Guid value) : base(value)
        {
        }

        public WorkblockID(String value) : base(value)
        {
        }

        override
        protected Object createFromString(String text)
        {
            return new Guid(text);
        }

        override
        public String AsString()
        {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }


        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }
}