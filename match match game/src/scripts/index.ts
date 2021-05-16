import "../styles/style.scss";
import about from "./About";
import "./database";
import best from "./best";
import game from "./game";

(function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
      <form action="" class="challenger-form">
      <div class="form-container">
        <div class="form-wrapper">
         <div class="form-head">
          <h3 class="form-head-h3">New challenger approaching</h3>
         </div>
         <div class="form-content">
               <div class="form-content-inputs">
                   <div class="form-input">
                      <label for="fname">First name</label><br>
                      <input type="text" id="fname" required placeholder="Jessie" pattern="[A-Za-zА-Яа-яЁё]+" maxlength="30">
                   </div> 
                   <div class="form-input">
                      <label for="fsur">Last name</label><br>
                      <input type="text" id="fsur" required placeholder="Doe"  pattern="[A-Za-zА-Яа-яЁё]+" maxlength="30">
                   </div>
                  <div class="form-input">
                      <label for="fmail">Email</label><br>
                      <input type="email" id="fmail" required placeholder="Jessie.Doe@gmail.com" maxlength="30">
                  </div>  
               </div>
               <div class="canvas-section">
                    <canvas class="form-canvas"  width="200" height="200" ></canvas>
                    <input type="file" class="file-loader" value="change profile picture">
                </div>
         </div>
         <div class="form-footer">
            <input type="submit" value="CONFIRM" class="form-btn-submit">
            <button type="button" class="cancel">NO THANKS</button>
        </div>
        </div>
      </div>
     </form>
    <div class="header-container">
    <div class="header-logo-container">
    <img class="header-logo" src="../images/logo.png" alt="logo">
    <h3 class="logo-text">PEPEGA GAMES</h3>
    </div>   
        <nav class="header-nav">
            <ul class="header-nav-list">
                <li class="header-nav-item active">
                    <div class="nav-item about-page">
                        <img class="logo-mini" src="../images/about-logo.jpg" alt="about logo">
                        <h3>About Game </h3>
                    </div>
                </li>
                <li class="header-nav-item ">
                    <div class="nav-item score-page">
                        <img class="logo-mini" src="../images/best-icon.jpg" alt="about logo">
                        <h3>Best Score</h3>
                    </div>
                </li>
                <li class="header-nav-item">
                    <div class="nav-item settings-page">
                    <img class="logo-mini" src="../images/settings-icon.jpg" alt="about logo">
                    <h3>Game Settings</h3>
                    </div>
                </li>
            </ul>
        </nav>
        <div class="challenger-container">
        <button class="header-btn">Register new challenger</button>
        </div>
    </div>`;
  document.body.append(header);
  const main = document.createElement("main");
  main.innerHTML = `<div class="main-container">

</div>`;
  document.body.append(main);
})();
about.createAboutHTML();

const canvas = document.querySelector("canvas");
const scoreBoard = document.querySelector(".score-page");
//const settingsPage = document.querySelector(".settings-page");
const aboutsPage = document.querySelector(".about-page");
const modal = <HTMLElement>document.querySelector(".challenger-form");
const registerBtn = document.querySelector(".header-btn");
const cancel = modal.querySelector(".cancel");
const fileInput = <HTMLInputElement>modal.querySelector('input[type="file"]');
const gameBtn = document.querySelector(".play-btn");

function visibleModal() {
  modal.style.display = "block";
}
function drawImg(picture = "../images/profile-default.png") {
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 200, 200);
  };
  img.height = 200;
  img.width = 200;
  img.src = picture;
}
function loadImage() {
  const reader = new FileReader();
  const file = fileInput.files[0];
  reader.onload = () => {
    if (typeof reader.result === "string") {
      drawImg(reader.result);
    }
  };
  reader.readAsDataURL(file);
  fileInput.value = "";
}
function changeBtn() {
  modal.style.display = "none";
  registerBtn.removeEventListener("click", visibleModal);
  registerBtn.parentElement.innerHTML = `
    <img src="../images/profile-default.png" alt="header profile" class="header-profile">
  `;
}

drawImg();


cancel.addEventListener("click", () => {
  modal.style.display = "none";
});
registerBtn.addEventListener("click", visibleModal);
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
fileInput.addEventListener("change", loadImage);
modal.addEventListener("submit", changeBtn);
scoreBoard.addEventListener("click", best.createScoreHTML);
aboutsPage.addEventListener("click", about.createAboutHTML);
gameBtn.addEventListener("click", game.startGame);
