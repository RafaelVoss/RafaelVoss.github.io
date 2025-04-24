import { store } from "../store/index.js";
import { navigateToHome, editUser, changePassword } from "../store/actions.js";

class SidePanel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <link href="/src/css/output.css" rel="stylesheet">
        <div class="side-panel-close hidden fixed h-screen w-full z-10 bg-black opacity-40">
        </div>
        <div class="flex flex-col justify-center side-panel h-screen w-3/4 p-4 z-20 bg-slate-400 absolute -left-3/4 duration-300 rounded-r-3xl">
            <header class="flex flex-row justify-center pt-8 pb-12">
                <div>
                    <img src="/src/assets/logo.png" class="h-16" id="header-logo" alt="Transpro logo">
                </div>
            </header>
            <a id="homeBTN">
                <nav-button class="side-panel-close">
                    Home
                </nav-button>
            </a>
            <a id="editUserBTN" hx-get="edit_user.html" hx-trigger="click" hx-target="global main" hx-swap="innerHTML">
                <nav-button class="side-panel-close">
                    Edit User
                </nav-button>
            </a>
            <a id="changePasswordBTN" hx-get="change_password.html" hx-trigger="click" hx-target="global main" hx-swap="innerHTML">
                <nav-button class="side-panel-close">
                    Change Password
                </nav-button>
            </a>
            <p class="grow text-xs text-center pt-4">© 2025 Arellano Voss Logistica Ltda.<br>All rights reserved.</p>
            <a href="index.html" class="flex flex-col">
                <red-button class="self-center mb-10">
                    <p class="my-4 mx-8">Leave</p>
                </red-button>
            </a>
        </div>
      `;
      htmx.process(this.shadowRoot);
    }

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            const sidePanel = this.shadowRoot.querySelector('.side-panel');
            const sidePanelClose = this.shadowRoot.querySelector('.side-panel-close');
            if (newValue === 'true') {
                sidePanel.classList.toggle('translate-x-full');
                sidePanelClose.classList.toggle('hidden');
            } else {
                sidePanel.classList.toggle('translate-x-full');
                sidePanelClose.classList.toggle('hidden');
            }
        }
    }
}

customElements.define('side-panel', SidePanel);

document.querySelector('side-panel').setAttribute('open', 'false');
const sidePanelClosers = document.querySelector('side-panel').shadowRoot.querySelectorAll('.side-panel-close')
sidePanelClosers.forEach(closer => {
    closer.addEventListener('click', function() {
        document.querySelector('side-panel').setAttribute('open', 'false');
    });
});

document.querySelector('side-panel').shadowRoot.querySelector("#homeBTN").addEventListener('click', () => {
    store.dispatch(navigateToHome());
});
document.querySelector('side-panel').shadowRoot.querySelector("#editUserBTN").addEventListener('click', () => {
    store.dispatch(editUser());
});
document.querySelector('side-panel').shadowRoot.querySelector("#changePasswordBTN").addEventListener('click', () => {
    store.dispatch(changePassword());
});