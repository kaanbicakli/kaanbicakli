// define access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FhbmJpY2FrbGlnbGEiLCJhIjoiY2xjcTdodnVuMDAweTNucDB6YTI4MG1ueSJ9.p8hlfF_h070O7w5DIk1wgA';

//create map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kaanbicakligla/cldc5nxuk000701ovhytgqbej',
      center: [-5.105218, 57.819817],
      zoom: 7
      
    });

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

map.addControl(geocoder, "top-left");

/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["wind-turbines"] // replace with your layer name
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

/* Adding controls to the map */
map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);