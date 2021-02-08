import React, { useState, useContext, useReducer, useMemo, useRef, useCallback } from "react";
import ThemeContext from "../context/ThemeContext";
import Search from "../components/Search";
import useCharacters from "../hooks/useCharacters";

const initialState = {
  favoritesarray: [],
};

const API = "https://rickandmortyapi.com/api/character/";

//Usando reducer se van a agregar las cartas seleccionadas a los favoritos
//El dispatch transmite la informacion al estado
const favoriteReducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      let favoriteexist = state.favoritesarray.filter((user) => user.id === action.payload.id);
      if (favoriteexist.length > 0) {
        return state;
      } else {
        return {
          ...state,
          favoritesarray: [...state.favoritesarray, action.payload],
        };
      }
    default:
      return state;
  }
};

const Characters = (params) => {
  //This line was moved to a new component
  //const [characters, setcharacters] = useState([]);
  const [theme, settheme] = useContext(ThemeContext);
  //Creates the hook to the reducer
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const characters = useCharacters(API);

  const [search, setsearch] = useState("");
  const searchInput = useRef(null);

  //This uas moved to a new component
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character/")
  //     .then((response) => response.json())
  //     .then((data) => setcharacters(data.results));
  // }, []);

  //Calls the reduce dispatch
  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // const handleSearch = (event) => {
  //   setsearch(event.target.value);
  // };

  // //Se reemplaza la funcion para usar el useRef, mas facil en el uso de los formularios
  // const handleSearch = () => {
  //   setsearch(searchInput.current.value);
  // };

  //Se vuelve a reemplazar para usar usecallback
  const handleSearch = useCallback(() => {
    setsearch(searchInput.current.value);
  }, []);

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    // <div className={params.mode ? "Characters light" : "Characters dark"}>
    <div>
      <h3>My Favorites</h3>
      {favorites.favoritesarray.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
      <hr />
      <h3>Full List</h3>
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
      <div className={`Characters ${theme}`}>
        {filteredUsers.map((character) => (
          <div key={character.id} className="Cards">
            <div className="flip-card-inner">
              {/* <div className={params.mode ? " light flip-card-front" : "dark flip-card-front"}> */}
              <div className={`flip-card-front ${theme}`}>
                <h2>{character.name}</h2>
                <div className="parent">
                  <div className="clip" style={{ backgroundImage: `url(${character.image})` }}></div>
                  <div className="image" style={{ backgroundImage: `url(${character.image})` }}></div>
                </div>
                <p>
                  <b>Species:</b>
                  {character.species}
                </p>
              </div>
              {/* <div className={params.mode ? "light flip-card-back" : " dark flip-card-back"}> */}
              <div className={`flip-card-back ${theme}`}>
                <b>Origin: </b>
                <p>{character.origin.name}</p>
                <b>Location: </b>
                <p>{character.location.name}</p>
                <p>
                  <b>Created: </b>
                  {character.created}
                </p>
                <button type="button" onClick={() => handleClick(character)}>
                  Make Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
