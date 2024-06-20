using System;
using System.Collections.Generic;

namespace MDV.Domain.Driver
{
    public class CreatingDriverDTO
    {
        public Guid Id { get; set; }
        public long citizenCardNumber { get; set; }
        public string entryDate { get; set; }
        public string leavingDate { get; set; }
        public string birthDate { get; set; }
        public string dled { get; set; }
        public string dln { get; set; }
        public string driverName { get; set; }
        public long driverNIF { get; set; }
        public string mecanographicNumber { get; set; }
        public List<DriverTypeID> driverTypeIDList { get; set; }


        public CreatingDriverDTO(string driverNumber, string driverName, string driverDate, long driverCC,
        long driverNIF, string dced, string dcld, List<string> driverType, string dln, string dled)
        {
            List<DriverTypeID> auxList = new List<DriverTypeID>();
            this.mecanographicNumber = driverNumber;
            this.driverName = driverName;
            this.citizenCardNumber = driverCC;
            this.entryDate = dced;
            this.leavingDate = dcld;
            this.birthDate = driverDate;
            this.dled = dled;
            this.dln = dln;
            this.driverNIF = driverNIF;
            foreach (string s in driverType)
            {
                var aux = new DriverTypeID(s);
                auxList.Add(aux);
            }
            this.driverTypeIDList = new List<DriverTypeID>(auxList);
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                CreatingDriverDTO driver = (CreatingDriverDTO)obj;
                return (this.mecanographicNumber.Equals(driver.mecanographicNumber)) &&
                (this.citizenCardNumber.Equals(driver.citizenCardNumber)) &&
                (this.driverName.Equals(driver.driverName)) &&
                (this.driverNIF.Equals(driver.driverNIF)) &&
                (this.dln.Equals(driver.dln));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(mecanographicNumber, citizenCardNumber, driverName, driverNIF, dln);
        }
    }
}