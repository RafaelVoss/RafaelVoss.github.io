import { store } from '../store/index.js';
import { getHistoryPath } from '../store/selectors.js'
import { openPopup } from '../store/actions.js';
import { popupAskingToLogOut } from './popupStates.js';
import { DisplayEditUser } from './edit_user.js';
import { DisplayChangePassword } from './change_password.js';
import { DisplayMainPage} from './main_page.js';
import { DisplayCompanies } from './company_list.js';
import { DisplayDocumentsToDeliver } from './document_list.js';
import { DisplaySelectedDocument } from './document_view.js';
import { DisplayMessages } from './messages.js'

let contentDispatchedPage = '';
let htmxPage = '';

store.subscribe(() => {
    let historyArray = getHistoryPath(store.getState());
    let currentPage = historyArray[historyArray.length - 1];
    if (currentPage === htmxPage) {
        hydratePage(currentPage);
        contentDispatchedPage = currentPage;
    } else {
        contentDispatchedPage = currentPage;
    }
})

document.addEventListener('htmx:afterSettle', (event) => {
    let htmxReqPage = event.detail.pathInfo.requestPath;
    if (htmxReqPage.startsWith('/')) {
        htmxReqPage = htmxReqPage.slice(1);
    }
    if (htmxReqPage === contentDispatchedPage) {
        hydratePage(htmxReqPage);
        htmxPage = htmxReqPage;
    } else {
        htmxPage = htmxReqPage;
    }
})

document.addEventListener('navigateBack', () => {
    // The event below trigers this function. use it in the browser while the back navigation button is not yet implemented
    let historyArray = getHistoryPath(store.getState());
    let currentPage = historyArray[historyArray.length - 1];
    if (currentPage === 'login.html') {
        DisplayMainPage();
        store.dispatch(openPopup(popupAskingToLogOut()));
    } else if ( currentPage === 'main_page.html') {
        DisplayMainPage();
    } else {
        htmxCall(currentPage);
    }
})

document.addEventListener('navigateHome', () => {
    DisplayMainPage();
})

const htmxCall = (page) => {
    htmx.ajax('GET', '/' + page, {
    target: 'main',
    swap: 'innerHTML',
    });
}

const hydratePage = async (page) => {
    switch (page) {
        case 'select_company.html':
            await DisplayCompanies();
            break;
        case 'document_list.html':
            let companyId = store.getState().selectedByUser.companyId;
            DisplayDocumentsToDeliver(companyId);
            break;
        case 'document_view.html':
            DisplaySelectedDocument();
            break;
        case 'messages.html':
            DisplayMessages();
            break;
        case 'main_page.html':
            DisplayMainPage();
            break;
        case 'edit_user.html':
            DisplayEditUser();
            break;
        case 'change_password.html':
            DisplayChangePassword();
            break;
    }
}
