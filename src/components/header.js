import { store } from '../store/index.js';
import { navigateBackAction } from '../store/actions.js';

class Header extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <header class="flex flex-row w-screen justify-between pt-8 pb-4">
            <div class="flex justify-center items-center w-2/12">
                <hamburger-button class="side-panel-open" type="button"/>
            </div>
            <div>
                <img src="/src/assets/logo.png" class="h-16" id="header-logo" alt="Transpro logo">
            </div>
            <div class="w-2/12"></div>
        </header>
        `;
    }
}


customElements.define('header-app', Header);

document.querySelector('header-app').shadowRoot.querySelector('.side-panel-open').addEventListener('click', function() {
    document.querySelector("side-panel").setAttribute("open", "true");
});

document.querySelector('header-app').shadowRoot.querySelector('#header-logo').addEventListener('click', () => {
    store.dispatch(navigateBackAction());
})