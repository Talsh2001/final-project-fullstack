import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import rootReducer from "./redux/rootReducer.jsx";

const store = createStore(rootReducer);

const theme = createTheme({
  palette: {
    primary: {
      main: "#4168F5",
    },
    text: {
      primary: "#D1DBFF",
    },
    background: {
      default: "#222222",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
