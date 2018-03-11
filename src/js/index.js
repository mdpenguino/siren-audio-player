var canvasWidth = 500
var audioEl = document.getElementById("audio")
var canvas = document.getElementById("progress").getContext('2d')
var audioCtrl = document.getElementById('audioControl')


audioEl.addEventListener('loadedmetadata', function() {
  var duration = audioEl.duration
  var currentTime = audioEl.currentTime
  document.getElementById("duration").innerHTML = convertElapsedTime(duration)
  document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
  canvas.fillRect(0, 0, canvasWidth, 50);
});

function togglePlaying() {

  var play = audioCtrl.innerHTML === 'Play'
  var method

  if (play) {
    audioCtrl.innerHTML = 'play'
    method = 'play'
    } else {
      audioCtrl.innerHTML = 'Play'
      method = 'pause'
    }
    audioEl[method]()
}

function updateBar() {
  canvas.clearRect(0, 0, canvasWidth, 50)
  canvas.fillStyle = "#707070";
  canvas.fillRect (0, 0, canvasWidth, 50)

  var currentTime = audioEl.currentTime
  var duration = audioEl.duration

  if (currentTime === duration) {
    audioCtrl.innerHTML = "Play"
  }

  document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)

  var percentage = currentTime / duration
  var progress = (canvasWidth * percentage)
  canvas.fillStyle = myElement.style.setProperty("--alternativecolour")
  canvas.fillRect(0, 0, progress, 50)
}

function convertElapsedTime(inputSeconds) {
  var seconds = Math.floor(inputSeconds % 60)
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  var minutes = Math.floor(inputSeconds / 60)
  return minutes + ":" + seconds
}
