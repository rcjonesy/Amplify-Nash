import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getAllVenues } from "../../managers/VenueManager";

export const BigMap = () => {
  // State variables
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [venues, setVenues] = useState([]);
  const [locations, setLocations] = useState([]);

  // loadscript handles the loading and initialization of the Google Maps API script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAUMvI4uF4jefMqmUDfUyT5BmN_qkrg5hs",
  });

  const handleVenues = () => {
    getAllVenues().then(setVenues);
  };

  useEffect(() => {
    handleVenues();
  }, []);

  // Perform geocoding when Google Maps API is loaded or venue data changes
  useEffect(() => {
    if (isLoaded) {
      geocodeAllVenues();
    }
  }, [isLoaded, venues]);

  // Map styling
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  // Function to geocode a single venue and return a promise
  const geocodeVenue = (venue) => {
    return new Promise((resolve) => {
      //creates new instance of google maps geocoder to convert addresses to lat long
      const geocoder = new window.google.maps.Geocoder();
      //  calls the geocode method of the Geocoder
      geocoder.geocode({ address: venue.address }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          // extracting references to these functions, and later, when you use them like lat() and lng(), you're actually calling these functions to obtain the numeric values of latitude and longitude.

          const { lat, lng } = results[0].geometry.location;

          resolve({ lat: lat(), lng: lng(), name: venue.name });
        } else {
          resolve(null);
        }
      });
    });
  };

  //  geocoding all venues in the venues array and then calculating the average latitude and longitude for setting the center of the map.
  const geocodeAllVenues = async () => {
    //empty array to store the geocoded locations of all venues.
    const allVenues = [];

    // Map over venues and geocode each venue
    for (const venue of venues) {
      const location = await geocodeVenue(venue);
      if (location !== null) {
        allVenues.push(location);
      }
    }
    //allVenues not contains geocoded location of all the venues
    if (allVenues.length > 0) {
      // Calculate average latitude and longitude for map center
      const avgLat =
        allVenues.reduce((sum, loc) => sum + loc.lat, 0) / allVenues.length;
      const avgLng =
        allVenues.reduce((sum, loc) => sum + loc.lng, 0) / allVenues.length;
      // Set map center and locations
      setCenter({ lat: avgLat, lng: avgLng });
      //Sets the locations state variable to the array of geocoded locations.
      setLocations(allVenues);
    } else {
      // Set default center and empty locations array if there are no valid locations
      setCenter({ lat: 0, lng: 0 });
      setLocations([]);
    }
  };

  // Error handling for Google Maps API loading
  if (loadError) {
    return <div>Error loading Google Maps: {loadError}</div>;
  }

  // Loading indicator while Google Maps API is loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Render Google Map with markers for each location
  return (
    <div>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} title={location.name} />
        ))}
      </GoogleMap>
    </div>
  );
};
