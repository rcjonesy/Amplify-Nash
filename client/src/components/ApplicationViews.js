import { Route, Routes } from "react-router-dom";
import { Home } from "./Concert/Home";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ConcertUpdate } from "./Concert/ConcertUpdate";
import { VenueList } from "./Venues/VenueList";
import { BookConcert } from "./Concert/BookConcert";





export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="concert/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ConcertUpdate />
            </AuthorizedRoute>
          }
        />
        {/* <Route
          path="/concert/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ConcertUpdate />
            </AuthorizedRoute>
          }
        /> */}
        <Route
          path="/venues"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <VenueList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/newconcert"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <BookConcert />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
