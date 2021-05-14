"use strict";
exports.__esModule = true;
require("../styles/style.scss");
function createHeader() {
    var header = document.createElement("header");
    header.innerHTML = "<header class=\"header\">\n    <div class=\"header-container\">\n    <div class=\"header-logo-container\">\n    <img class=\"header-logo\" src=\"images/logo.png\" alt=\"logo\">\n    <h3 class=\"logo-text\">PEPEGA GAMES</h3>\n    </div>   \n        <nav class=\"header-nav\">\n            <ul class=\"header-nav-list\">\n                <li class=\"header-nav-item active\">\n                    <div class=\"nav-item\">\n                        <img class=\"logo-mini\" src=\"images/about-logo.jpg\" alt=\"about logo\">\n                        <h3>About Game </h3>\n                    </div>\n                </li>\n                <li class=\"header-nav-item \">\n                    <div class=\"nav-item\">\n                        <img class=\"logo-mini\" src=\"images/best-icon.jpg\" alt=\"about logo\">\n                        <h3>Best Score</h3>\n                    </div>\n                </li>\n                <li class=\"header-nav-item\">\n                    <div class=\"nav-item\">\n                    <img class=\"logo-mini\" src=\"images/settings-icon.jpg\" alt=\"about logo\">\n                    <h3>Game Settings</h3>\n                    </div>\n                </li>\n            </ul>\n        </nav>\n        <button class=\"header-btn\">Register new challenger</button>\n    </div>\n</header>";
    document.body.append(header);
}
var x = 5;
console.log(x);
createHeader();
