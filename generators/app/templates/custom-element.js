class <%= props.class %> extends HTMLElement {
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
    let tmpl = <%= props.class %>.template;
    shadowRoot.innerHTML = tmpl;
    return shadowRoot;
  }
} // Class CustomElement
customElements.define("<%= props.name %>", <%= props.class %>);