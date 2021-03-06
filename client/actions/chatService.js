export const updateMessage = (message) => ({
  type: 'HANDLE_MESSAGE_CHANGE',
  message,
});

export const updateName = (name) => ({
  type: 'HANDLE_NAME_CHANGE',
  name,
})

export const updateUsers = (users) => ({
  type: 'HANDLE_USERS_CHANGE',
  users,
});

export const updateSearchQuery = (query) => ({
  type: 'HANDLE_SEARCH_CHANGE',
  query,
});
