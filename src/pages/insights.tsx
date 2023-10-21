import React, { useEffect } from "react";
import getInsightsFromAI from "@/utils/openai";
import { GetServerSideProps } from "next";

const insights = {
  sign: "pisces",
  daysSinceLastPeriod: 10,
  flowLengthDays: 3,
  moonPhase: "waning gibbous",
  mood: "anxious",
  craving: "sweet",
  horoscope:
    "Trips will likely be mired in mechanical difficulties and delays of all types. You'll get to your destination eventually, but you're going to have to be patient. If you're heading to the airport, be sure to bring a book - a long one - to make the wait more bearable. If you're just heading across town, bring along your favorite music to keep your spirits up.",
};
const Insights = ({ results }: any) => {
  return <div>{results}</div>;
};

export default Insights;

export const getServerSideProps = async (context: any) => {
  const results = await getInsightsFromAI(insights);
  return {
    props: {
      results: results,
    },
  };
};
