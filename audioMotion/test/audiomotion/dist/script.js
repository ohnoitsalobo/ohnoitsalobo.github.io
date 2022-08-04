/**
 * for documentation and more demos,
 * visit https://audiomotion.dev
 */

// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

// container element
const container = document.getElementById('container');

// audio source
const audioEl = document.getElementById('audio');

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer( null, {
  source: audioEl,
  mode: 2,
  useCanvas: false, // don't use the canvas
  onCanvasDraw: instance => {
    const maxHeight = container.clientHeight;
    
    let html = '';

    // get analyzer bars data
    for ( const bar of instance.getBars() ) {

      const value    = bar.value[0],
            peak     = bar.peak[0],
            hold     = bar.hold[0],
            isPeakUp = hold > 0 && peak > 0; // if hold < 0 the peak is falling down

      // build our visualization using only DIVs
      html += `<div class="bar" style="height: ${ value * 100 }%; background: rgba( 255, 255, 255, ${ value } )">
								<div class="peak" style="bottom: ${ ( peak - value ) * -maxHeight }px; ${ isPeakUp ? 'box-shadow: 0 0 10px 1px #f00' : 'opacity: ' + ( peak > 0 ? .7 : 0 ) }"></div>
							 </div>`;
    }
    container.innerHTML = html;
    document.getElementById('fps').innerText = instance.fps.toFixed(1);
  }
});

// visualization mode selection
const elMode = document.getElementById('mode');
elMode.value = audioMotion.mode;
elMode.addEventListener( 'change', () => audioMotion.mode = elMode.value );

// display module version
document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;


// toggle microphone on/off
const micButton = document.getElementById('mic');

micButton.addEventListener( 'change', () => {
  if ( micButton.checked ) {
    if ( navigator.mediaDevices ) {
      navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( stream => {
        // create stream using audioMotion audio context
        const micStream = audioMotion.audioCtx.createMediaStreamSource( stream ); 
        // connect microphone stream to analyzer
        audioMotion.connectInput( micStream );
        // mute output to prevent feedback loops from the speakers
        audioMotion.volume = 0;
      })
      .catch( err => {
        alert('Microphone access denied by user');
      });
    }
    else {
      alert('User mediaDevices not available');
    }
  }
  else {
    // disconnect all input audio sources
    audioMotion.disconnectInput();
    audioMotion.volume = 1;
  }
});