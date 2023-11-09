import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addUserAndEntries } from "@/utils/apiCalls";
import { AuthProps } from "@/types/types";


const RegistrationForm = ({ isAuthorized }: AuthProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [periodLength, setPeriodLength] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [error, setError] = useState<string>('');
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const router = useRouter();
 
  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    } 
  }, [isAuthorized, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (periodLength < 1) {
      e.preventDefault();
      setError('Please enter a number equal to or greater than 1');
      return;
    }
    e.preventDefault();
    setError('');
    setSubmissionLoading(true);
    await addUserAndEntries({name, birth_date: birthday, last_cycle_start: startDate, last_cycle_length: periodLength});
    router.push('/dashboard');
  }

  return (
    <div className="w-96 mx-auto mt-10 p-10 bg-white rounded-lg text-black">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Celestial Cycle!</h1>
      <h2>Since this is your first time registering with us, please answer the following questions so we can personalize your experience:</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-8">
          <label className="block">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Birthday</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Last period start date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Last period length</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
            required
          />
          {error && <p className="text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          disabled={submissionLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;