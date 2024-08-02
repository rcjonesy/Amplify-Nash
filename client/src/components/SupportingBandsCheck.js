import { getSupportingBands } from "../managers/BandManager";
import { useState, useEffect } from "react";

export const SupportingBandsCheck = ({ handleSupporting, concert }) => {
  const [supporting, setSupporting] = useState([]);
  useEffect(() => {
    getSupportingBands().then(setSupporting);
  }, []);

  return (
    <div className="mb-4">
      <label className="text-black font-semibold flex items-center space-x-2 mb-3">
        Supporting Bands
      </label>
      <div>
        {supporting.map((band) => (
          <label
            key={band.id}
            className="flex items-center cursor-pointer transition-all duration-300 hover:bg-gray-100 rounded-md p-1">
            <input
              type="checkbox"
              name="supportingBands"
              value={band.id}
              className="mr-2 cursor-pointer"
              onChange={handleSupporting}
              {...(concert && {
                checked: concert.bandConcerts?.some((bc) => bc.bandId === band.id),
              })}
            />
            {band.name}
          </label>
        ))}
      </div>
    </div>
  );
};
