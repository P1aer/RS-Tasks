import "../style.scss";
import About from "./About";

function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `<div class="header-container">
    <div class="header-logo-container">
    <img class="header-logo" src="../images/logo.png" alt="logo">
    <h3 class="logo-text">PEPEGA GAMES</h3>
    </div>   
        <nav class="header-nav">
            <ul class="header-nav-list">
                <li class="header-nav-item active">
                    <div class="nav-item">
                        <img class="logo-mini" src="../images/about-logo.jpg" alt="about logo">
                        <h3>About Game </h3>
                    </div>
                </li>
                <li class="header-nav-item ">
                    <div class="nav-item">
                        <img class="logo-mini" src="../images/best-icon.jpg" alt="about logo">
                        <h3>Best Score</h3>
                    </div>
                </li>
                <li class="header-nav-item">
                    <div class="nav-item">
                    <img class="logo-mini" src="../images/settings-icon.jpg" alt="about logo">
                    <h3>Game Settings</h3>
                    </div>
                </li>
            </ul>
        </nav>
        <button class="header-btn">Register new challenger</button>
    </div>`;
  document.body.append(header);
}
createHeader();
About.bodyAbout();
