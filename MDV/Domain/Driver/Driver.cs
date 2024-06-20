using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Utils;
using System.Globalization;

namespace MDV.Domain.Driver
{
    public class Driver : Entity<DriverID>, IAggregateRoot
    {
        public DriverNumber mecanographicNumber { get; private set; }

        public DriverName driverName { get; private set; }

        public Date birthDate { get; private set; }

        public DriverCC citizenCardNumber { get; private set; }

        public DriverNIF driverNIF { get; private set; }

        public Date entryDate { get; private set; }

        public Date leavingDate { get; private set; }

        public DriverLicence driverLicence { get; private set; }

        public List<DriverTypeID> driverTypeIDList { get; private set; }

        public Driver() { }

        public Driver(string mecanographicNumber, string driverName, string birthDate,
        long citizenCardNumber, long driverNIF, string entranceDate, string departureDate,
        List<string> driverType, string driverLicenceExpiryDate, string driverLicenceNumber)
        {

            if (verifyDate(birthDate, entranceDate, departureDate, driverLicenceExpiryDate))
            {
                try
                {
                    List<DriverTypeID> auxList = new List<DriverTypeID>();
                    this.Id = new DriverID(Guid.NewGuid());
                    this.mecanographicNumber = new DriverNumber(mecanographicNumber);
                    this.driverName = new DriverName(driverName);
                    this.birthDate = new Date(birthDate);
                    this.citizenCardNumber = new DriverCC(citizenCardNumber);
                    this.driverNIF = new DriverNIF(driverNIF);
                    this.entryDate = new Date(entranceDate);
                    this.leavingDate = new Date(departureDate);
                    this.driverLicence = new DriverLicence(driverLicenceExpiryDate, driverLicenceNumber);
                    foreach (string s in driverType)
                    {
                        if (string.IsNullOrEmpty(s))
                        {
                            throw new BusinessRuleValidationException("Driver Type is null or empty");
                        }
                        else
                        {
                            var aux = new DriverTypeID(s);
                            auxList.Add(aux);
                        }
                    }
                    this.driverTypeIDList = new List<DriverTypeID>(auxList);
                }
                catch (Exception)
                {
                    throw new BusinessRuleValidationException("Driver Invalid");
                }
            }
        }

        public Boolean verifyDate(string birth, string entry, string leaving, string licenceDate)
        {
            DateTime birthDateDT = new DateTime();
            DateTime entryDateDT = new DateTime();
            DateTime leavingDateDT = new DateTime();
            DateTime driverLicenceExpiryDateDT = new DateTime();
            DateTime now = new DateTime(); 

            try
            {
                var cultureInfo = new CultureInfo("pt-PT");
                birthDateDT = DateTime.Parse(birth, cultureInfo);
                entryDateDT = DateTime.Parse(entry, cultureInfo);
                leavingDateDT = DateTime.Parse(leaving, cultureInfo);
                driverLicenceExpiryDateDT = DateTime.Parse(licenceDate, cultureInfo);
                now = DateTime.Now;
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("The Date is Invalid");
            }

            if (now.Ticks - birthDateDT.Ticks < 6622560000000000)//6622560000000000 = 21 anos
            {
                throw new BusinessRuleValidationException("The Driver is under 21 years");
            }
            else if (entryDateDT.Ticks - leavingDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The Leaving Date is after the Entry Date");
            }
            else if (birthDateDT.Ticks - entryDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The Entry Date is after the Birth Date");
            }
            else if (birthDateDT.Ticks - leavingDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The Leaving Date is after the Birth Date");
            }
            else if (entryDateDT.Ticks - driverLicenceExpiryDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The Licence Expiry Date is after the Entry Date");
            }
            else if (birthDateDT.Ticks - driverLicenceExpiryDateDT.Ticks > 0)
            {
                throw new BusinessRuleValidationException("The Licence Expiry Date is after the Birth Date");
            }
            else if (leavingDateDT.Ticks - driverLicenceExpiryDateDT.Ticks >= 0)
            {
                throw new BusinessRuleValidationException("The Licence Expiry Date is after or in the same of the Leaving Date");
            }
            return true;
        }
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Driver driver = (Driver)obj;
                return (this.mecanographicNumber.Equals(driver.mecanographicNumber)) &&
                (this.citizenCardNumber.Equals(driver.citizenCardNumber)) &&
                (this.driverName.Equals(driver.driverName)) &&
                (this.driverNIF.Equals(driver.driverNIF)) &&
                (this.driverLicence.dln.Equals(driver.driverLicence.dln));
            }

        }

        public override int GetHashCode()
        {
            return HashCode.Combine(mecanographicNumber, citizenCardNumber, driverName, driverNIF, driverLicence);
        }
    }
}