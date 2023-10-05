let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(queryUrl).then(function(data) {
    console.log(data)

    let EarthQuakeMarkers = [];
    function getColor(c) {
        return c >= 90 ? "rgb(255,255,255)" :
               c >= 70 ? "rgb(255,225,225)" :
               c >= 50 ? "rgb(255,195,195)" :
               c >= 30 ? "rgb(255,165,165)" :
               c >= 10 ? "rgb(255,135,135)" :
                        "rgb(255,0,0)" ;
    };

    for(let i=0; i<data.features.length; i++) {
        let location = data.features[i].geometry;
        let coords = [location.coordinates[1], location.coordinates[0]]
        EarthQuakeMarkers.push(
            L.circleMarker(coords, {
                stroke: true,
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.9,
                color: "#000000",
                fillColor: getColor(location.coordinates[2]),
                radius: data.features[i].properties.mag*4
            }).bindPopup("<strong>Location: " + data.features[i].properties.place + "</strong><br />Coordinates: (" + (location.coordinates[1]).toFixed(2)
                         + ", " + (location.coordinates[0]).toFixed(2) + ")<br />Magnitude: " + (data.features[i].properties.mag).toFixed(2) + "<br />Depth: "
                         + location.coordinates[2])
        );
    }
    
  
    let markers = L.layerGroup(EarthQuakeMarkers);
    
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let map = L.map("map", {
        center: [40.5588333,17.88],
        zoom: 4,
        layers: [street, markers]
    });


    let legend = L.control({position: "bottomright"});

    legend.onAdd = function(map) {
        let div = L.DomUtil.create("div", "legend");
        labelGroup = ["<10", "10-30", "30-50", "50-70", "70-90", "90+"],
        categories = [0, 10, 30, 50, 70, 90],
        labels = [];

        
        
    };
    legend.addTo(map)
});
