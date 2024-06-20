using MDV.Domain.Shared;

namespace MDV.Domain.VehicleService
{
    public class VehicleServiceColor : IValueObject
    {
        public string color { get; private set; }
        public VehicleServiceColor() { }

        public VehicleServiceColor(string color)
        {
            if(string.IsNullOrEmpty(color)){
                throw new BusinessRuleValidationException("Code is Empty or Null");
            }
            this.color = color;
        }
    }
}