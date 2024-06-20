using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using MDV.DTO.Trips;
using MDV.DTO.Workblocks;
using MDV.DTO.CrewServices;
using MDV.Services;
using MDV.Domain.VehicleService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mdv.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class ImportController : ControllerBase
    {
        private ITripService _tripService;
        private IWorkblockService _workblockService;
        private IVehicleServiceService _vehicleServiceService;
        private ICrewService _crewService;

        public ImportController(ITripService tripService, IWorkblockService workblockService, IVehicleServiceService vehicleServiceService,ICrewService crewService)
        {
            this._tripService = tripService;
            this._workblockService = workblockService;
            this._vehicleServiceService = vehicleServiceService;
            this._crewService = crewService;
        }

        [HttpPost]
        public async Task<Boolean> Import(IFormFile file)
        {
            return await ImportTrips(file);
        }

        public async Task<Boolean> ImportTrips(IFormFile file)
        {
            var content = new StreamReader(file.OpenReadStream()).ReadToEnd();

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(content);

            XmlNodeList trips = doc.GetElementsByTagName("Trip");
            XmlNodeList workblocks = doc.GetElementsByTagName("Workblock");
            XmlNodeList vehicleServices = doc.GetElementsByTagName("VehicleService");
            XmlNodeList crewServices = doc.GetElementsByTagName("CrewService");

            foreach (XmlNode trip in trips)
            {
                string tripCode = trip.Attributes["TripCode"].InnerText;
                long lineID = Int64.Parse(trip.Attributes["LineID"].InnerText);
                long pathID = Int64.Parse(trip.Attributes["PathID"].InnerText);
                long pathIDReturn = Int64.Parse(trip.Attributes["PathIDReturn"].InnerText);
                string startDate = trip.Attributes["StartDate"].InnerText;
                string startTime = trip.Attributes["StartTime"].InnerText;

                List<string> nodes = new List<string>();
                List<long> passingTimes = new List<long>();
                XmlNodeList nodesList = trip.FirstChild.ChildNodes;
                foreach (XmlNode nodeXML in nodesList)
                {
                    nodes.Add(nodeXML.Attributes["Node"].InnerText);
                    passingTimes.Add(Int64.Parse(nodeXML.Attributes["PassingTime"].InnerText));
                }
                CreatingTripDTO creatingTrip = new CreatingTripDTO(tripCode, lineID, pathID, pathIDReturn, startDate, startTime, nodes, passingTimes);
                await _tripService.AddAsync(creatingTrip);
            }
            foreach (XmlNode workblock in workblocks)
            {
                string startTime = workblock.Attributes["StartTime"].InnerText;
                string endTime = workblock.Attributes["EndTime"].InnerText;
                string code = workblock.Attributes["Code"].InnerText;

                List<string> tripList = new List<string>();
                XmlNodeList tripListXML = workblock.FirstChild.ChildNodes;
                foreach (XmlNode tripXML in tripListXML)
                {
                    tripList.Add(tripXML.Attributes["TripCode"].InnerText);
                }
                CreatingWorkblockDTO creatingWorkblock = new CreatingWorkblockDTO(startTime, endTime, code,tripList);
                await _workblockService.AddAsync(creatingWorkblock);
            }
            foreach (XmlNode vehicleService in vehicleServices)
            {
                string vsName = vehicleService.Attributes["VehicleServiceName"].InnerText;
                string vsCode = vehicleService.Attributes["VehicleServiceCode"].InnerText;
                string vsColor = vehicleService.Attributes["VehicleServiceColor"].InnerText;

                List<string> wbList = new List<string>();
                XmlNodeList wbListXML = vehicleService.FirstChild.ChildNodes;
                foreach (XmlNode wbXML in wbListXML)
                {
                    wbList.Add(wbXML.Attributes["Code"].InnerText);
                }
                CreatingVehicleServiceDTO creatingVehicleService = new CreatingVehicleServiceDTO(vsName, vsCode, vsColor, wbList);
                await _vehicleServiceService.AddAsync(creatingVehicleService);
            }
            foreach (XmlNode crewService in crewServices)
            {
                string csCode = crewService.Attributes["CrewServiceCode"].InnerText;

                List<string> csList = new List<string>();
                XmlNodeList csListXML = crewService.FirstChild.ChildNodes;
                foreach (XmlNode csXML in csListXML)
                {
                    csList.Add(csXML.Attributes["Code"].InnerText);
                }
                CreatingCrewServiceDTO creatingCrewService = new CreatingCrewServiceDTO(csCode,csList);
                await _crewService.AddAsync(creatingCrewService);
            }
            return true;
        }
    }
}
