
export const getUser = function(state) {
    return state.user || {};
};

export const getTodoList = function(state) {
    return state.todoList || [];
};

export const getTopMsg = function(state) {
    return state.topMsg;
};

export const getEditMode = function(state) {
    return state.isEditMode;
};
