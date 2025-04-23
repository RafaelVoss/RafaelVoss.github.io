import { store } from '../store/index.js';
import { closePopup } from '../store/actions.js';
import { resetPopupState } from '../js/popupStates.js';
import { isPopupVisible, wasPopupVisible, popupContent, isGreenBTNVisible, isRedBTNVisible, isRedderBTNVisible, greenBTNText, redBTNText, redderBTNText, greenBTNAction, redBTNAction, redderBTNAction } from '../store/selectors.js';

class ConfirmationPopup extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        store.subscribe(() => this.render()); // Re-render when state changes
        this.render();
    }
    
    render() {
        let state = store.getState();
        this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <div id="confirmation-popup-bg" class="fixed h-screen w-full z-30 bg-black opacity-40">
        </div>
        <div class="flex flex-col justify-center items-center">
            <div id="confirmation-popup" class="text-center w-10/12 p-4 z-40 absolute top-1/3 bg-slate-400 duration-300 rounded-3xl">
                <div class="flex flex-col items-center h-full w-full pt-8">
                    <h4 class="text-2xl">${popupContent(state)}</h2>
                    <div class="flex grow w-full items-center justify-around">
                        <red-button class=${isRedBTNVisible(state) ? '' : 'hidden'}>
                            ${redBTNText(state)}
                        </red-button>
                        <green-button class=${isGreenBTNVisible(state) ? '' : 'hidden'}>
                            ${greenBTNText(state)}
                        </green-button>
                        <redder-button class=${isRedderBTNVisible(state) ? '' : 'hidden'}>
                            ${redderBTNText(state)}
                        </redder-button>
                    </div>
                </div>
            </div>
        </div>
        `;

        const isPopupOpen = isPopupVisible(state);
        const wasPopupOpen = wasPopupVisible(state);

        const popup = this.shadowRoot.querySelector('#confirmation-popup');
        const popupBG = this.shadowRoot.querySelector('#confirmation-popup-bg');
        const redBTN = this.shadowRoot.querySelector('red-button');
        const greenBTN = this.shadowRoot.querySelector('green-button');
        const redderBTN = this.shadowRoot.querySelector('redder-button');
        if (typeof popupContent(state) === 'object') {
            this.shadowRoot.querySelector('#confirmation-popup h4').replaceChildren(popupContent(state));
            this.shadowRoot.querySelector('#confirmation-popup').classList.remove('top-1/3');
            let deviceHeight = window.innerHeight;
            let height = this.shadowRoot.querySelector('#confirmation-popup').offsetHeight;
            let topOffset = (deviceHeight - height) / 2;
            this.shadowRoot.querySelector('#confirmation-popup').setAttribute('style', `top: ${topOffset}px`);
        }

        redBTN.addEventListener('click', () => {redBTNAction(state)}, {once: true});
        greenBTN.addEventListener('click', () => {greenBTNAction(state)}, {once: true});
        redderBTN.addEventListener('click', () => {redderBTNAction(state)}, {once: true});

        popupBG.addEventListener('click', () => {
            store.dispatch(closePopup(resetPopupState));
        });

        if (isPopupOpen && !wasPopupOpen) {
            // code to animate opening
            popup.classList.add('scale-0');
            popup.classList.add('translate-y-full');
            popupBG.classList.add('hidden');
            setTimeout(() => {
                popup.classList.remove('scale-0');
                popup.classList.remove('translate-y-full');
                popupBG.classList.remove('hidden');
            }, 1);
        }
        else if (isPopupOpen && wasPopupOpen) {
            // code to continue open
            popup.classList.remove('scale-0');
            popup.classList.remove('translate-y-full');
            popupBG.classList.remove('hidden');
        }
        else if (!isPopupOpen && wasPopupOpen) {
            // code to animate closing
            popup.classList.remove('scale-0');
            popup.classList.remove('translate-y-full');
            popupBG.classList.remove('hidden');
            setTimeout(() => {
                popup.classList.add('scale-0');
                popup.classList.add('translate-y-full');
                setTimeout(() => {
                    popupBG.classList.add('hidden');
                    store.dispatch(closePopup(resetPopupState))
                }, 200);
            }, 1);
        }
        else {
            // code to continue closed
            popup.classList.add('scale-0');
            popup.classList.add('translate-y-full');
            popupBG.classList.add('hidden');
            
        }
    }
}

customElements.define('confirmation-popup', ConfirmationPopup);

document.querySelector('confirmation-popup').setAttribute('open', 'false');