class CustomElement extends HTMLElement {
  static get template() {
    return `
<style></style>
<div></div>
`
  }
  static get observedAttributes() {}
  constructor() {
    super();
    var shadowRoot = this.initShadowDom();
  }
  connectedCallback() {}
  initShadowDom() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    let tmpl = CustomElement.template;
    shadowRoot.innerHTML = tmpl;
    return shadowRoot;
  }
} // Class CustomElement
customElements.define('CustomElement', CustomElement);