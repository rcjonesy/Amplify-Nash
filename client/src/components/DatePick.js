export const DatePick = ({ concert, datePick }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in the format YYYY-MM-DD for setting min calendar date
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-600 font-semibold">Date</label>
      <input
        type="date"
        className="mt-1 p-2 w-full border rounded-lg"
        placeholder="Select Date"
        value={concert?.date ? concert.date.split("T")[0] : ""}
        onChange={datePick}
        min={today} // Set the minimum allowed date to today
      />
    </div>
  );
};
