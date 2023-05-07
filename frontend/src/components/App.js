import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utilis/api';
import { UserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utilis/auth';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  // Стейт регистрации
  const [isRegistrationSuccessfull, setIsRegistrationSuccessfull] = useState(false);

  // Стейты открытия/закрытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Стейты индентификаторов загрузки
  const [isLoadingProfilePopup, setIsLoadingProfilePopup] = useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = useState(false);
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false);
  const [infoTooltipOpened, setInfoTooltipOpened] = useState(false);

  // Стейт о текущей выбранной карте (для попапа с полноразмерной фоткой)
  const [selectedCard, setSelectedCard] = useState({});

  // Стейт об инфморации текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт массива карт
  const [cards, setCards] = useState([]);

  // Получаем информацию о пользователе и массиве карт,
  // записываем их значения в стейт-переменные

  useEffect(() => {
    api.receiveUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(err));
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData)
      })
      .catch(err => console.log(err));
  }, [])

  // Проверка токена пользователя
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true })
        }
      })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  // Регистрация пользователя
  function handleRegistration(password, email, clearForm) {
    auth.register(password, email)
      .then((res) => {
        if (res) {
          setIsRegistrationSuccessfull(true);
          clearForm();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessfull(false);
      })
      .finally(() => handleTooltipOpen())
  }

  // Логин/логаут

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogOut() {
    setLoggedIn(false);
    setEmail('');
  }


  // Функции открытия попапов

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleTooltipOpen() {
    setInfoTooltipOpened(true);
  }

  // Функция закрытия всех попапов

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltipOpened(false);
    setSelectedCard({});
  }

  // Закрытие попапов на фон

  function handleBgClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  // Закрытие попапов на Esc

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link
    || infoTooltipOpened

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  // Функция обработки клика по изображению

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Функция обработки лайка

  function handleCardLike(card) {
    // Проверяем, есть ли среди массива лайк пользователя
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  // Функция удаления карточки

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    //Идентификатор загрузки
    setIsLoadingProfilePopup(true);

    api.setNewProfileInfo(data)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoadingProfilePopup(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarPopup(true);

    api.setUserAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoadingAvatarPopup(false);
      });
  }

  function handleAddPlace(data) {
    setIsLoadingAddPlacePopup(true);

    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoadingAddPlacePopup(false);
      });
  }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} handleSignOut={handleLogOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegistration={handleRegistration}
                />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="*"
              element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
            />
          </Routes>
          <Footer />
          <InfoTooltip
            onClose={closeAllPopups}
            onBgClose={handleBgClose}
            isOpen={infoTooltipOpened}
            isSuccesfull={isRegistrationSuccessfull}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onBgClose={handleBgClose}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingProfilePopup}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onBgClose={handleBgClose}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoadingAvatarPopup}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onBgClose={handleBgClose}
            onAddPlace={handleAddPlace}
            isLoading={isLoadingAddPlacePopup}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onBgClose={handleBgClose}
          />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
