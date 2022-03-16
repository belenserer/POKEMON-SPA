import {
    GET_POKEMONS,
    GET_DETAIL,
    GET_TYPES,
    FILTER_BY_TYPE,
    FILTER_CREATED,
    SORT,
    RESET,
    SEARCH_BY_NAME,
    CLEAR_DETAIL
} from '../actions'

const initialState = {
    allPokemons: [],
    sort: "",
    createdFilter: "all",
    typeFilter: "all",
    allTypes: [],
    detail: undefined,
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          allPokemons: action.payload,
        };

        case RESET: 
        return {
          ...state,
          sort: "",
          createdFilter: "all",
          typeFilter: "all",
        };

      case GET_TYPES:
        return {
          ...state,
          allTypes: action.payload,
        };

      case FILTER_BY_TYPE:
        return {
          ...state,
          typeFilter: action.payload
        }

      case FILTER_CREATED:
        return {
          ...state,
          createdFilter: action.payload
        }
  
      case SORT:
        return {
          ...state,
          sort: action.payload
        }
  
      case SEARCH_BY_NAME:
        return {
          ...state,
          allPokemons: action.payload,
        };
  
      case GET_DETAIL:
        return {
          ...state,
          detail: action.payload,
        };
  
      case CLEAR_DETAIL:
        return {
          ...state,
          detail: undefined,
        };
  
      default:
        return state;
    }
  }

  
  export default rootReducer;
