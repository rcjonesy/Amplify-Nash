import { getHeadliningBands } from "../managers/BandManager";
import { useState, useEffect } from "react";

export const HeadliningBandDropdown = ({ headlinerSelect, concert }) => {
  const [headliners, setHeadliners] = useState([]);
  useEffect(() => {
    getHeadliningBands().then(setHeadliners);
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold">
        Headlining Band
      </label>
      <select
        name="headliningBand"
        className="mt-1 p-2  border rounded-lg"
        placeholder="Select Headlining Band"
        value={
          concert?.bandConcerts?.find((bc) => bc.band?.isHeadliner)?.bandId
        }
        onChange={headlinerSelect}>
        <option value="0">Choose a band</option>
        {headliners.map((headliner) => (
          <option key={headliner.id} value={headliner.id}>
            {headliner.name}
          </option>
        ))}
      </select>
    </div>
  );
};
