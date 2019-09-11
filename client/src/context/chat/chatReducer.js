import {
    STARTSESSION,
    ENDTOSESSION,
    GENERATEIDROOM,
    UPDATEIDROOM,
    DELETEIDROOM
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
        case GENERATEIDROOM:
            return {
                ...state,
                id_room: action.payload
            };
        case UPDATEIDROOM:
            return {
                ...state,
                id_room: action.payload
            }
        case DELETEIDROOM:
            return{
                ...state,
                id_room: ''
            }
        default:
            return state;
    }
};
