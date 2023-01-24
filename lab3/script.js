// The value for 'accessToken' begins with 'pk...'

mapboxgl.accessToken = "pk.eyJ1Ijoia2FhbmJpY2FrbGlnbGEiLCJhIjoiY2xjcTdodnVuMDAweTNucDB6YTI4MG1ueSJ9.p8hlfF_h070O7w5DIk1wgA";

const map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/kaanbicakligla/cldad8gj1000301pf8c9ouf0v',
  center: [-0.089932, 51.514442],
  zoom: 14
});

const data_url = "https://api.mapbox.com/datasets/v1/kaanbicakligla/cldaf2t0a000w26qq79v7c4jx/features?access_token=pk.eyJ1Ijoia2FhbmJpY2FrbGlnbGEiLCJhIjoiY2xjcTdodnVuMDAweTNucDB6YTI4MG1ueSJ9.p8hlfF_h070O7w5DIk1wgA";

map.on('load', () => {
  map.addLayer({
    id: 'crimes',
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
  
  //Slider interaction code goes below
   document.getElementById('slider').addEventListener('input', (event) => {
//Get the month value from the slider
  const month = parseInt(event.target.value);

  // get the correct format for the data
  formatted_month = '2020-' + ("0" + month).slice(-2)
  //Create a filter
 
   filterMonth = ['==', ['get', 'Month'], formatted_month]

  //set the map filter
  map.setFilter('crimes', ['all', filterMonth, filterType]); 

  // update text in the UI
  document.getElementById('active-month').innerText = month;
});
  //Radio button interaction code goes below
  document.getElementById('filters').addEventListener('change', (event) => {
  const type = event.target.value;
    console.log(type);
  // update the map filter
  if (type == 'all') {
    filterType = ['!=', ['get', 'Crime type'], 'placeholder'];
  } else if (type == 'shoplifting') {
    filterType = ['==', ['get', 'Crime type'], 'Robbery'];
  } else if (type == 'bike') {
    filterType = ['==', ['get', 'Crime type'], 'Bicycle theft'];
  } else {
    console.log('error');
  }
  map.setFilter('crimes', ['all', filterMonth, filterType]); 
});


  });