$( function(){

  var earth;
  var audio;
  earth = new Earth("#earth");
  earth.animate();

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
      audio = new AudioletApp( _frequencies, _quakes );
      audio.addEventListener('playing', function(evt){
        //evt includes evt.data with thequake location
        console.log(evt.data);
      })
    });

    $("#loading").remove();

  });
});
