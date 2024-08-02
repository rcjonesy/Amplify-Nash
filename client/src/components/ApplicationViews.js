import { Route, Routes } from "react-router-dom";
import { Home } from "./Concert/Home";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ConcertUpdate } from "./Concert/ConcertUpdate";
import { VenueList } from "./Venues/VenueList";
import { BookConcert } from "./Concert/BookConcert";
import { AllBands } from "./Bands/AllBands";
import { AddBand } from "./Bands/AddBand";
import { BigMap } from "./Venues/Map";

export default function ApplicationViews({
  loggedInUser,
  setLoggedInUser,
  concerts,
  venues,
  handleVenues,
  handleGetConcerts,
  getBands,
  bands
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Home
              loggedInUser={loggedInUser}
              concerts={concerts}
              handleGetConcerts={handleGetConcerts}
            />
          </AuthorizedRoute>
        }
      />
      <Route
        path="concert/:id"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <ConcertUpdate handleGetConcerts={handleGetConcerts} />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/venues"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <VenueList venues={venues} handleVenues={handleVenues} />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/newconcert"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <BookConcert
              concerts={concerts}
              handleGetConcerts={handleGetConcerts}
            />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/bands/*"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <AllBands getBands={getBands} bands={bands} />
          </AuthorizedRoute>
        }
      />
      <Route
        path="/addband"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <AddBand />
          </AuthorizedRoute>
        }
      />

      <Route
        path="/bigmap"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <BigMap />
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
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
