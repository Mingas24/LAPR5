using MDV.Domain.Shared;
using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace MDV.Domain.Vehicle
{
    public class VehicleLicensePlate : IValueObject
    {
        Regex rx = new Regex(@"^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        
        public string vehicleLicensePlate { get; private set; }

         public VehicleLicensePlate(){}

        [JsonConstructor]
        public VehicleLicensePlate(string vehicleLicensePlate)
        {
            
            if (!rx.IsMatch(vehicleLicensePlate))
            {
                throw new BusinessRuleValidationException("invalid license plate!");
            }
            this.vehicleLicensePlate = vehicleLicensePlate;
            
        }

        
    }
}