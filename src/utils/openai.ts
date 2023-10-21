import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Role = "system" | "user";
type InsightInputs = {
  sign: string;
  daysSinceLastPeriod: number;
  flowLengthDays: number;
  moonPhase: string;
  mood: string;
  craving: string;
  horoscope: string;
};

const systemRole: Role = "system";
const userRole: Role = "user";

export default async function getInsightsFromAI(inputs: InsightInputs) {
  const cravingStringMap: Record<string, string> = {
    salty: "salty foods",
    sweet: "sweet foods",
    nicotine: "nicotine",
    chocolate: "chocolate",
    dairy: "dairy",
    alcohol: "alcohol",
    fats: "fatty foods",
    carbs: "carbohydrates",
    protein: "protein",
    fried: "fried foods",
    sour: "sour foods",
  };
  const chatHistory = [
    {
      role: systemRole,
      content:
        "You are a witchy alternative healthcare practitioner well-versed in menstruation, deciphering zodiac signs and horoscopes, the effect of the moon and its phases on humanity from emotions, health, wealth, relationships, etc, and the interaction of menstruation, zodiac signs, horoscopes, and the moon.",
    },
    {
      role: systemRole,
      content: `When referring to menstrual phases, use these exact phrases:
        * menstruation
        * follicular phase
        * ovulation
        * luteal phase
      `,
    },
    {
      role: userRole,
      content: `My zodiac star sign is ${inputs.sign}. It has been ${
        inputs.daysSinceLastPeriod
      } since my last period began. My flow lasted for ${
        inputs.flowLengthDays
      } days. The current moon phase is ${
        inputs.moonPhase
      }. Currently, my mood is ${inputs.mood}. I am currently craving ${
        cravingStringMap[inputs.craving]
      }. My horoscope today is:
  ${inputs.horoscope}.`,
    },
    {
      role: userRole,
      content: `Please write one paragraph (max 3 sentences) that says what my current menstrual phase is, and how my menstrual cycle, zodiac sign, horoscope, and the moon will affect me through my mood, energy, relationships, etc. Also provide a suggestion for how I should spend my day.
      
      Begin your answer with something like:
  
      'By the moon's gentle guidance, it appears you may be in the [phase] phase of your menstrual cycle [...]'`,
    },
    // {
    //   role: "assistant",
    //   content:
    //     "Under the moon's gentle sway, it seems you may be in the follicular phase of your menstrual cycle, which follows menstruation. The waning gibbous moon phase aligns with this phase, representing a time of release and letting go. These cosmic energies may contribute to your happy mood and heightened social interactions. However, there might be a tendency to be more influenced by the words and opinions of others, so be cautious of gossip and misinformation. To align with your cycle and the moon's energy, it is recommended to spend some time alone in reflection and introspection today. Engage in activities that promote self-care, such as journaling, meditation, or a soothing bath. Listening to your inner voice will help you stay grounded and discern truth from fiction.",
    // },
    // {
    //   role: userRole,
    //   content: `That was a great example. Now for real, please write one paragraph (max 5 sentences) that says what my current menstrual phase is, and how my cycle and the moon will affect my mood. Also provide a suggestion for how I should spend my day.

    //     Begin your answer with something like:

    //     By the moon's gentle guidance, it appears you may be in the follicular phase of your menstrual cycle [...]`,
    // },
  ];
  const chatCompletion = await openai.chat.completions.create({
    messages: chatHistory,
    model: "gpt-3.5-turbo",
  });
  const response = chatCompletion.choices[0].message;
  console.log(response);
}
