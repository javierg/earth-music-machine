// Symple synthethizer
// requires https://github.com/oampo/Audiolet

var Synth = function(audiolet, frequency) {
  AudioletGroup.apply(this, [audiolet, 0, 1]);
  this.audiolet = new Audiolet();
  this.pulse = new Pulse(this.audiolet, frequency);
  this.modulator = new Saw(this.audiolet, 2 * frequency);
  this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2, frequency);
  this.gain = new Gain(this.audiolet);

  this.envelope = new PercussiveEnvelope(
    this.audiolet, 1, 0.2, 0.5,
    function(){
      this.audiolet.scheduler.addRelative( 0, this.remove.bind(this) );
    }.bind(this)
  );

  this.modulator.connect(this.modulatorMulAdd);
  this.modulatorMulAdd.connect(this.pulse);
  this.envelope.connect(this.gain, 0, 1);
  this.pulse.connect(this.gain);
  this.gain.connect(this.outputs[0]);
};
extend(Synth, AudioletGroup);

var AudioletApp = function(fq, cities) {
  var pattern = new PSequence(fq, 1);

  this.audiolet = new Audiolet();
  this._listeners = {};

  //Events methods
  this.addEventListener = function(type, listener){
    if (typeof this._listeners[type] == "undefined"){
      this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
  }
  this.fire = function(event) {
    if (typeof event == "string"){
      event = { type: evt };
    }
    if (!event.target){
      event.target = this;
    }
    if (!event.type){
      throw new Error("Event missing type.");
    }
    if (this._listeners[event.type] instanceof Array){
      var listeners = this._listeners[event.type];
      for (var i=0, len=listeners.length; i < len; i++){
        listeners[i].call(this, event);
      }
    }
  }
  this.removeListener = function(type, listener){
    if (this._listeners[type] instanceof Array){
      var listeners = this._listeners[type];
      for (var i=0, len=listeners.length; i < len; i++){
        if (listeners[i] === listener){
          listeners.splice(i, 1);
          break;
        }
      }
    }
  }
  //end events methods

  this.audiolet.scheduler.play([pattern], 1,
    function(frequency) {
      var synth = new Synth(this.audiolet, frequency);
      this.fire( {type: 'playing', data:cities[frequency]} );
      synth.connect(this.audiolet.output);
    }.bind(this)
  );
}
