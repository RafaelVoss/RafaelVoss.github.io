class LoadingSpinner extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <div id="loading-spinner-bg" class="fixed h-screen w-full z-30 bg-black opacity-40">
        </div>
        <div class="fixed top-1/2 left-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div id="loading-spinner" class="border-8 border-gray-100 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
        `;
    }
}

customElements.define('loading-spinner', LoadingSpinner);

const spinner = document.querySelector('loading-spinner');

// ADD LOGIC TO REMOVE THE SPINNER AFTER SOME TIME AND MANAGE THE ERROR PROPERLY
document.addEventListener('htmx:beforeRequest', () => spinner.classList.remove('hidden'));
document.addEventListener('contentLoaded', () => spinner.classList.add('hidden')); // 'contentLoaded' event should be manually emmited