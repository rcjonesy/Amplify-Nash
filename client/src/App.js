import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import ApplicationViews from "./components/ApplicationViews";

function App() {

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    //imports a function tryGetLoggedInUser from the authManager module.
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);
  console.log(loggedInUser)
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