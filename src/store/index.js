import reducer from './reducer.js';

export const initialState = {
    session: null,
    popup: {
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
    },
    companies: {},
    selectedByUser:{
        pathHistory: ['login.html'],
        typeOfDocuments: null,
        companyId: null,
        shipmentIndex: null,
        documentIndex: null,
        file: {
            type: null,
            index: null
        }
    }
};

let currentState = structuredClone(initialState);

export const store = {
    getState: () => currentState,
    
    dispatch: (action) => {
        reducer(currentState, action);
        store.listeners.forEach((listener) => listener());
        console.log(currentState);
    },
    
    listeners: [],
    
    subscribe: (listener) => {
        store.listeners.push(listener);
    }
};
