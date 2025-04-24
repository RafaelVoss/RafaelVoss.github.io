import { store } from '../store/index.js';
import { openPopup, closePopup, confirmArrival, confirmDelivery, goToPOD, confirmIssue, sendMessage, removeFile, navigateBackAction, stayLoggedIn, logout } from '../store/actions.js';
import { createArrival } from '../api/api.js';

export const resetPopupState = {
    visible: false,
    wasVisible: false,
    content: '',
    buttons: {
        greenBTN: {
            visible: false,
            text: '',
            action: null
        },
        redBTN: {
            visible: false,
            text: '',
            action: null
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
};

export const popupAskingToLogOut = () => {
    store.dispatch(stayLoggedIn());
    return ({
        visible: true,
        wasVisible: false,
        content: 'Do You really want to leave?',
        buttons: {
            greenBTN: {
                visible: true,
                text: 'Stay',
                action: closeConfirmationPopup
            },
            redBTN: {
                visible: true,
                text: 'Leave',
                action: logOutAction
            },
            redderBTN: {
                visible: false,
                text: '',
                action: null
            }
        },
    });
}
export const arrivalPopupState = {
    visible: true,
    wasVisible: false,
    content: 'Confirm Arival?',
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Confirm',
            action: confirmArrivalAction
        },
        redBTN: {
            visible: true,
            text: 'Cancel',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
}

export const deliveryPopupState = (index) => ({
    visible: true,
    wasVisible: false,
    content: 'Confirm Delivery?',
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Confirm',
            action: () => confirmDeliveryAction(index)
        },
        redBTN: {
            visible: true,
            text: 'Cancel',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
});

export const issuePopupState = (index) => ({
    visible: true,
    wasVisible: false,
    content: 'Confirm Issue?',
    buttons: {
        greenBTN: {
            visible: false,
            text: '',
            action: null
        },
        redBTN: {
            visible: true,
            text: 'Cancel',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: true,
            text: 'Confirm',
            action: () => confirmIssueAction(index)
        }
    },
});

export const displayPopupWithFileState = (html, type, index) => ({
    visible: true,
    wasVisible: false,
    content: html,
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Close',
            action: closeConfirmationPopup
        },
        redBTN: {
            visible: true,
            text: 'Delete',
            action: () => removeFileAction(type, index)
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
})

export const popupContentAskingForPOD = (index) => ({
    visible: true,
    wasVisible: false,
    content: "Add Proof of Delivery?",
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Add',
            action: () => addPODAction(index)
        },
        redBTN: {
            visible: true,
            text: 'Close',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
})

export const popupWarningPODWasSent = (doc) => ({
    visible: true,
    wasVisible: false,
    content: `Proof of Delivery ${doc === "cte" ? "of this CTe" : "of this NFe"} has already been sent!`,
    buttons: {
        greenBTN: {
            visible: false,
            text: '',
            action: null
        },
        redBTN: {
            visible: true,
            text: 'Close',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
})

export const sendPODPopupState = (content) => ({
    visible: true,
    wasVisible: false,
    content: "Send Message?",
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Send',
            action: () => sendPODAction(content)
        },
        redBTN: {
            visible: true,
            text: 'Close',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: '',
            action: null
        }
    },
})

function logOutAction() {
    store.dispatch(logout());
    closeConfirmationPopup();
}

function confirmArrivalAction() {
    store.dispatch(confirmArrival());
    closeConfirmationPopup();
    createArrival();
}

function confirmDeliveryAction(index) {
    store.dispatch(confirmDelivery(index));
    store.dispatch(openPopup(popupContentAskingForPOD(index)));
}

function addPODAction(index) {
    store.dispatch(goToPOD(index));
    closeConfirmationPopup();
}

function confirmIssueAction(index) {
    store.dispatch(confirmIssue(index));
    closeConfirmationPopup();
}

function sendPODAction(content) {
    store.dispatch(sendMessage(content));
    closeConfirmationPopup();
    store.dispatch(navigateBackAction());
}

function removeFileAction(type, index) {
    store.dispatch(removeFile(type, index));
    closeConfirmationPopup();

}
function closeConfirmationPopup() {
    store.dispatch(closePopup(resetPopupState));
}