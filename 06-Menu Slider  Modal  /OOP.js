class App {
  constructor() {
    this.pageElements();
    this.addEventListeners();
  }

  pageElements = () => {
    this.toggle = document.getElementById("toggle");
    this.open = document.getElementById("open");
    this.close = document.getElementById("close");
    this.modal = document.getElementById("modal");
  };

  addEventListeners = (event) => {
    this.toggle.addEventListener("click", this.toggleNav);
    this.open.addEventListener("click", this.showModal);
    this.close.addEventListener("click", this.closeModal);
    this.modal.addEventListener("click", this.hideModal.bind(this));
  };

  toggleNav = () => {
    document.body.classList.toggle("show-nav");
  };
  showModal = () => {
    this.modal.classList.add("show-modal");
  };
  closeModal = () => {
    this.modal.classList.remove("show-modal");
  };
  hideModal = () => {
    event.target.id == "modal"
      ? this.modal.classList.remove("show-modal")
      : false;
  };
}
new App();
