using MDV.Domain.Shared;

namespace MDV.Domain.VehicleService
{
    public class VehicleServiceName : IValueObject
    {
        public string name { get; private set; }
        public VehicleServiceName() { }

        public VehicleServiceName(string name)
        {
            if(string.IsNullOrEmpty(name)){
                throw new BusinessRuleValidationException("Name is Empty or Null");
            }
            this.name = name;
        }
    }
}