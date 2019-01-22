import React, { Component } from "react";
import RepositoryInput from "./RepositoryInput/RepositoryInput";
import Header from "./Header/Header";
import DisplayPanels from "./DisplayPanels/DisplayPanels";
import styles from "./App.styles";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducers/reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={styles.page}>
          <Header />
          <RepositoryInput />
          <DisplayPanels reviewCommentsData={["data"]} />
        </div>
      </Provider>
    );
  }
}

export default App;
