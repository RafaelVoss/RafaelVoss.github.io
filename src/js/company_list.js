import { store } from '../store/index.js';
import { displayShipments } from '../store/actions.js';
import { getDocumentsToDeliver } from '../api/api.js';
import { getCompanies } from '../store/selectors.js';

export const DisplayCompanies = async () => {
    Object.values(getCompanies(store.getState())).forEach(company => {
        let html =`
        <a hx-get="document_list.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML" id="${company.id}">
            <nav-button>${company.name}</nav-button>
        </a>`;
        const container = document.createElement('div');
        container.innerHTML = html;
        const a = container.querySelector('a');
        a.addEventListener("click", async () => {
            store.dispatch(displayShipments(company.id, await getDocumentsToDeliver(company.id)))
        });
        document.querySelector("main div").appendChild(a);
        container.remove();
    });

    // The code below makes the new htmx code that is inserted to be processed as such. 
    htmx.process(document.querySelector("main div"));

    document.dispatchEvent(new CustomEvent('contentLoaded'));
};