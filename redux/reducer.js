import { ADD_TASK, DELETE_TASK, LOAD_TASKS, SET_PROFILE_IMAGE } from './actions';

const initialState = {
  tasks: [],
  profileImage: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case LOAD_TASKS:
      return { ...state, tasks: action.payload };
    case SET_PROFILE_IMAGE:
      return { ...state, profileImage: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
