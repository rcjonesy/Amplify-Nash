export const TimePick = ({ concert, concertTime }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold">Time</label>
      <input
        type="text"
        name="time"
        className="mt-1 p-2 w-full border rounded-lg appearance-auto"
        placeholder="Enter Time"
        value={concert?.time}
        onChange={concertTime}
      />
    </div>
  );
};
