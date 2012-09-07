( function($, window) {
  $.extend({
    quakes: function(){
      var options = {}
      var remote_domain = 'http://earthquake.usgs.gov';
      var service_url = 'earthquakes/feed/geojsonp';
      var _cb = null;

      $.each( arguments, function(k, v) {
        if (typeof v == "function") {
          _cb = v;
        } else {
          options = v;
        }
      });

      if ( ! options.intensity ) {
        options.intensity = 2.5;
      }
      if ( ! options.period ){
        options.period = 'week';
      }

      var search_service = [remote_domain, service_url, options.intensity, options.period ].join('/') + '?callback=eqfeed_callback'
      eqfeed_callback = function(data) {
        var _results = [];
        $.each( data.features, function(k, v) {
          prop = v.properties;
          geo = v.geometry;
          item = {
            place: prop.place,
            time: prop.time,
            mg: prop.mag,
            ln: geo.coordinates[0],
            lt: geo.coordinates[1],
            dp: geo.coordinates[2],
          }
          _results.push( item );
        });
        if (_cb) {
          _cb.apply( this, [_results] );
        }
      }
      $.ajax({
        cache: false,
        dataType: "jsonp",
        crossDomain: true,
        jsonp: true,
        jsonpCallback: "eqfeed_callback",
        url: search_service
      });
      return this;
    }
  });
})( jQuery );
