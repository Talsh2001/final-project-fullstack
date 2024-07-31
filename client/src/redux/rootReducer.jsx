const initialState = {
  members: [],
  movies: [],
  subscriptions: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        members: action.payload.members,
        movies: action.payload.movies,
        subscriptions: action.payload.subscriptions,
      };

    case "REPLACE_MOVIES_FIND":
      return {
        ...state,
        movies: action.payload,
      };

    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };

    case "UPDATE_MOVIE": {
      const movies = [...state.movies];
      const index = movies.findIndex((movie) => movie._id === action.payload._id);
      if (index !== -1) {
        movies[index] = action.payload;
      }
      return { ...state, movies: movies };
    }

    case "DELETE_MOVIE": {
      const movies = state.movies.filter((movie) => movie._id !== action.payload);
      return { ...state, movies: movies };
    }

    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };

    case "UPDATE_MEMBER": {
      const members = [...state.members];
      const index = members.findIndex((member) => member._id === action.payload._id);
      if (index !== -1) {
        members[index] = action.payload;
      }
      return { ...state, members: members };
    }

    case "DELETE_MEMBER": {
      const members = state.members.filter((member) => member._id !== action.payload);
      return { ...state, members: members };
    }

    case "ADD_SUBSCRIPTION":
      return { ...state, subscriptions: [...state.subscriptions, action.payload] };

    case "UPDATE_SUBSCRIPTION_MOVIES": {
      const { subscriptionId, newMovies } = action.payload;

      const subscriptions = [...state.subscriptions];

      const index = subscriptions.findIndex((sub) => sub._id === subscriptionId);

      if (index !== -1) {
        subscriptions[index].movies = newMovies;
      }
      return { ...state, subscriptions: subscriptions };
    }

    case "DELETE_SUBSCRIPTION": {
      const subscriptions = state.subscriptions.filter(
        (subscription) => subscription._id !== action.payload
      );
      return { ...state, subscriptions: subscriptions };
    }

    default:
      return state;
  }
};

export default rootReducer;
