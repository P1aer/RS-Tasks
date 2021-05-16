const settings = {
  type: "pokemon",
  number: 4,
  time: 90,
};
function createGameHTML() {
  const main = document.querySelector(".main-container");
  main.innerHTML = `
           <div class="card-timer">
            <h3 class="timer">0 : 0</h3>
           </div>
             <div class="card-field">
             
                 <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                                  <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                                  <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                 
              </div>
            </div>
  `;
}
function startGame() {

  createGameHTML();
  const from = new Date().getTime();
  const countdownfunc = setInterval(() => {
    const now = new Date().getTime();
    const distance = now - from;
    console.log(distance)
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timer = document.querySelector(".timer");
    timer.innerHTML = `${minutes} : ${seconds}`;
    if (distance >= settings.time * 1000) {
      clearInterval(countdownfunc);
    }
  }, 1000);
}
export default { startGame };
