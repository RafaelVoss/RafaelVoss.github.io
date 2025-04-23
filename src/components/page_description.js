class PageDescription extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <div class="w-full p-4 flex flex-col border-y-2 border-slate-800">
            <h2 class="self-center"><slot></slot></h2>
        </div>
        `;
    }
}

customElements.define('page-description', PageDescription);

const currentUrl = window.location.href;