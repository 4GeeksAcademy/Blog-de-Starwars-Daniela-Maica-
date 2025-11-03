import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import localImg from "../assets/img/400x200.png";

export const EntityCard = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const getImageUrl = (uid, type) => {
    const typeMap = {
      people: "characters",
      planets: "planets",
      vehicles: "vehicles",
    };
    return `https://starwars-visualguide.com/assets/img/${typeMap[type]}/${uid}.jpg`;
  };

  const isFavorite = () => {
    return store.favorites.some(
      (fav) => fav.uid === item.uid && fav.type === type
    );
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite()) {
      dispatch({
        type: "remove_favorite",
        payload: { uid: item.uid, type },
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { uid: item.uid, name: item.name, type },
      });
    }
  };

  const handleImageError = (e) => {
    (e.target.src = localImg)
  };

  return (
    <div className="entity-card-wrapper mb-4">
      <div className="card">
        <div style={{ position: "relative" }}>
          <img
            src={getImageUrl(item.uid, type) || localImg}
            className="card-img-top"
            alt={item.name}
            onError={handleImageError}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text text-muted">
            {type === "people" && (
              <>
                <strong>Gender:</strong> {item.gender || "n/a"} <br />
                <strong>Hair Color:</strong> {item.hair_color || "n/a"} <br />
                <strong>Eye-Color:</strong> {item.eye_color || "n/a"}
              </>
            )}
            {type === "planets" && `Population: ${item.population || "n/a"}`}
            {type === "vehicles" && `Model: ${item.model || "n/a"}`}
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Link
              to={`/${type}/${item.uid}`}
              className="btn btn-outline-primary me-5 "
            >
              Learn more!
            </Link>

            <button
              className={`favorite-btn ${isFavorite() ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              <i
                className={`fa-${
                  isFavorite() ? "solid" : "regular"
                } fa-heart yellow`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
