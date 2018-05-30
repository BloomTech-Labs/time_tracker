import { ADD_TIMESTAMP } from '../action/invoiceActions';

const initialState = {
  timestamps: []
};

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMESTAMP:
      return {
        ...state,
        timestamps: [...state.timestamps, action.payload]
      };
    default:
      return state;
  }
};
