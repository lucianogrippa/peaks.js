const configuration = {
    dash:   "",
    shaka: {
        preferredAudioLanguage: 'it-IT',
        preferredTextLanguage: 'it-IT',
        
        manifest: {
            retryParameters: {
                maxAttempts: 4,
                baseDelay: 1000,
                backoffFactor: 4,
                fuzzFactor: 0.5,
                timeout: 5000,
            },
            availabilityWindowOverride: NaN,
            disableAudio: false,
            disableVideo: false,
            disableText: false,
        },
        /**
         * https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.StreamingConfiguration
         */
        streaming: {
            retryParameters: {
                timeout: 5000, // timeout in ms, after which we abort; 0 means never
                maxAttempts: 4, // the maximum number of requests before we fail
                baseDelay: 1000, // the base delay in ms between retries
                backoffFactor: 4, // the multiplicative backoff factor between retries
                fuzzFactor: 0.5, // the fuzz factor to apply to each retry delay
            },
            /**
             * The minimum number of seconds of content that the StreamingEngine 
             * must buffer before it can begin playback or can continue playback 
             * after it has entered into a buffering state (i.e., after it has 
             * depleted one more more of its buffers).
             */
            rebufferingGoal: 1,
            /*
             The number of seconds of content that the StreamingEngine will attempt
              to buffer ahead of the playhead. This value must be greater than or equal
               to the rebuffering goal.
            */
            bufferingGoal: 120,
            /*
                The maximum number of seconds of content that the StreamingEngine will keep 
                in buffer behind the playhead when it appends a new media segment. 
                The StreamingEngine will evict content to meet this limit.
            */
            bufferBehind: 120,
            ignoreTextStreamFailures: true,
            alwaysStreamText: false,
            startAtSegmentBoundary: false,
            smallGapLimit: 0.5,
            jumpLargeGaps: true,
            durationBackoff: 5,
            forceTransmuxTS: false,
            safeSeekOffset: 5,
            stallEnabled: true,
            stallThreshold: 2,
            stallSkip: 0.5,
            useNativeHlsOnSafari: false
        }
    }
}


function initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
  
    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }
  
  async function initPlayer() {
    // Create a Player instance.
    const video = document.getElementById('audioplayer');
    const player = new shaka.Player(video);
  
    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;
  
    // Listen for error events.
    player.addEventListener('error', onErrorEvent);
  
    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      player.configure(configuration.shaka);
      await player.load(configuration.dash);
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
    }
  }
  
  function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
  }
  
  function onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }
  


(function(Peaks) {

    

})(peaks);

document.addEventListener('DOMContentLoaded', initApp);