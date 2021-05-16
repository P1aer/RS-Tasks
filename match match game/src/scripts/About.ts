function createAboutHTML() {
  const main = document.querySelector(".main-container");
  main.innerHTML = `
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
</div>`;
  document.body.append(main);
}

export default { createAboutHTML };
