const API_URL = "https://localhost:7279";

const ENDPOINTS = {
    GET_ALL_TODOS: 'getAllTodos',
    GET_TODO_BY_ID: 'getTodoById',
    GET_TODO_ONLY_EXPIRED: 'getExpiredTodos',
    CREATE_TODO: 'createTodo',
    UPDATE_TODO: 'updateTodo',
    DELETE_TODO: 'deleteTodo'
};

const localhostEndpoints = {
    API_URL_GET_ALL_TODOS: `${API_URL}/${ENDPOINTS.GET_ALL_TODOS}`,
    API_URL_GET_TODO_BY_ID: `${API_URL}/${ENDPOINTS.GET_TODO_BY_ID}`,
    API_URL_GET_TODO_ONLY_EXPIRED: `${API_URL}/${ENDPOINTS.GET_TODO_ONLY_EXPIRED}`,
    API_URL_CREATE_TODO: `${API_URL}/${ENDPOINTS.CREATE_TODO}`,
    API_URL_UPDATE_TODO: `${API_URL}/${ENDPOINTS.UPDATE_TODO}`,
    API_URL_DELETE_TODO: `${API_URL}/${ENDPOINTS.DELETE_TODO}`
}

export default localhostEndpoints;