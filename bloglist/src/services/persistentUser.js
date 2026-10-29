const key = "loggedUser";

const getUser = () => {
  const user = window.localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
};

const saveUser = (user) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

const removeUser = () => {
  window.localStorage.removeItem(key);
};

export { getUser, saveUser, removeUser };
