import { useState } from "react";


const RegistrationForm = () => {
  const [startDate, setStartDate] = useState('');
  const [periodLength, setPeriodLength] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can use startDate and periodLength for further processing
    console.log('Start Date:', startDate);
    console.log('Period Length:', periodLength);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome user? !</h1>
      <h2>Since this is your first time registering with us, please answer the following questions so we can personalize your experience:</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">When did your last period start?</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">How many days did it last?</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={periodLength}
            onChange={(e) => setPeriodLength(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm