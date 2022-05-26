
var shareBtn = document.querySelector("button#shareScreen");
shareBtn.onclick = shareScreen;

var recBtn = document.querySelector("button#rec");
recBtn.onclick = onBtnRecordClicked;

var stopBtn = document.querySelector("button#stop");
stopBtn.onclick = onBtnStopClicked;

var videoElement = document.querySelector("video");
videoElement.style.backgroundColor = "black";

var downloadLink = document.querySelector("a#downloadLink");

var mediaRecorder;
var localStream = null;
document.getElementById("error").innerHTML = "";

function shareScreen(){
  console.log("shareScreen");
  document.getElementById("error").innerHTML = "";
  var screenConstraints = { video: true, audio: true };
  navigator.mediaDevices.getDisplayMedia(screenConstraints).then(function(screenStream){
    /* use the screen & audio stream */

    var micConstraints = {audio:true};
    navigator.mediaDevices.getUserMedia(micConstraints).then(function(micStream) {
      /* use the microphone stream */

      //create a new stream in which to pack everything together
      var composedStream = new MediaStream();

      //add the screen video stream
      screenStream.getVideoTracks().forEach(function(videoTrack) {
        composedStream.addTrack(videoTrack);
      });

      //create new Audio Context
      var context = new AudioContext();

      //create new MediaStream destination. This is were our final stream will be.
      var audioDestinationNode = context.createMediaStreamDestination();

      //check to see if we have a screen stream and only then add it
      if (screenStream && screenStream.getAudioTracks().length > 0) {
        //get the audio from the screen stream
        const systemSource = context.createMediaStreamSource(screenStream);

        //set it's volume (from 0.1 to 1.0)
        const systemGain = context.createGain();
        systemGain.gain.value = 1.0;

        //add it to the destination
        systemSource.connect(systemGain).connect(audioDestinationNode);

      }

      //check to see if we have a microphone stream and only then add it
      if (micStream && micStream.getAudioTracks().length > 0) {
        //get the audio from the microphone stream
        const micSource = context.createMediaStreamSource(micStream);

        //set it's volume
        const micGain = context.createGain();
        micGain.gain.value = 1.0;

        //add it to the destination
        micSource.connect(micGain).connect(audioDestinationNode);
      }

      //add the combined audio stream
      audioDestinationNode.stream.getAudioTracks().forEach(function(audioTrack) {
        composedStream.addTrack(audioTrack);
      });

      //pass over to function that shows the stream and activates the recording controls
      onCombinedStreamAvailable(composedStream)

    }).catch(function(err) {
      console.log(err);
      document.getElementById("error").innerHTML = "You need a microphone to run the demo";
    });
  }).catch(function(err) {
    console.log(err);
    document.getElementById("error").innerHTML = "You need to share your screen to run the demo";
  });
}

function onCombinedStreamAvailable(stream) {
  console.log("onCombinedStreamAvailable");
  localStream = stream;
  
  videoElement.srcObject = localStream;
  videoElement.play();
  videoElement.muted = true;
  recBtn.disabled = false;
  shareBtn.disabled = true;
  stopBtn.disabled = true;
}

function onBtnRecordClicked() {
  console.log("onBtnRecordClicked");
  if (localStream != null) {
    mediaRecorder = new MediaRecorder(localStream);
    mediaRecorder.onstop = function() {
      console.log("mediaRecorder.onstop");
      
      var blob = new Blob(chunks, { type: "video/webm" });
      chunks = [];
      var videoURL = window.URL.createObjectURL(blob);

      downloadLink.href = videoURL;
      videoElement.src = videoURL;
      downloadLink.innerHTML = "Download video file";
    }
    
    let chunks = [];
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }

    mediaRecorder.start(2);
    console.log(mediaRecorder.state);
    
    recBtn.style.background = "red";
    recBtn.style.color = "black";
    
    recBtn.disabled = true;
    shareBtn.disabled = true;
    stopBtn.disabled = false;
  }else{
    console.log("localStream is missing");
  }
}

function onBtnStopClicked(){
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
  recBtn.style.background = "";
  recBtn.style.color = "";
}
