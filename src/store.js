export const initialStore = () => {
  return {
    favorites: [],
    people: [
      {
        uid: "1",
        name: "Padmé Amidala",
        type: "people",
        img: "https://vignette.wikia.nocookie.net/starwars/images/b/b2/Padmegreenscrshot.jpg"
      },
      {
        uid: "2",
        name: "Anakin Skywalker",
        type: "people",
        img: "https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png"
      }
    ],
    planets: [],
    vehicles: [
      {
        uid: "3",
        name: "Captain Panaka",
        type: "vehicles",
        img: "https://vignette.wikia.nocookie.net/starwars/images/7/72/PanakaHS-TPM.png"
      }
    ],
    loading: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_people':
      return {
        ...store,
        people: action.payload
      }
    case 'set_planets':
      return {
        ...store,
        planets: action.payload
      }
    case 'set_vehicles':
      return {
        ...store,
        vehicles: action.payload
      }
    case 'set_loading':
      return {
        ...store,
        loading: action.payload
      }
    case 'add_favorite':
      const exists = store.favorites.find(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      )
      if (exists) {
        return store
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      }
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      }
    default:
      return store
  }    
}
