import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import ApplicationViews from "./components/ApplicationViews";
import { getAllConcerts } from "./managers/ConcertManager";
import { getAllVenues } from "./managers/VenueManager";
import { getAllBandsWithMembers } from "./managers/BandManager";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [concerts, setConcerts] = useState();
  const [venues, setVenues] = useState();
  const [bands, setAllBands] = useState()

  useEffect(() => {
    handleGetConcerts();
    handleVenues();
    getBands()
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  const handleVenues = () => {
    getAllVenues().then(setVenues);
  };
 
  const getBands = () => {
    getAllBandsWithMembers().then(setAllBands)
  }

  const handleGetConcerts = () => {
    getAllConcerts().then(setConcerts);
  };

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        concerts={concerts}
        venues={venues}
        handleVenues={handleVenues}
        handleGetConcerts={handleGetConcerts}
        getBands={getBands}
        bands={bands}
      />
      <Footer />
    </>
  );
}

export default App;

// loggedInUser: This variable holds the current state of whether a user is logged in or not.
// It's primarily used for conditional rendering within the components.

// setLoggedInUser: This function is responsible for updating the loggedInUser state.
// It's passed down to child components so that they can update the parent's state when certain events occur, such as a user logging in or out.
