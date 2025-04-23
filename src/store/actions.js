import { store } from './index.js';
import { isPopupVisible } from './selectors.js';
import { createSession } from '../api/api.js';

export const login = (usrInput) => {
    (async function dispatchLogin() {
        try {
            const session = await createSession(usrInput)
            store.dispatch({ type: 'LOGIN_SUCCESS', payload: session })
        } catch (error) {
            store.dispatch({ type: 'LOGIN_FAILURE', error: error.message });
        }
    })();
};

export const logout = () => ({
    type: 'LOGOUT',
    payload: null
});

export const navigateBackAction = () => ({
    type: 'NAVIGATE_BACK',
    payload: null
})

export const stayLoggedIn = () => ({
    type: 'STAY_LOGGED_IN',
    payload: null
})

export const navigateToHome = () => ({
    type: 'NAVIGATE_TO_HOME',
    payload: null
})

export const editUser = () => ({
    type: 'EDIT_USER',
    payload: null
})

export const changePassword = () => ({
    type: 'CHANGE_PASSWORD',
    payload: null
})

export const map = () => ({
    type: 'MAP',
    payload: null
})

export const downloadDocuments = (companies) => ({
    type: 'DOWNLOAD_DOCUMENTS',
    payload: companies
});

export const PODs = (companies) => ({
    type: 'PODS',
    payload: companies
});

export const displayShipments = (companyId, shipments) => ({
    type: 'DISPLAY_SHIPMENTS',
    payload: {
        companyId,
        shipments
    }
})

export const searchShipments = (text) => ({
    type: 'SEARCH_SHIPMENTS',
    payload: text
})

export const deselectShipmentsSearchBar = () => ({
    type: 'DESELECT_SHIPMENTS_SEARCH_BAR',
    payload: null
})

export const viewDocument = (index) => ({
    type: 'VIEW_DOCUMENT',
    payload: index
})

export const confirmArrival = () => ({
    type: 'CONFIRM_ARRIVAL',
    payload: null
});

export const confirmDelivery = (index) => ({
    type: 'CONFIRM_DELIVERY',
    payload: index
});

export const goToPOD = (index) => ({
    type: 'GO_TO_POD',
    payload: index
})

export const confirmIssue = (index) => ({
    type: 'CONFIRM_ISSUE',
    payload: index
});

export const removeFile = (type, index) => ({
    type: 'REMOVE_FILE',
    payload: { type, index }
})

export const saveDocMessage = (message) => ({
    type: 'SAVE_DOC_MESSAGE',
    payload: message
})

export const saveDocContent = (files, thumbnails, fileType) => ({
    type: 'SAVE_DOC_CONTENT',
    payload: {content: files, thumbnails: thumbnails, type: fileType}
})

export const sendMessage = (message) => ({
    // MAKE AN API CALL TO SEND THE MESSAGE!!!!
    type: 'SEND_MESSAGE',
    payload: message
})

export const openPopup = (popupContent) => ({
    type: 'SET_OPEN_POPUP',
    payload: {...popupContent, wasVisible: isPopupVisible(store.getState())}
});

export const closePopup = (popupContent) => ({
    type: 'SET_CLOSE_POPUP',
    payload: {...popupContent, wasVisible: isPopupVisible(store.getState())}
});
