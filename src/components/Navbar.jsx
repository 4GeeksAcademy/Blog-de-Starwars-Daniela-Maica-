import sw from "../assets/img/image.png";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (uid, type) => {
    dispatch({
      type: 'remove_favorite',
      payload: { uid, type }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src={sw} 
            alt="Star Wars" 
            className="img-sw"
          />
        </Link>
        <div className="dropdown">
          <button 
            className="btn btn-primary dropdown-toggle btn-lg mx-5 me-5" 
            type="button" 
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites {store.favorites.length}
          </button>
          <ul className="dropdown-menu dropdown-menu-end mx-4 me-5">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">(empty)</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                  <Link 
                    to={`/${fav.type}/${fav.uid}`} 
                    className="text-decoration-none text-primary flex-grow-1"
                  >
                    {fav.name}
                  </Link>
                  <button 
                    className="btn btn-sm btn-link text-dark p-0 ms-2"
                    onClick={() => handleRemoveFavorite(fav.uid, fav.type)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};