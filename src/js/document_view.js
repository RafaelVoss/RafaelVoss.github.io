import { store } from '../store/index.js';
import { openPopup } from '../store/actions.js';
import { getCurrentShipment } from '../store/selectors.js'
import { arrivalPopupState, deliveryPopupState, popupContentAskingForPOD, issuePopupState, popupWarningPODWasSent } from './popupStates.js';

export const DisplaySelectedDocument = () => {
    let shipment = getCurrentShipment(store.getState());
    let docView = document.createElement("div");
    docView.setAttribute("id", "document-view");
    docView.classList.add("overflow-auto", "mt-8");

    docView = setDocHeader(shipment, docView);
    docView = setDocBody(shipment, docView);
    document.querySelector('main #document-view').replaceChildren(docView)

    document.dispatchEvent(new CustomEvent('contentLoaded'));
}

function setDocHeader(shipment, docView) {
    let html = `
    <div id="summary" class="border-b-2 border-black">
        <h3 class="text-2xl mb-4 text-center">${shipment.destination.name}</h3>
        <p>
            Entrega
        </p>
        <div class="flex flex-row w-full justify-between items-center">
            <address class="py-10">
                ${shipment.destination.address}
            </address>
            <yellow-button id="arrivalBTN" class="mr-10">
                Chegada
            </yellow-button>
        </div>
        <div class="justify-center text-xs pb-2 hidden" id="delivery-date-section">
            <arrival-flag></arrival-flag>
            <span class="italic pt-1" id="delivery-date-text"></span>
        </div>
    </div>
    `
    docView.innerHTML = html;

    docView.querySelector("#arrivalBTN").addEventListener("click", () => {
        store.dispatch(openPopup(arrivalPopupState));
    });

    if (shipment.status && shipment.status === 'arrived') {
        // const today = new Date(Date.now());
        docView.querySelector("#arrivalBTN").classList.toggle("hidden");
        docView.querySelector("#delivery-date-text").innerHTML = "Chegada em " + FormatedDateFromDate(shipment.time) + " às " + FormatedTimeFromDate(shipment.time);
        docView.querySelector("#delivery-date-section").classList.toggle("hidden");
        docView.querySelector("#delivery-date-section").classList.toggle("flex");
    }
    return docView
}

