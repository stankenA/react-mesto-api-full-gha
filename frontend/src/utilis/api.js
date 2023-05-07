class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  receiveUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

  setNewProfileInfo({ name, about }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  postNewCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeLikeStatus(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
    } else {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
    }
  }

  setUserAvatar(newPhoto) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newPhoto
      })
    })
  }
}

export const api = new Api({
  url: 'http://api.stankena-mesto.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
})
