$( function(){

  var earth;
  var audio;
  earth = new Earth("#earth");
  earth.animate();

  $.quakes({period: 'day'}, function(_q){
    var _frequencies = [];
    var _cities = [];
    var _htz;
    $.each( _q, function(k, v){
      _htz = v.mg * 80
      _frequencies.push(_htz);
      _cities[_htz] = v.place;
    });
    $("#earth").click( function(){
      audio = new AudioletApp( _frequencies, _cities );
      audio.addEventListener('playing', function(evt){
        //evt includes evt.data with thequake location
        console.log(evt);
      })
    });

    $("#loading").remove();

  });
});