function setDocBody(shipment, docView) {
    let div = document.createElement("div");
    div.setAttribute("id", "documents");
    div.classList.add("my-8");
    let html = '';
    if (shipment.cte) {
        html = `
        <table class="w-full">
            <tr>
                <th>
                    CT-e:
                </th>
            </tr>
            <tr class="flex flex-row w-full items-center justify-items-center">
                <td class="py-10 w-2/12 text-center">
                    ${shipment.cte.number}
                </td>
                ${shipment.status && shipment.status === 'arrived' && !shipment.cte.status ? 
                `
                <td class="w-5/12 text-center">
                    <green-button>Entrega</green-button>
                </td>
                <td class="w-5/12 text-center">
                    <red-button>Ocorrência</red-button>
                </td>
                `
                    : 
                ''}
                ${shipment.cte.status === 'delivered' ? 
                `<td class='w-8/12 text-center flex flex-col justify-center'>
                    <green-button>Entrega Ok</green-button>
                    <div class='text-xs'>
                        <check-circle></check-circle>
                        <span class='italic pt-4'>Entregue em ${FormatedDateFromDate(shipment.cte.time)} às ${FormatedTimeFromDate(shipment.cte.time)}</span>
                    </div>
                </td>`
                : 
                shipment.cte.status === 'has an issue' ? 
                `
                <td class='w-8/12 text-center flex flex-col justify-center'>
                    <redder-button>Ocorrência</redder-button>
                    <div class='text-xs'>
                        <warn-triangle></warn-triangle>
                        <span class='italic pt-4'>Ocorrência em ${FormatedDateFromDate(shipment.cte.time)} às ${FormatedTimeFromDate(shipment.cte.time)}</span>
                    </div>
                </td>
                `
                    :
                ''}
            </tr>
        </table>
        `
        div.insertAdjacentHTML('beforeend', html);

        if (shipment.status && shipment.status === 'arrived' && !shipment.cte.status) {
            div.querySelector("green-button").addEventListener('click', () => {
                store.dispatch(openPopup(deliveryPopupState(-1)));
            });
            div.querySelector("red-button").addEventListener('click', () => {
                store.dispatch(openPopup(issuePopupState(-1)));
            });
        } else if (shipment.status && shipment.status === 'arrived' && shipment.cte.status === 'delivered') {
            console.log(shipment.cte?.POD === undefined);
            div.querySelector("green-button").addEventListener('click', () => {
                shipment.cte?.POD === undefined ?
                    store.dispatch(openPopup(popupContentAskingForPOD(-1)))
                    :
                    store.dispatch(openPopup(popupWarningPODWasSent("cte")))
            });
        } else if (shipment.status && shipment.status === 'arrived' && shipment.cte.status === 'has an issue') {
            console.log(shipment.cte?.POD === undefined);
            div.querySelector("redder-button").addEventListener('click', () => {
                shipment.cte?.POD === undefined ?
                    store.dispatch(openPopup(popupContentAskingForPOD(-1)))
                    :
                    store.dispatch(openPopup(popupWarningPODWasSent("cte")))
            });
        }
    }
    shipment.nfes.forEach((nfe, index) => {
        html = `
        <table class="w-full">
            <tr>
                <th>
                    NF-e:
                </th>
            </tr>
            <tr class="flex flex-row w-full items-center justify-items-center">
                <td class="py-10 w-2/12 text-center">
                    ${nfe.number}
                </td>
                ${shipment.status && shipment.status === 'arrived' && !nfe.status ? 
                `
                <td class="w-5/12 text-center">
                    <green-button>Entrega</green-button>
                </td>
                <td class="w-5/12 text-center">
                    <red-button>Ocorrência</red-button>
                </td>
                `
                    :
                ''} 
                ${nfe.status === 'delivered' ? 
                `<td class='w-8/12 text-center flex flex-col justify-center'>
                    <green-button>Entrega Ok</green-button>
                    <div class='text-xs'>
                        <check-circle></check-circle>
                        <span class='italic pt-4'>Entregue em ${FormatedDateFromDate(nfe.time)} às ${FormatedTimeFromDate(nfe.time)}</span>
                    </div>
                </td>`
                    : 
                nfe.status === 'has an issue' ? 
                `
                <td class='w-8/12 text-center flex flex-col justify-center'>
                    <redder-button>Ocorrência</redder-button>
                    <div class='text-xs'>
                        <warn-triangle></warn-triangle>
                        <span class='italic pt-4'>Ocorrência em ${FormatedDateFromDate(nfe.time)} às ${FormatedTimeFromDate(nfe.time)}</span>
                    </div>
                </td>
                `
                    :
                ''}
            </tr>
        </table>
        `
        div.insertAdjacentHTML('beforeend', html);

        if (shipment.status && shipment.status === 'arrived' && !nfe.status) {
            const greenBTNList = div.querySelectorAll("#documents table tr td green-button");
            const greenEl = greenBTNList[greenBTNList.length -1];
            greenEl.addEventListener('click', () => {
                store.dispatch(openPopup(deliveryPopupState(index)));
            });

            const redBTNList = div.querySelectorAll("#documents table tr td red-button");
            const redEl = redBTNList[redBTNList.length -1]
            redEl.addEventListener('click', () => {
                store.dispatch(openPopup(issuePopupState(index)));
            });
        } else if (shipment.status && shipment.status === 'arrived' && nfe.status === 'delivered') {
            const greenBTNList = div.querySelectorAll("#documents table tr td green-button");
            const greenEl = greenBTNList[greenBTNList.length -1];
            greenEl.addEventListener('click', () => {
                nfe?.POD === undefined ?
                    store.dispatch(openPopup(popupContentAskingForPOD(index)))
                    :
                    store.dispatch(openPopup(popupWarningPODWasSent("nfe")))
            });
        } else if (shipment.status && shipment.status === 'arrived' && nfe.status === 'has an issue') {
            const redderBTNList = div.querySelectorAll("#documents table tr td redder-button");
            const redderEl = redderBTNList[redderBTNList.length -1]
            redderEl.addEventListener('click', () => {
                nfe?.POD === undefined ?
                    store.dispatch(openPopup(popupContentAskingForPOD(index)))
                    :
                    store.dispatch(openPopup(popupWarningPODWasSent("nfe")))
            });
        }
    })
    docView.insertAdjacentElement("beforeend", div);
    return docView
}

function FormatedDateFromDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function FormatedTimeFromDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (minutes>=10? hours + ":" + minutes : hours + ":0" + minutes);
}