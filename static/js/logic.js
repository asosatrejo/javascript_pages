//let newYorkCoords = [40.73, -74.0059];
//let mapZoomLevel = 12;
// Create the createMap function.
function createMap(bikeStations){
  
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
  let baseMaps = {
    "Street Map" : streetmap
  };
  let overlayMaps = {
    "Bike Stations" : bikeStations
  };
  let map = L.map('map-id', {
    center : [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap,bikeStations]
  });
  L.control.layers(baseMaps,overlayMaps, {
    collapsed : false
  }).addTo(map);
} 
function createMarkers(response) {
  let stations = response.data.stations;
  let bikeMarkers = [];
  for(let i = 0; i <stations.length;i++){
    let station = stations[i];
    let bikeMarker = L.marker([station.lat,station.lon])
      .bindPopup(station.name + ' ' + station.cpactity);
 
    bikeMarkers.push(bikeMarker);
  };
  createMap(L.layerGroup(bikeMarkers));
};
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);
Collapse










