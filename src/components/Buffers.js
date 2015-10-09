var _ = require('lodash');
var Context = require('./Context');

var availableSamples = {
  'hat': require('sounds/hat.wav'),
  'mutedhat': require('sounds/mutedhat.wav'),
  'openhat': require('sounds/openhat.wav'),
  'snare': require('sounds/snare.wav'),
  'kick': require('sounds/kick.wav'),
  'ride': require('sounds/ride.wav'),
  'ridebell': require('sounds/ridebell.wav'),
  'crash': require('sounds/crash.wav'),
  'tom1': require('sounds/tom1.wav'),
  'tom2': require('sounds/tom2.wav'),
  'tom3': require('sounds/tom3.wav'),
  'metronome-low': require('sounds/metronome-low.wav'),
  'metronome-med': require('sounds/metronome-med.wav'),
  'metronome-high': require('sounds/metronome-high.wav')
};

var buffers = {};
var loadedBuffers = {};

function areLoaded () {
  return _.size(buffers) === _.size(availableSamples);
}

function loadSample (url, callback) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    Context.context.decodeAudioData(
      request.response,
      callback,
      function(buffer) {
          console.log('Error decoding drum samples!', buffer);
      }
    );
  };

  request.send();
}

function compileBuffers (receivedBuffers) {
  _.reduce(availableSamples, function(result, sampleUrl, sampleName){
    if (sampleName.match(/metronome-/gi)) {
      result.metronome = 'metronome';
    } else {
      result[sampleName] = receivedBuffers[sampleName];
    }
    return result;
  }, loadedBuffers);
}

function loadBuffers (callback) {
  _.forOwn(availableSamples, function (url, sample) {
    loadSample('.' + url, function (buffer) {
      buffers[sample] = buffer;

      if (areLoaded()) {
        compileBuffers(buffers);
        callback(loadedBuffers);
      }
    });
  });
}

module.exports = {
  get: function () { return loadedBuffers; },
  getRaw: function () { return buffers; },
  loadAll: loadBuffers,
  areLoaded: areLoaded
};
