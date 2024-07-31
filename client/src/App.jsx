import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import MainPage from "./pages/MainPage";
import Movies from "./pages/Movies";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import AllUsers from "./pages/AllUsers";
import EditUser from "./pages/EditUser";
import AddMovie from "./pages/AddMovie";
import AllMovies from "./pages/AllMovies";
import EditMovie from "./pages/EditMovie";
import AllMembers from "./pages/AllMembers";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";

const App = () => {
  const userFullName = sessionStorage.getItem("userFullName");
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="movies" element={<Movies />}>
            <Route path="all-movies" element={<AllMovies />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="edit-movie/:id" element={<EditMovie />} />
          </Route>
          <Route path="subscriptions" element={<Subscriptions />}>
            <Route path="all-members" element={<AllMembers />} />
            <Route path="add-member" element={<AddMember />} />
            <Route path="edit-member/:id" element={<EditMember />} />
          </Route>

          {userFullName === "Tal Shalev" && (
            <Route path="users" element={<Users />}>
              <Route path="all-users" element={<AllUsers />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="edit-user" element={<EditUser />} />
            </Route>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
