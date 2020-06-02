const video = document.getElementById("video");
const button = document.getElementById("button");
const select = document.getElementById("select");

let currentStream;
const videoConstraints = { facingMode: "environment" };

function stopMediaTracks(stream) {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}
function gotDevices(mediaDevices) {
  let count = 1;
  let something = [];
  mediaDevices.forEach((mediaDevice) => {
    if (mediaDevice.kind === "videoinput") {
      something.push("Decive 1 --> ");
      something.push(mediaDevice.label);
      something.push(" *****");

      const option = document.createElement("option");
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });

  alert(something);
}

button.addEventListener("click", (event) => {
  if (typeof currentStream !== "undefined") {
    stopMediaTracks(currentStream);
    if (videoConstraints.facingMode === "user") {
      videoConstraints.facingMode = "environment";
    } else {
      videoConstraints.facingMode = "user";
    }
  }
  navigator.mediaDevices
    .getUserMedia({ video: videoConstraints, audio: false })
    .then((stream) => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch((error) => {
      console.error(error);
    });
});
