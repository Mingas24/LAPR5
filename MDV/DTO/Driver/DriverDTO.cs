using System;
using System.Collections.Generic;

namespace MDV.Domain.Driver
{
    public class DriverDTO
    {
        public Guid Id { get; set; }
        public long driverCC { get; set; }
        public string dced { get; set; }
        public string dcld { get; set; }
        public string driverDate { get; set; }
        public string dled { get; set; }
        public string dln { get; set; }
        public string driverName { get; set; }
        public long driverNIF { get; set; }
        public string driverNumber { get; set; }
        public List<DriverTypeID> driverType { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                DriverDTO driver = (DriverDTO)obj;
                return (this.driverNumber.Equals(driver.driverNumber)) &&
                (this.driverCC.Equals(driver.driverCC)) &&
                (this.driverName.Equals(driver.driverName)) &&
                (this.driverNIF.Equals(driver.driverNIF)) &&
                (this.dln.Equals(driver.dln));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(driverNumber, driverCC, driverName, driverNIF, dln);
        }
    }
}