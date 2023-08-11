let song;    
let amp;
let button;

let volumeHist = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('sound/beat.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  // song.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  song.amp(0.2);
}

function draw() {
  background(0);

  //spectrum rectangles (Analyse the frquency of the sound)
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for(let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h)
  }

  //amplitude line (Analyse the volume of the sound)
  let vol = amp.getLevel();
  volumeHist.push(vol);
  stroke(255);
  noFill();
  beginShape();
  for(let i = 0; i < volumeHist.length; i++) {
    let y = map(volumeHist[i], 0, 1, height/2, 0);
    vertex(i, y);
  }
  endShape();

  if (volumeHist.length > width - 50) {
    volumeHist.splice(0, 1);
  }


  let backLocationX = vol * random(windowWidth * 10);
  let backLocationY = vol * random(windowHeight * 10);

  noStroke(); 
  fill(0, 0, 255);
  rect(vol * random(windowWidth * 10), vol * random(windowHeight * 10), vol * random(500, 1500),  vol * random(500, 1500));

  push();
    fill(255)
    textSize(vol * 300);
    // rotate(vol * random(-360, 360));
    textAlign(CENTER, CENTER);
    text('AETHER', backLocationX , backLocationY + 100) ;
  pop();


  console.log(vol);

  fill(0)
  stroke(255);
  rect(backLocationX, backLocationY, vol * random(600, 1500), vol * random(500, 1500));
}
