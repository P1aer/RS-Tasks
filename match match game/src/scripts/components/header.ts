import { BaseComponent } from "./base-component";
import { Form } from "./form";
import { HeaderContainer } from "./header-container";

export class Header extends BaseComponent {
  private readonly challengerform: Form;

  private readonly container: HeaderContainer;

  get Form() {
    return this.challengerform;
  }

  get Container() {
    return this.container;
  }

  constructor() {
    super("header", ["header"]);
    this.challengerform = new Form(["challenger-form"]);
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
    this.container.nav.list.goToPage("about");
    this.challengerform.element.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const img = (<HTMLImageElement>document.getElementById("preview")).src;
      this.container.btn.changeToImg(img);
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
                       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3AAAAQkCAAAAAAZOaNkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA1LTI1VDAwOjE3OjE0KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA1LTI1VDAwOjE3OjE0KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNS0yNVQwMDoxNzoxNCswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MzI5ZTBlMi02MTIxLWI1NGItYTg1Yy04MWY5MTIxYWFmZjIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyYWUwOTFjZC1kN2Y1LTU1NGEtYTVlNS0x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" class="form-canvas" id="preview" alt="" width="200" height="200" >
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
    footer.prepend(this.challengerform.container.SipleInputs[0].element);
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

  createElementsModal() {
    this.challengerform.container.addInput(
      "First Name",
      [],
      "fname",
      "text",
      true,
      "Jessie",
      "",
      ["form-input"]
    );
    this.challengerform.container.addInput(
      "Last Name",
      [],
      "fsur",
      "text",
      true,
      "Doe",
      "",
      ["form-input"]
    );
    this.challengerform.container.addInput(
      "E-mail",
      [],
      "fmail",
      "email",
      true,
      "Jessie.Doe@mail.com",
      "",
      ["form-input"]
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
