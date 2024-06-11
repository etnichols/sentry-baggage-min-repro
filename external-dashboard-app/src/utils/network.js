const FETCH_OPTIONS = {
  credentials: 'include',
  method: 'GET',
};

const fetchCurrentUser = (options) =>
  fetch(`/api/user`, { ...FETCH_OPTIONS }).then((response) => response.json());

export default {
  fetchCurrentUser,
};
