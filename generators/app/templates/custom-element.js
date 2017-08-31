const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 1rem;
    
    :host([hidden]) {
      display: none;
    }
    

  </style>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(template, '<%= props.name %>');
}

class <%= props.class %> extends HTMLElement {
  static get observedAttributes() {}
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
} // Class CustomElement
customElements.define("<%= props.name %>", <%= props.class %>);