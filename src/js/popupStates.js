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
        content: 'Deseja realmente sair?',
        buttons: {
            greenBTN: {
                visible: true,
                text: 'Ficar',
                action: closeConfirmationPopup
            },
            redBTN: {
                visible: true,
                text: 'Sair',
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
    content: 'Confirmar chegada?',
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Confirmar',
            action: confirmArrivalAction
        },
        redBTN: {
            visible: true,
            text: 'Cancelar',
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
    content: 'Confirmar Entrega?',
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Confirmar',
            action: () => confirmDeliveryAction(index)
        },
        redBTN: {
            visible: true,
            text: 'Cancelar',
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
    content: 'Confirmar Ocorrência?',
    buttons: {
        greenBTN: {
            visible: false,
            text: '',
            action: null
        },
        redBTN: {
            visible: true,
            text: 'Cancelar',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: true,
            text: 'Confirmar',
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
            text: 'Fechar',
            action: closeConfirmationPopup
        },
        redBTN: {
            visible: true,
            text: 'Excluir',
            action: () => removeFileAction(type, index)
        },
        redderBTN: {
            visible: false,
            text: 'Confirmar',
            action: null
        }
    },
})

export const popupContentAskingForPOD = (index) => ({
    visible: true,
    wasVisible: false,
    content: "Adicionar Comprovantes de Entrega?",
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Adicionar',
            action: () => addPODAction(index)
        },
        redBTN: {
            visible: true,
            text: 'Fechar',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: 'Confirmar',
            action: null
        }
    },
})

export const popupWarningPODWasSent = (doc) => ({
    visible: true,
    wasVisible: false,
    content: `Comprovante de Entrega ${doc === "cte" ? "desse CTe" : "dessa NFe"} já foi enviado!`,
    buttons: {
        greenBTN: {
            visible: false,
            text: 'Adicionar',
            action: null
        },
        redBTN: {
            visible: true,
            text: 'Fechar',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: 'Confirmar',
            action: null
        }
    },
})

export const sendPODPopupState = (content) => ({
    visible: true,
    wasVisible: false,
    content: "Enviar Comprovante?",
    buttons: {
        greenBTN: {
            visible: true,
            text: 'Enviar',
            action: () => sendPODAction(content)
        },
        redBTN: {
            visible: true,
            text: 'Fechar',
            action: closeConfirmationPopup
        },
        redderBTN: {
            visible: false,
            text: 'Confirmar',
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