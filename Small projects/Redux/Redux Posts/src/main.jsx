import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store";
import {Provider} from "react-redux";
import {fetchUsers} from "./features/users/usersSlice.js";
import { fetchPosts } from './features/posts/postsSlice.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route path = "/*" element = {<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
)
