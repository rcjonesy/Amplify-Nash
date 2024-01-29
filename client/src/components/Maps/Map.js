import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const Map = () => {


    const mapStyles = {
        height: "100vh",
        width: "100%",
      };

      const defaultCenter = {
        lat: 36.15161,
        lng: -86.80422,
      };

      return (
        <LoadScript googleMapsApiKey="">
          <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      );

}