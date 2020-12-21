import GoogleMapsLoader from 'google-maps';
// import MarkerClusterer from 'node-js-marker-clusterer'; // marker clustering

export default () => {
  GoogleMapsLoader.KEY = 'APIKey';
  // GoogleMapsLoader.LANGUAGE = 'lv';
  // GoogleMapsLoader.REGION = 'LV';

  const mapEl = document.getElementById('map');

  GoogleMapsLoader.load(google => {
    const initMap = () => {
      if (!mapEl) return;
      // eslint-disable-next-line
      const map = new google.maps.Map(mapEl, {
        // options
      });
    };

    initMap();
  });
};
