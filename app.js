class DrumKit {
  constructor(bpm) {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play-btn");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = bpm;
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
    setInterval(() => {
      this.repeat();
    }, (60 / this.bpm) * 1000);
  }
}

const drum = new DrumKit(300);

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
