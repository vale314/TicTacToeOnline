import {
    STARTSESSION,
    ENDTOSESSION
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case STARTSESSION:
            return {
                ...state,
                socket: action.payload,
                connected: true
            };
        case ENDTOSESSION:
            return {
                ...state,
                connected: false,
                socket: null
            };
        default:
            return state;
    }
};
