import { useEffect, useState } from "react";
import { DashboardProps } from "./Dashboard";
import Router from "next/router";
import { postEntry } from "@/utils/apiCalls";

const RegistrationForm = ({isAuthorized, userID, data }: DashboardProps) => {
  const [startDate, setStartDate] = useState<string | number | readonly string[] | undefined>(undefined);
  const [periodLength, setPeriodLength] = useState<string | undefined>(undefined);
 
  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const entries = []
    for (let i=0; i < parseInt(periodLength as string); i++){
      const newDate = new Date(startDate as string);
      newDate.setDate(newDate.getDate() + (i+1));
      entries.push(postEntry(Router.asPath.includes('demo'), 'addEntry', {
        flow: "Medium",
        craving: null,
        mood: null,
        symptom: null,
        user_id: data ? data[0].passage_user_id : '',
        date: `${new Date(newDate).getFullYear()}-${new Date(newDate).getMonth() + 1}-${new Date(newDate).getDate()}`
      }))
      }
      try {
        const result = await Promise.all(entries)
        console.log(result)
        Router.push("/dashboard");
      }
      catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="w-80 mx-auto mt-10 p-10 bg-white rounded-lg text-black">
      <h1 className="text-2xl font-semibold mb-4">Welcome {data && data[0].name}!</h1>
      <h2>Since this is your first time registering with us, please answer the following questions so we can personalize your experience:</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-10">
          <label className="block">When did your last period start?</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">How many days did it last?</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600"
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