//import ReactMapGl from "react-map-gl";
import React, { useEffect } from "react";
import "../components/map.css";
//import leaflet from 'leaflet';
//import { } from 'mapbox-gl-leaflet';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Links from "./Links"

/*
Blue Bus Stop - https://sketchfab.com/3d-models/bus-stop-001e4438fc2742ad81356aae14c94d4a
Author - Raid
Red Bus Stop - https://pt.3dexport.com/free-3dmodel-bus-stop-127310.htm
Author - imperius
Black Bus Stop - https://pt.3dexport.com/free-3dmodel-bus-stop-286521.htm
Author - morohsenoe28041998
White Bus Stop - https://sketchfab.com/3d-models/bus-stop-7850f94485bd4fcfb0a6e48d4f3f3943
Author - Tiny Man
Disney Bus - https://sketchfab.com/3d-models/walt-disney-world-bus-9a789fe112964968b97dba2013217f58
Author - Walt's Digital World
*/
function ViewMap() {
  let mapContainer;

  useEffect(() => {
    const initialState = {
      lng: -8.33372,
      lat: 41.207119,
      zoom: 12.5,
    };

    ///--------------------Create Map--------------------//
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWluZ2FzIiwiYSI6ImNraTU4OGRkYTJvOTAyeG1wOGU3NnhwNjIifQ.IkpNy-mBoL9Xa6RpvyOWig";
    const map = (window.map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mingas/ckikgv7lt0xjp17rz4pnuzmyf",
      zoom: initialState.zoom,
      center: [initialState.lng, initialState.lat],
      antialias: true,
      bearing: -12,
      interactive: true,
    }));

    let nodes3D = [];
    let nodes = [];
    const node1 = [];
    const node2 = [];
    const nodeArray = [];
    const modelArrayDR = [];
    const modelArrayD = [];
    const modelArrayR = [];
    const modelArray = [];
    const marker3DArray = [];
    const markerArray = [];
    var busArray = [];
    var busLongStart = -8.34482;
    var busLatStart = 41.257229;
    var rotation = 0;
    var translateBusY = 0.37397741392610867;
    var translateBusX = 0.4768199444444444;

    let popup, marker, el;

    //--------------------Create 3D Node--------------------//
    axios
      .get(Links.MDR_URL()+"/api/nodes")
      .then((response) => {
        nodes3D = response.data;
        nodes3D.map((node) => {
          const model = createModel(node, node.latitude, node.longitude);
          if (node.isDepot === true && node.isReliefPoint === true) {
            modelArrayDR.push(model);
          } else if (node.isDepot === true && node.isReliefPoint === false) {
            modelArrayD.push(model);
          } else if (node.isDepot === false && node.isReliefPoint === true) {
            modelArrayR.push(model);
          } else {
            modelArray.push(model);
          }
        });
      });
    //--------------------Create Bus Model--------------------//

    var busModel = createModelBus(busLatStart, busLongStart, rotation, translateBusY, translateBusX);
    busArray.push(busModel);
    //--------------------Create Custom Bus Layer--------------------//
    var customLayerBus = createCustomLayerBus(
      "http://127.0.0.1:5500/SPA/bus.glb",
      busArray,
      1.4
    );
    //--------------------Create Node Bus Stop Layer--------------------//
    var customLayerDR = createCustomLayer(
      "http://127.0.0.1:5500/SPA/scene2.gltf",
      modelArrayDR,
      1
    );
    var customLayerD = createCustomLayer(
      "http://127.0.0.1:5500/SPA/scene3.gltf",
      modelArrayD,
      1
    );
    var customLayerR = createCustomLayer(
      "http://127.0.0.1:5500/SPA/scene4.gltf",
      modelArrayR,
      1
    );
    var customLayer = createCustomLayer(
      "http://127.0.0.1:5500/SPA/scene.gltf",
      modelArray,
      1
    );

    //--------------------Padding and Rotation--------------------//
    // pixels the map pans when the up or down arrow is clicked
    var deltaDistance = 0.005;

    function easing(t) {
      return t * (2 - t);
    }

    map.on("load", function () {
      //--------------------Create 2D Markers--------------------//
      axios
        .get(Links.MDR_URL()+"/api/nodes")
        .then((response) => {
          nodes3D = response.data;
          nodes3D.map((node) => {
            el = document.createElement("div");
            el.className = "marker3D";
            marker = new mapboxgl.Marker(el)
              .setLngLat({ lat: node.latitude, lng: node.longitude })
              .setPopup(
                new mapboxgl.Popup({
                  offset: 35,
                  closeOnClick: false,
                  closeButton: false,
                  closeOnMove: true,
                }).setHTML(
                  "<br> Node: " +
                  node.name +
                  " </br>" +
                  "<br> Latitude: " +
                  node.latitude +
                  " </br>" +
                  "<br> Longitude: " +
                  node.longitude +
                  " </br>"
                )
              );

            marker3DArray.push(marker);
          });
          marker3DArray.map((marker) => {
            const markerDIV = marker.getElement();
            markerDIV.addEventListener("mouseenter", () => marker.togglePopup());
            markerDIV.addEventListener("mouseleave", () => marker.togglePopup());
          });
        });

      axios
        .get(Links.MDR_URL()+"/api/nodes")
        .then((response) => {
          nodes = response.data;
          nodes.map((node) => {
            //Marker Icons
            if (node.isReliefPoint === true && node.isDepot === true) {
              el = document.createElement("div");
              el.className = "marker";
            } else if (node.isReliefPoint === true && node.isDepot === false) {
              el = document.createElement("div");
              el.className = "markerNotDepot";
            } else if (node.isReliefPoint === false && node.isDepot === true) {
              el = document.createElement("div");
              el.className = "markerNotRelief";
            } else {
              el = document.createElement("div");
              el.className = "markerNotReliefDepot";
            }

            marker = new mapboxgl.Marker(el)
              .setLngLat({ lat: node.latitude, lng: node.longitude })
              .setPopup(
                new mapboxgl.Popup({
                  offset: 35,
                  closeOnClick: false,
                  closeButton: false,
                  closeOnMove: true,
                }).setHTML(
                  "<br> Node: " +
                  node.name +
                  " </br>" +
                  "<br> Latitude: " +
                  node.latitude +
                  " </br>" +
                  "<br> Longitude: " +
                  node.longitude +
                  " </br>"
                )
              );

            markerArray.push(marker);
          });

          /*---------------------- HOVER MARKERS*/
          markerArray.map((marker) => {
            const markerDIV = marker.getElement();
            markerDIV.addEventListener("mouseenter", () =>
              marker.togglePopup()
            );
            markerDIV.addEventListener("mouseleave", () =>
              marker.togglePopup()
            );
          });
        });

      //--------------------3D Map--------------------//
      const layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      //--------------------WASD Controlls--------------------//
      //https://docs.mapbox.com/mapbox-gl-js/example/game-controls/?fbclid=IwAR2J2mTDUosjkQjInTaMKIkhsPa7k-rIyMkIo8gsi7UkH0i941ysdmX1Hf4
      map.getCanvas().focus();

      map.getCanvas().addEventListener(
        "keydown",
        function (e) {
          e.preventDefault();
          if (e.which === 87) {
            // up
            switch (rotation.toFixed(3)) {
              //andar para frente autocarro de frente
              case ("0.000"):
                translateBusY = translateBusY + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                //modelTransform.translateY += 0.000005*Math.sin(modelTransform.rotateY*(Math.PI/180));
                var model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação .405
              case "0.405":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -6.075
              case "-6.075":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação .81
              case "0.810":
                translateBusX = translateBusX + 0.000002;
                translateBusY = translateBusY + 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -5.67
              case "-5.670":
                translateBusX = translateBusX + 0.000003;
                translateBusY = translateBusY + 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 1.215
              case "1.215":
                translateBusX = translateBusX + 0.000004;
                translateBusY = translateBusY + 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 5.265
              case "-5.265":
                translateBusX = translateBusX + 0.000004;
                translateBusY = translateBusY + 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro para a esquerda
              case "1.620":
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro para a esquerda
              case "-4.860":
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 2.025
              case "2.025":
                translateBusY = translateBusY - 0.000002;
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -4.455
              case "-4.455":
                translateBusY = translateBusY - 0.000002;
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 2.43
              case "2.430":
                translateBusY = translateBusY - 0.000003;
                translateBusX = translateBusX + 0.0000025;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -4.05
              case "-4.050":
                translateBusY = translateBusY - 0.000003;
                translateBusX = translateBusX + 0.0000025;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 2.835
              case "2.835":
                translateBusY = translateBusY - 0.0000035;
                translateBusX = translateBusX + 0.0000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -3.645
              case "-3.645":
                translateBusY = translateBusY - 0.0000035;
                translateBusX = translateBusX + 0.0000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro de costas
              case "3.240":
                translateBusY = translateBusY - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro de costas
              case "-3.240":
                translateBusY = translateBusY - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 3.645
              case "3.645":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY - 0.0000035;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -2.835
              case "-2.835":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY - 0.0000035;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 4.05
              case "4.050":
                translateBusX = translateBusX - 0.000003;
                translateBusY = translateBusY - 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -2.43
              case "-2.430":
                translateBusX = translateBusX - 0.000003;
                translateBusY = translateBusY - 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 4.455
              case "4.455":
                translateBusX = translateBusX - 0.0000035;
                translateBusY = translateBusY - 0.0000015;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -2.025
              case "-2.025":
                translateBusX = translateBusX - 0.0000035;
                translateBusY = translateBusY - 0.0000015;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro para a direita
              case "-1.620":
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro para a direita
              case "4.860":
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 5.265
              case "5.265":
                translateBusX = translateBusX - 0.000004;
                translateBusY = translateBusY + 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -1.215
              case "-1.215":
                translateBusX = translateBusX - 0.000004;
                translateBusY = translateBusY + 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 5.670
              case "5.670":
                translateBusX = translateBusX - 0.000002;
                translateBusY = translateBusY + 0.000003;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -0.81
              case "-0.810":
                translateBusX = translateBusX - 0.000002;
                translateBusY = translateBusY + 0.000003;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação 6.075
              case "6.075":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY + 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para frente autocarro com rotação -0.405
              case "-0.405":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY + 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //não move o autocarro
              default: console.log("Unknowend Rotation Value"); break;
            }
          } else if (e.which === 83) {
            // down
            switch (rotation.toFixed(3)) {
              //andar para trás autocarro de frente
              case ("0.000"):
                translateBusY = translateBusY - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação .405
              case "0.405":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -6.075
              case "-6.075":
                translateBusX = translateBusX - 0.000001;
                translateBusY = translateBusY - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação .81
              case "0.810":
                translateBusX = translateBusX - 0.000002;
                translateBusY = translateBusY - 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -5.67
              case "-5.670":
                translateBusX = translateBusX - 0.000003;
                translateBusY = translateBusY - 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 1.215
              case "1.215":
                translateBusX = translateBusX - 0.000004;
                translateBusY = translateBusY - 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 5.265
              case "-5.265":
                translateBusX = translateBusX - 0.000004;
                translateBusY = translateBusY - 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro para a esquerda
              case "1.620":
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro para a esquerda
              case "-4.860":
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 2.025
              case "2.025":
                translateBusY = translateBusY + 0.000002;
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -4.455
              case "-4.455":
                translateBusY = translateBusY + 0.000002;
                translateBusX = translateBusX - 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 2.43
              case "2.430":
                translateBusY = translateBusY + 0.000003;
                translateBusX = translateBusX - 0.0000025;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -4.05
              case "-4.050":
                translateBusY = translateBusY + 0.000003;
                translateBusX = translateBusX - 0.0000025;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 2.835
              case "2.835":
                translateBusY = translateBusY + 0.0000035;
                translateBusX = translateBusX - 0.0000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -3.645
              case "-3.645":
                translateBusY = translateBusY + 0.0000035;
                translateBusX = translateBusX - 0.0000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro de costas
              case "3.240":
                translateBusY = translateBusY + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro de costas
              case "-3.240":
                translateBusY = translateBusY + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, -deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 3.645
              case "3.645":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY + 0.0000035;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -2.835
              case "-2.835":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY + 0.0000035;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 4.05
              case "4.050":
                translateBusX = translateBusX + 0.000003;
                translateBusY = translateBusY + 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -2.43
              case "-2.430":
                translateBusX = translateBusX + 0.000003;
                translateBusY = translateBusY + 0.000002;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 4.455
              case "4.455":
                translateBusX = translateBusX + 0.0000035;
                translateBusY = translateBusY + 0.0000015;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -2.025
              case "-2.025":
                translateBusX = translateBusX + 0.0000035;
                translateBusY = translateBusY + 0.0000015;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                });
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro para a direita
              case "-1.620":
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro para a direita
              case "4.860":
                translateBusX = translateBusX + 0.000005;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 5.265
              case "5.265":
                translateBusX = translateBusX + 0.000004;
                translateBusY = translateBusY - 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -1.215
              case "-1.215":
                translateBusX = translateBusX + 0.000004;
                translateBusY = translateBusY - 0.000001;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 5.670
              case "5.670":
                translateBusX = translateBusX + 0.000002;
                translateBusY = translateBusY - 0.000003;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -0.81
              case "-0.810":
                translateBusX = translateBusX + 0.000002;
                translateBusY = translateBusY - 0.000003;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação 6.075
              case "6.075":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY - 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //andar para trás autocarro com rotação -0.405
              case "-0.405":
                translateBusX = translateBusX + 0.000001;
                translateBusY = translateBusY - 0.000004;
                map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
                model = createModelBus(
                  busLatStart,
                  busLongStart,
                  rotation,
                  translateBusY,
                  translateBusX
                );
                busArray = [];
                busArray.push(model);
                map.addLayer(
                  createCustomLayerBus(
                    "http://127.0.0.1:5500/SPA/bus.glb",
                    busArray,
                    1.4
                  )
                );
                map.panBy([0, deltaDistance], {
                  easing: easing,
                })
                verifyColision(nodes3D, model);
                break;
              //não move o autocarro
              default: console.log("Unknowend Rotation Value"); break;
            }
          } else if (e.which === 65) {
            // left
            rotation = rotation + 0.405;
            if (-rotation.toFixed(3) > "6.200" || rotation.toFixed(3) > "6.200") {
              rotation = 0;
            }
            map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
            model = createModelBus(
              busLatStart,
              busLongStart,
              rotation,
              translateBusY,
              translateBusX
            );
            busArray = [];
            busArray.push(model);
            map.addLayer(
              createCustomLayerBus(
                "http://127.0.0.1:5500/SPA/bus.glb",
                busArray,
                1.4
              )
            );
          } else if (e.which === 68) {
            // right
            rotation = rotation - 0.405;
            if (-rotation.toFixed(3) > "6.200" || rotation.toFixed(3) > "6.200") {
              rotation = 0;
            }
            map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/bus.glb");
            model = createModelBus(
              busLatStart,
              busLongStart,
              rotation,
              translateBusY,
              translateBusX
            );
            busArray = [];
            busArray.push(model);
            map.addLayer(
              createCustomLayerBus(
                "http://127.0.0.1:5500/SPA/bus.glb",
                busArray,
                1.4
              )
            );
          }
        },
        true
      );
    });

    //--------------------Create Lines--------------------//
    axios
      .get(Links.MDR_URL()+"/api/lines")
      .then((response) => {
        const lines = response.data;
        for (let i in lines) {
          const line = lines[i];
          axios
            .get(
              Links.MDR_URL()+"/api/lines/pathByLineID",
              { params: { name: line.name } }
            )
            .then((response2) => {
              const paths = response2.data;
              for (let j in paths) {
                const pathNodes = paths[j].pathNode;
                for (let k in pathNodes) {
                  const pathNode = pathNodes[k];
                  const auxNode1 = pathNode.node1;
                  const auxNode2 = pathNode.node2;
                  axios
                    .get(
                      Links.MDR_URL()+"/api/nodes/name",
                      { params: { name: auxNode1 } }
                    )
                    .then((response3) => {
                      axios
                        .get(
                          Links.MDR_URL()+"/api/nodes/name",
                          { params: { name: auxNode2 } }
                        )
                        .then((response4) => {
                          const latAuxNode1 = response3.data.latitude;
                          const longAuxNode1 = response3.data.longitude;
                          node1.push(latAuxNode1);
                          node1.push(longAuxNode1);
                          const latAuxNode2 = response4.data.latitude;
                          const longAuxNode2 = response4.data.longitude;
                          node2.push(latAuxNode2);
                          node2.push(longAuxNode2);
                          const index = existsPathNode(
                            nodeArray,
                            response3.data,
                            response4.data
                          );
                          if (index != null) {
                            if (
                              nodeArray[index].lines.indexOf(line.lineID) === -1
                            ) {
                              nodeArray[index].lines.push(line.lineID);
                              let pos = 0;
                              if (nodeArray[index].lines.length % 2 === 0) {
                                pos = -nodeArray[index].lines.length / 2;
                              } else {
                                pos = (nodeArray[index].lines.length + 1) / 2;
                              }
                              const middlePoint = {
                                latitude: node2[0] - node1[0],
                                longitude: node2[1] - node1[1],
                              };
                              const alfa = Math.atan2(
                                middlePoint.latitude,
                                middlePoint.longitude
                              );
                              const beta = alfa + Math.PI / 2;
                              const d = pos * 0.001;
                              const newNode1Lat = node1[0] + d * Math.sin(beta);
                              const newNode1Long =
                                node1[1] + d * Math.cos(beta);
                              const newNode2Lat = node2[0] + d * Math.sin(beta);
                              const newNode2Long =
                                node2[1] + d * Math.cos(beta);
                              const id = "id"
                                .concat(line.color)
                                .concat(line.lineID)
                                .concat(newNode1Lat)
                                .concat(newNode1Long)
                                .concat(newNode2Lat)
                                .concat(newNode2Long);
                              const route = "route"
                                .concat(newNode1Lat)
                                .concat(newNode1Long)
                                .concat(newNode2Lat)
                                .concat(newNode2Long)
                                .concat(j)
                                .concat(k)
                                .concat(i);
                              map.addSource(route, {
                                type: "geojson",
                                data: {
                                  type: "Feature",
                                  properties: {},
                                  geometry: {
                                    type: "LineString",
                                    coordinates: [
                                      [newNode1Long, newNode1Lat],
                                      [newNode2Long, newNode2Lat],
                                    ],
                                  },
                                },
                              });
                              map.addLayer({
                                id: id,
                                type: "line",
                                source: route,
                                layout: {
                                  "line-join": "round",
                                  "line-cap": "round",
                                },
                                paint: {
                                  "line-color": line.color,
                                  "line-width": 5,
                                  "line-opacity": 1,
                                },
                              });
                              var popup = new mapboxgl.Popup({
                                offset: 35,
                                closeOnClick: false,
                                closeButton: false,
                                closeOnMove: true,
                              });
                              map.on('mousemove', id, function (e) {
                                map.getCanvas().style.cursor = 'pointer';
                                popup.setLngLat(e.lngLat).setHTML("<br> Line Name: " + line.name +
                                  "<br> Path: " + pathNode.node1 + "_" + pathNode.node2).addTo(map);
                              });
                              map.on('mouseleave', id, function () {
                                map.getCanvas().style.cursor = '';
                                popup.remove();
                              });
                            }
                          } else {
                            nodeArray.push({
                              firstNode: response3.data.nodeID,
                              secondNode: response4.data.nodeID,
                              lines: [line.lineID],
                            });
                            const id = "id"
                              .concat(line.color)
                              .concat(line.lineID)
                              .concat(auxNode1)
                              .concat(auxNode2);
                            const route = "route"
                              .concat(auxNode1)
                              .concat(auxNode2)
                              .concat(j)
                              .concat(k)
                              .concat(i);
                            map.addSource(route, {
                              type: "geojson",
                              data: {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                  type: "LineString",
                                  coordinates: [
                                    [node1[1], node1[0]],
                                    [node2[1], node2[0]],
                                  ],
                                },
                              },
                            });
                            map.addLayer({
                              id: id,
                              type: "line",
                              source: route,
                              layout: {
                                "line-join": "round",
                                "line-cap": "round",
                              },
                              paint: {
                                "line-color": line.color,
                                "line-width": 5,
                                "line-opacity": 1,
                              },
                            });
                            var popupLine = new mapboxgl.Popup({
                              offset: 35,
                              closeOnClick: false,
                              closeButton: false,
                              closeOnMove: true,
                            });
                            map.on('mousemove', id, function (e) {
                              map.getCanvas().style.cursor = 'pointer';
                              popupLine.setLngLat(e.lngLat).setHTML("<br> Line Name: " + line.name +
                                "<br> Path: " + pathNode.node1 + "_" + pathNode.node2).addTo(map);
                            });
                            map.on('mouseleave', id, function () {
                              map.getCanvas().style.cursor = '';
                              popupLine.remove();
                            });
                          }
                          node1.length = 0;
                          node2.length = 0;
                        });
                    });
                }
              }
            });
        }
      });

    /* Tutorial: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/ */
    var toggleableLayerIds = ["3d-buildings"];

    // set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var ident = toggleableLayerIds[i];

      var link = document.createElement("a");
      link.href = "#";
      link.className = "active";
      link.textContent = ident;

      link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, "visibility");

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === "visible") {
          markerArray.forEach((element) => {
            element.addTo(map);
          });
          marker3DArray.forEach((element) => {
            element.remove();
          });
          map.setLayoutProperty(clickedLayer, "visibility", "none");
          map.setLayoutProperty(customLayerDR.id, "visibility", "none");
          map.setLayoutProperty(customLayerD.id, "visibility", "none");
          map.setLayoutProperty(customLayerR.id, "visibility", "none");
          map.setLayoutProperty(customLayer.id, "visibility", "none");
          map.setLayoutProperty(customLayerBus.id, "visibility", "none");
          this.className = "";
          map.dragRotate.disable();
          map.setPitch(0);
          map.setMaxZoom(20);
          window.map.maxZoom = 20;
        } else {
          markerArray.forEach((element) => {
            element.remove();
          });
          marker3DArray.forEach((element) => {
            element.addTo(map);
          });
          this.className = "active";
          map.addLayer(customLayerDR);
          map.addLayer(customLayerD);
          map.addLayer(customLayerR);
          map.addLayer(customLayer);
          map.addLayer(customLayerBus);
          map.setLayoutProperty(clickedLayer, "visibility", "visible");
          map.setLayoutProperty(customLayerDR.id, "visibility", "visible");
          map.setLayoutProperty(customLayerD.id, "visibility", "visible");
          map.setLayoutProperty(customLayerR.id, "visibility", "visible");
          map.setLayoutProperty(customLayer.id, "visibility", "visible");
          map.setLayoutProperty(customLayerBus.id, "visibility", "visible");
          map.dragRotate.enable();
          // map.setPitch(80);

          //--------------------Light--------------------//
          var swatches = document.getElementById("swatches");

          var colors = ["#ffffff", "#99ccff", "#3366ff", "#0033cc", "#000066"];

          colors.forEach(function (color) {
            var swatch = document.createElement("button");
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", function () {
              map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/scene.gltf");
              map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/scene2.gltf");
              map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/scene3.gltf");
              map.removeLayer("3d-modelhttp://127.0.0.1:5500/SPA/scene4.gltf");
              // map.setPaintProperty(layer.value, "fill-color", color);
              if (color === "#ffffff") {
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene.gltf",
                    modelArray,
                    1
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene2.gltf",
                    modelArrayDR,
                    1
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene3.gltf",
                    modelArrayD,
                    1
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene4.gltf",
                    modelArrayR,
                    1
                  )
                );
              } else if (color === "#99ccff") {
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene.gltf",
                    modelArray,
                    1.2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene2.gltf",
                    modelArrayDR,
                    1.2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene3.gltf",
                    modelArrayD,
                    1.2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene4.gltf",
                    modelArrayR,
                    1.2
                  )
                );
              } else if (color === "#3366ff") {
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene.gltf",
                    modelArray,
                    1.5
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene2.gltf",
                    modelArrayDR,
                    1.5
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene3.gltf",
                    modelArrayD,
                    1.5
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene4.gltf",
                    modelArrayR,
                    1.5
                  )
                );
              } else if (color === "#0033cc") {
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene.gltf",
                    modelArray,
                    1.8
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene2.gltf",
                    modelArrayDR,
                    1.8
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene3.gltf",
                    modelArrayD,
                    1.8
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene4.gltf",
                    modelArrayR,
                    1.8
                  )
                );
              } else if (color === "#000066") {
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene.gltf",
                    modelArray,
                    2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene2.gltf",
                    modelArrayDR,
                    2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene3.gltf",
                    modelArrayD,
                    2
                  )
                );
                map.addLayer(
                  createCustomLayer(
                    "http://127.0.0.1:5500/SPA/scene4.gltf",
                    modelArrayR,
                    2
                  )
                );
              }
            });
            swatches.appendChild(swatch);
          });
        }
      };
    }
    var layers = document.getElementById("menu");
    layers.appendChild(link);
  }, [mapContainer]);

  //--------------------Verify if path Node Exists--------------------//
  function existsPathNode(pathNodeArray, node1, node2) {
    for (let i in pathNodeArray) {
      let pathNode = pathNodeArray[i];
      if (segmentEqual(pathNode, node1, node2)) {
        return i;
      }
    }
    return null;
  }
  //--------------------Verify if the Segment is Equal--------------------//
  function segmentEqual(pathNode, node1, node2) {
    const node1Aux = pathNode.firstNode;
    const node2Aux = pathNode.secondNode;
    return (
      (node1Aux === node1.nodeID && node2Aux === node2.nodeID) ||
      (node2Aux === node1.nodeID && node1Aux === node2.nodeID)
    );
  }
  //--------------------Create Bus Stop--------------------//
  function createModel(node, latitude, longitude) {
    const modelOrigin = [longitude, latitude];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    if (node.isDepot === true && node.isReliefPoint === false) {
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since our 3D model is in real world meters, a scale transform needs to be
         * applied since the CustomLayerInterface expects units in MercatorCoordinates.
         */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 50,
      };
      return modelTransform;
    } else if (node.isDepot === true && node.isReliefPoint === true) {
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 750,
      };
      return modelTransform;
    } else if (node.isReliefPoint === true && node.isDepot === false) {
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 2,
      };
      return modelTransform;
    } else {
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 3,
      };
      return modelTransform;
    }
  }
  //--------------------Create Custom Layer Bus Stop--------------------//
  function createCustomLayer(url, array, light) {
    var customLayer = {
      id: "3d-model" + url,
      type: "custom",
      renderingMode: "3d",
      maxzoom: "9",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new GLTFLoader();
        loader.load(
          url.toString(),
          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });
        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        for (var i = 0; i < array.length; i++) {
          var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            array[i].rotateX
          );
          var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            array[i].rotateY
          );
          var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            array[i].rotateZ
          );

          var m = new THREE.Matrix4().fromArray(matrix);
          var l = new THREE.Matrix4()
            .makeTranslation(
              array[i].translateX,
              array[i].translateY,
              array[i].translateZ
            )
            .scale(
              new THREE.Vector3(array[i].scale, -array[i].scale, array[i].scale)
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.state.reset();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        }
      },
    };
    return customLayer;
  }
  //--------------------Create Bus--------------------//
  function createCustomLayerBus(url, array, light) {
    var customLayer = {
      id: "3d-model" + url,
      type: "custom",
      renderingMode: "3d",
      maxzoom: "9",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight.position.set(60, -50, 20).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight2.position.set(60, 50, 20).normalize();
        this.scene.add(directionalLight2);

        var directionalLight3 = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight2.position.set(-45, 15, 60).normalize();
        this.scene.add(directionalLight3);

        var directionalLight4 = new THREE.DirectionalLight(
          0xffffff,
          light,
          light
        );
        directionalLight2.position.set(-45, -15, 60).normalize();
        this.scene.add(directionalLight4);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new GLTFLoader();
        loader.load(
          url.toString(),
          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });
        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        for (var i = 0; i < array.length; i++) {
          var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            array[i].rotateX
          );
          var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            array[i].rotateY
          );
          var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            array[i].rotateZ
          );

          var m = new THREE.Matrix4().fromArray(matrix);
          var l = new THREE.Matrix4()
            .makeTranslation(
              array[i].translateX,
              array[i].translateY,
              array[i].translateZ
            )
            .scale(
              new THREE.Vector3(array[i].scale, -array[i].scale, array[i].scale)
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.state.reset();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        }
      },
    };
    return customLayer;
  }
  //--------------------Create Custom Layer Bus--------------------//
  function createModelBus(latitude, longitude, rotation, translateY, translateX) {
    const modelOrigin = [longitude, latitude];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, rotation, 0];
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    const modelTransform = {
      translateX: translateX,
      translateY: translateY,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 40,
    };
    return modelTransform;
  }

  function createColisionCircle(center, radiusInKm, points) {
    if (!points) points = 64;
    var coords = {
      latitude: center[1],
      longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    var distanceY = km / 110.574;

    var theta, x, y;
    for (var i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return ret;
  };

  function verifyColision(nodes3D, busModel) {
    var flag = false;
    for (let i = 0; i < nodes3D.length; i++) {
      var coordsDown = [nodes3D[i].longitude, nodes3D[i].latitude];
      let colisonCircle = createColisionCircle(coordsDown, 0.2, 4000);
      for (let j in colisonCircle) {
        const coords = colisonCircle[j];
        const busCoords = [busModel.translateY, busModel.translateX]
        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(coords);
        // console.log("Y das Coords:" + modelAsMercatorCoordinate.y.toFixed(6))
        // console.log("X das Coords:" + modelAsMercatorCoordinate.x.toFixed(6))
        // console.log(busCoords[0].toFixed(6));
        // console.log(busCoords[1].toFixed(6));
        if (flag === true) {
          break;
        }
        if (busCoords[1].toFixed(6) === modelAsMercatorCoordinate.x.toFixed(6) &&
          modelAsMercatorCoordinate.y.toFixed(6) === (busCoords[0].toFixed(6))) {
          flag = true;
          alert("You Collide with a Bus Stop");
        }
      }
      flag = false;
    }
  }
  return (
    <div className="map" id="mapid" ref={(e) => (mapContainer = e)}>
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1,maximum-scale=1,user-scalable=no"
          />
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <div id="map">
            <div class="map-overlay top">
              <div class="map-overlay-inner">
                <fieldset>
                  <label>Choose a light intensity</label>
                  <div id="swatches"></div>
                </fieldset>
              </div>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
}

export default ViewMap;