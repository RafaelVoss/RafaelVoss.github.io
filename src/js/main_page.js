import { store } from '../store/index.js';
import { downloadDocuments, PODs } from '../store/actions.js';
import { getCompanies } from '../api/api.js';
import { createTenDocs } from '../api/api.js'; // DELETE createTenDocs!!!

export const DisplayMainPage = async () => {
    let html =`
    <nav-button id="create_docs">
        Criar Documentos para teste
    </nav-button>
    <a id="download_documents" hx-get="select_company.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button>
            Baixar Documentos
        </nav-button>
    </a>
    <a id="PODs" hx-get="select_company.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button >
            Comprovantes de Entrega
        </nav-button>
    </a>
    <a hx-get="maps.html" hx-trigger="click" hx-target="main" hx-swap="innerHTML">
        <nav-button>
            Mapa
        </nav-button>
    </a>
    <yellow-button class="grow self-center content-end m-10">
        <p class="p-2">Iniciar<br>Viagem</p>
    </yellow-button>
        `
    document.querySelector("main").innerHTML = html;

    const test = document.querySelector('#create_docs'); // DELETE THIS LINE!!!
    test.addEventListener('click', async function() { // DELETE THIS LINE!!!
        createTenDocs(); // DELETE THIS LINE!!!
     }); // DELETE THIS LINE!!!

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