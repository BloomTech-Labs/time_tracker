import { START_TIMER } from '../action/timestampActions';

const initialState = {
  activeTimerId: '',
  startTime: '',
  activeTimer: false
};

export const timestampReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        activeTimerId: action.payload._id,
        startTime: action.payload.startTime,
        activeTimer: true
      };
    default:
      return state;
  }
};
