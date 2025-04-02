
//
function init(){
mapboxgl.accessToken = 'pk.eyJ1Ijoicml0bGVoIiwiYSI6ImNtOTBjOHRzNjBsdTYyanB1cGdlZDAyZHEifQ.zAy-BqM3sZyw6__VigExLw';

const geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.032, 38.913]
      },
      'properties': {
        'title': 'Mapbox',
        'description': 'Washington, D.C.'
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.414, 37.776]
      },
      'properties': {
        'title': 'Mapbox',
        'description': 'San Francisco, California'
      }
    },
    {
"type": "Feature",
"properties": {'title': 'Mapbox',
        'description': 'Yankee Stadium, New York'},
"geometry": {
  "coordinates": [
    -73.92636127644171,
    40.829165295288334
  ],
  "type": "Point"
}
}
    
  ]
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-96, 37.8],
  zoom: 3
});

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add it to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(map);
}

}//end of init

export {init};