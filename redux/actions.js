export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, payload: taskId });
export const loadTasks = (tasks) => ({ type: LOAD_TASKS, payload: tasks });
export const setProfileImage = (uri) => ({ type: SET_PROFILE_IMAGE, payload: uri });
