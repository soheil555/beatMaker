class DrumKit {
  constructor(bpm = 150) {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play-btn");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = bpm;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.mutes = document.querySelectorAll(".mute");
    this.temp = document.querySelector(".tempo-select");
  }

  repeat() {
    let step = this.index % 8;
    let selectedPads = document.querySelectorAll(`.b${step}`);

    selectedPads.forEach(pad => {
      pad.style.animation = "padAnimation 0.3s ease-in-out alternate 2";

      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });

    this.index++;
  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, (60 / this.bpm) * 1000);
      this.playBtn.innerHTML = "Stop";
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = "Play";
    }
  }

  changeSound(e) {
    const soundLocation = e.target.value;
    const soundType = e.target.name;

    switch (soundType) {
      case "kick-select":
        this.kickSound.src = soundLocation;
        break;
      case "snare-select":
        this.snareSound.src = soundLocation;
        break;
      case "hihat-select":
        this.hihatSound.src = soundLocation;
        break;
    }
  }

  doMute(e) {
    const soundType = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      switch (soundType) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (soundType) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
      }
    }
  }
  updateTempo(e) {
    const tempoValue = e.target.value;
    document.querySelector(".tempo-value").innerText = tempoValue;
  }
  changeTempo(e) {
    const tempoValue = e.target.value;
    this.bpm = tempoValue;

    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.start();
    }
  }
}

const drum = new DrumKit();

//Event Listeners

drum.playBtn.addEventListener("click", () => {
  drum.start();
});

drum.pads.forEach(pad => {
  pad.addEventListener("click", () => {
    pad.classList.toggle("active");
  });

  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});

drum.selects.forEach(select => {
  select.addEventListener("change", e => {
    drum.changeSound(e);
  });
});

drum.mutes.forEach(mute => {
  mute.addEventListener("click", e => {
    drum.doMute(e);
  });
});

drum.temp.addEventListener("input", e => {
  drum.updateTempo(e);
});

drum.temp.addEventListener("change", e => {
  drum.changeTempo(e);
});
