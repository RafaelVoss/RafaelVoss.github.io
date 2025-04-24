import { store } from '../store/index.js';
import { downloadDocuments, PODs } from '../store/actions.js';
import { getCompanies } from '../api/api.js';
import { createTenDocs } from '../api/api.js'; // DELETE createTenDocs!!!

export const DisplayMainPage = async () => {
    let html =`
    <a id="download_documents" hx-get="select_company.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button>
            Download Documents
        </nav-button>
    </a>
    <a id="PODs" hx-get="select_company.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button >
            Proof of Delivery
        </nav-button>
    </a>
    <a hx-get="maps.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button>
            Maps
        </nav-button>
    </a>
    <yellow-button class="grow self-center content-end m-10">
        <p class="p-2">Start<br>Travel</p>
    </yellow-button>
        `
    document.querySelector("main").innerHTML = html;

    document.querySelector('#download_documents').addEventListener('click', async function() {
        store.dispatch(downloadDocuments(await getCompanies()))
    })

    document.querySelector('#PODs').addEventListener('click', async function() {
        store.dispatch(PODs(await getCompanies()))
    })

    // The code below makes the new htmx code that is inserted to be processed as such. 
    htmx.process(document.querySelector("main"));

    document.dispatchEvent(new CustomEvent('contentLoaded'));
};