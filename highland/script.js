// define access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FhbmJpY2FrbGlnbGEiLCJhIjoiY2xjcTdodnVuMDAweTNucDB6YTI4MG1ueSJ9.p8hlfF_h070O7w5DIk1wgA';

// Set bounds for Highland.
const bounds = [
[-8.17008, 55.90063], // Southwest coordinates
[-1.13307, 59.32338] // Northeast coordinates
  ];

//create map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kaanbicakligla/cldc5nxuk000701ovhytgqbej',
      center: [-5.105218, 57.819817],
      zoom: 7,
      maxBounds: bounds
    
      
    });


/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["scotland-wind-turbines"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Location: ${feature.properties.Site_Name}</h3>
    <p>Status: ${feature.properties.Status}</p>
    <p>kW: ${feature.properties.kW}</p>`
    )
    .addTo(map);
});



/*Dataset URL*/

const data_url = "https://api.mapbox.com/datasets/v1/kaanbicakligla/cldk6dc3a0wv627o5c5qv00tp/features?access_token=pk.eyJ1Ijoia2FhbmJpY2FrbGlnbGEiLCJhIjoiY2xjcTdodnVuMDAweTNucDB6YTI4MG1ueSJ9.p8hlfF_h070O7w5DIk1wgA"

map.on('load', () => {
  map.addLayer({
    id: 'scotland-wind-turbines',
    type: 'circle',
    source: {
      type: 'geojson',
      data: data_url 
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#eb4d4b',
      'circle-opacity': 0.9
    }
  });
  
    //Radio button interaction code goes below

    document.getElementById('filters').addEventListener('change', (event) => {
  const type = event.target.value;
    console.log(type);
  // update the map filter
  if (type == 'all') {
    filterType = ['!=', ['get', 'Status'], 'placeholder'];
  } else if (type == 'Constructed') {
    filterType = ['==', ['get', 'Status'], 'Constructed'];
  } else if (type == 'U_Construction') {
    filterType = ['==', ['get', 'Status'], 'U_Construction'];
  } else if (type == 'Refused') {
    filterType = ['==', ['get', 'Status'], 'Refused'];
  
  } else if (type == 'Scoping_Screening') {
    filterType = ['==', ['get', 'Status'], 'Scoping_Screening'];
  } else if (type == 'Withdrawn') {
    filterType = ['==', ['get', 'Status'], 'Withdrawn'];
    
   } else if (type == 'Approved') {
    filterType = ['==', ['get', 'Status'], 'Approved'];
   
   } else if (type == 'In Planning') {
    filterType = ['==', ['get', 'Status'], 'In Planning'];
     
   } else if (type == 'Expired') {
    filterType = ['==', ['get', 'Status'], 'Expired'];
     
  } else if (type == 'Approved-Superseded') {
    filterType = ['==', ['get', 'Status'], 'Approved-Superseded'];
   } else if (type == 'Constructed-Removed') {
    filterType = ['==', ['get', 'Status'], 'Constructed-Removed'];
  } else {
    console.log('error');
  }
  map.setFilter('scotland-wind-turbines', ['all', filterType]);
});


  });



/* Adding controls to the map */


const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Scotland", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-right");

map.addControl(new mapboxgl.NavigationControl(), "top-right");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);

function myFunction() {
  var x = document.getElementById("filters");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}