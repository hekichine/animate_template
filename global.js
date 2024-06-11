// ==================
//   drawer template
// ==================
class Drawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Tạo HTML và CSS cho drawer
    this.shadowRoot.innerHTML = `
          <style>
              :host {
                position: fixed;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;

              }
              :host([open]) .overlay {
                opacity: 1;
                visibility: visible;
              }
              
              :host([open]) .content{
                visibility: visible;
                transform: translateX(0);
              }

              .overlay{
                position: absolute;
                inset: 0;
                z-index: 1;
                background-color: rgba(0,0,0,.4);
                cursor: pointer;
                transition: .25s ease;
                opacity: 0;
                visibility: hidden;
                pointer-events: auto;
              }
              .header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              }
              .content {
                z-index: 2;
                position: absolute;
                top: 0;bottom: 0;right: 0;width: 100%;
                max-width: min(650px,75%);
                display: grid;
                grid-template-rows: auto 1fr auto;
                background-color: #fff;
                padding: 30px;
                max-height: 100vh;
                overflow-y: auto;
                transition: .25s ease;
                transition-delay: .05s;
                transform: translateX(100%);
                visibility: hidden;
                pointer-events: auto;
              }
              .close-btn {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                background-color: transparent;
                margin-inline-start: auto;
                cursor:pointer;
              }
          </style>
          <div class="modal">
            <div class="overlay"></div>
            <div class="content">
              <div class="header">
                <h3 name="header"></h3>
                <button class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
              </div>
              <div class="body">
                <slot></slot>
              </div>
            </div>
          </div>
      `;

    // Thêm sự kiện click cho nút đóng drawer
    this.shadowRoot
      .querySelector(".close-btn")
      .addEventListener("click", () => {
        this.close();
      });
    this.shadowRoot.querySelector(".overlay").addEventListener("click", () => {
      this.close();
    });
  }

  // Phương thức mở drawer
  open() {
    // Di chuyển drawer vào cuối body
    document.body.appendChild(this);
    // Kích hoạt animation mở
    requestAnimationFrame(() => {
        this.setAttribute('open', '');
    });
  }

  // Phương thức đóng drawer
  close() {
     // Kích hoạt animation đóng
     this.removeAttribute('open');
  }
}

// Đăng ký custom element
customElements.define("kxti-drawer", Drawer);

// Thêm sự kiện click cho nút mở drawer
document.querySelectorAll('[is="openDrawerBtn"]').forEach(btn => {
  btn.addEventListener('click',(event)=>{
    const controlledId = event.target.getAttribute('aria-controls');
    const drawer = document.getElementById(controlledId);
    if (drawer) {
      drawer.open();
    } 
  })
})
