import {
    STARTSESSION,
    ENDTOSESSION
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case STARTSESSION:
            return {
                ...state,
                connected: true,
                socket: action.payload
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
