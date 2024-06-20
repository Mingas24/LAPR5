using System;
using MDV.Domain.Shared;

namespace MDV.Domain.Families
{
    public class FamilyId : EntityId
    {

        public FamilyId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }
    }
}