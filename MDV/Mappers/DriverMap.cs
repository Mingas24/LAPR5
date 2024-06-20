using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Driver;
namespace MDV.Map
{
    public class DriverMap
    {
        public DriverDTO DomainToDTO(Driver driver){
            return new DriverDTO
            {
                Id = driver.Id.AsGuid(),
                driverNumber = driver.mecanographicNumber.number,
                driverName = driver.driverName.name,
                driverDate = driver.birthDate.date,
                driverCC = driver.citizenCardNumber.citizenCardNumber,
                driverNIF = driver.driverNIF.nif,
                dced = driver.entryDate.date,
                dcld = driver.leavingDate.date,
                driverType = driver.driverTypeIDList,
                dled = driver.driverLicence.dled.date,
                dln = driver.driverLicence.dln.number
            };
        }

        public Driver CreatingDTOToDomain(CreatingDriverDTO driverDTO){
            List <string> auxList = new List<string>();
             foreach(DriverTypeID dt in driverDTO.driverTypeIDList){
                    var aux = dt.driverTypeID;
                    auxList.Add(aux);
                }
                return new Driver(
                driverDTO.mecanographicNumber,
                driverDTO.driverName,
                driverDTO.birthDate,
                driverDTO.citizenCardNumber,
                driverDTO.driverNIF,
                driverDTO.entryDate,
                driverDTO.leavingDate,
                auxList,
                driverDTO.dled,
                driverDTO.dln);
        }
    }
}