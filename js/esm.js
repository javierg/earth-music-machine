$( function(){

  var earth;
  var audio;
  var city_mag_factor = 1.8;
  var cities_elem = '#cities';
  earth = new Earth("#earth");
  earth.animate();

  var magnitude_factor = function( mag ) {
    res = Math.pow(mag,city_mag_factor);
    return res;
  }

  $.quakes({period: 'day'}, function(_q){
    var _frequencies = [];
    var _quakes = [];
    var _htz;
    $.each( _q, function(k, v){
      _htz = v.mg * 80
      _frequencies.push(_htz);
      _quakes[_htz] = v;
    });

    $("#earth").click( function(){
      $( cities_elem ).empty();
      audio = new AudioletApp(_frequencies, _quakes );
      audio.addEventListener('playing', function(evt){
        evt_data = evt.data;
        p = $( document.createElement('p') );
        p.append( evt_data.place )
        p.hide();
        p.css( 'font-size', magnitude_factor( evt_data.mg ) );
        if (evt_data.mg >= 5) {
          p.addClass('danger');
        }
        p.css( 'opacity', evt_data.mg % 10 * 0.20 )
        $(cities_elem).append(p.fadeIn());
        earth.mood( evt_data );
        earth.add_point(evt_data.ln, evt_data.lt);
      })
    });

    $("#loading").remove();
  });
});
