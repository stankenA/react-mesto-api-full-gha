export const BASE_URL = 'http://api.stankena-mesto.nomoredomains.monster';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL + endpoint}`, options).then(checkResponse)
}

export const register = (password, email) => {
  return request(`/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return request(`/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return request(`/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(data => data)
}
