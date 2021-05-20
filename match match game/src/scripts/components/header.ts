import { BaseComponent } from "./base-component";
import { Form } from "./form";
import { HeaderContainer } from "./header-container";

export class Header extends BaseComponent {
  private readonly challengerform: Form;

  private readonly container: HeaderContainer;

  get Form() {
    return this.challengerform;
  }

  constructor() {
    super("header", ["header"]);
    this.challengerform = new Form();
    this.container = new HeaderContainer();
    this.element.appendChild(this.container.element);
  }

  createHeader() {
    this.challengerform.container.createBtns();
    this.challengerform.container.createInputs();
    this.challengerform.container.createSimpleInput();
    this.createElementsModal();
    this.challengerform.container.SipleInputs[0].element.addEventListener(
      "change",
      this.loadImage
    );
    document
      .getElementById("register")
      .addEventListener("click", this.visibleModal);

    window.onclick = this.hideModal;

    this.container.nav.list.goToPage("about");
    this.challengerform.element.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const img = (<HTMLImageElement>document.getElementById("preview")).src;
      this.container.btn.changeToImg(img);
      this.challengerform.element.remove();
    });
    this.challengerform.container.Btns[0].element.addEventListener(
      "click",
      () => {
        this.challengerform.element.remove();
        this.cleanForm();
      }
    );
  }

  initForm() {
    this.challengerform.container.element.innerHTML = `
         <div class="form-wrapper">
         <div class="form-head">
          <h3 class="form-head-h3">New challenger approaching</h3>
         </div>
         <div class="form-content">
               <div class="form-content-inputs">
               </div>
               <div class="canvas-section">
                       <img src="../images/profile-default.png" class="form-canvas" id="preview" alt="" width="200" height="200" >
                </div>
         </div>
         <div class="form-footer">
        </div>
        </div>
    `;
    const inputs = this.challengerform.container.element.querySelector(
      ".form-content-inputs"
    );
    this.challengerform.container.Inputs.forEach((input) =>
      inputs.appendChild(input.element)
    );
    const footer =
      this.challengerform.container.element.querySelector(".form-footer");
    footer.appendChild(this.challengerform.container.SipleInputs[1].element);
    this.challengerform.container.Btns.forEach((btn) =>
      footer.appendChild(btn.element)
    );

    const canvas =
      this.challengerform.container.element.querySelector(".canvas-section");
    canvas.append(this.challengerform.container.SipleInputs[0].element);
  }

  cleanForm() {
    this.challengerform.container.SipleInputs[0].cleanInput();
    this.challengerform.container.Inputs.forEach((input) =>
      input.input.cleanInput()
    );
  }

  visibleModal = () => {
    this.initForm();
    this.element.appendChild(this.challengerform.element);
  };

  hideModal = (event) => {
    if (event.target === this.challengerform.element) {
      this.challengerform.element.remove();
      this.cleanForm();
    }
  };

  createElementsModal() {
    this.challengerform.container.addInput(
      "First Name",
      [],
      "fname",
      "text",
      true,
      "Jessie"
    );
    this.challengerform.container.addInput(
      "Last Name",
      [],
      "fsur",
      "text",
      true,
      "Doe"
    );
    this.challengerform.container.addInput(
      "E-mail",
      [],
      "fmail",
      "email",
      true,
      "Jessie.Doe@mail.com"
    );
    this.challengerform.container.addSimpleInput([], "file", "file");
    this.challengerform.container.addSimpleInput(
      [],
      "submit",
      "submit",
      false,
      "CONFIRM",
      "CONFIRM"
    );
    this.challengerform.container.addBtn(["cancel"], "NO THANKS", "cancel");
  }

  loadImage = () => {
    const file = <HTMLInputElement>(
      this.challengerform.container.SipleInputs[0].element
    );
    const preview = <HTMLImageElement>document.getElementById("preview");
    if (file.files.length === 0) return;

    const f = file.files[0];
    const reader = new FileReader();
    if (f.type.indexOf("image") === -1) return;

    reader.onload = (e) => {
      if (typeof e.target.result === "string") {
        preview.src = e.target.result;
      } // В src будет что-то типа data:image/jpeg;base64,....
    };
    reader.readAsDataURL(f);
  };
}
