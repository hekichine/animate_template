class HelloWord extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"})
    this.shadowRoot.innerHTML = `<h1>Heloo world</h1><button>Hello</button>
    <slot></slot>
    `
  }
  connectedCallback(){
    this.shadowRoot.querySelector('button').addEventListener('click',(e)=>{
      alert("click button");
    });
  }
  disconnectedCallback(){
    alert("This components removed! ")
  }
}
customElements.define('hello-world',HelloWord)
