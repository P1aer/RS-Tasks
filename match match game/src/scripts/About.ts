function bodyAbout() {
  const main = document.createElement("main");
  main.innerHTML = `
<div class="main-container">
   <div class="about-wrapper">
    <h3 class="about-h3">How to play</h3>
    <section class="about-section">
      <p class="section-text">SOME TEXT SOME TEXT </p>
    </section>
        <section class="about-section">
      <p class="section-text">SOME TEXT SOME TEXT </p>
    </section>
        <section class="about-section">
      <p class="section-text">SOME TEXT SOME TEXT </p>
    </section>
    <button class="play-btn" type="button">Start Gambling</button>
</div>    
</div>`;
  document.body.append(main);
}

export default { bodyAbout };
