using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.User
{
    public class UserID : EntityId
    {
        [JsonConstructor]
        public UserID(Guid value) : base(value)
        {
        }

        public UserID(String value) : base(value)
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