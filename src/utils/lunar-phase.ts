import { Moon } from "lunarphase-js";

export function getCurrentLunarPhase(date: Date) {
  const phase = Moon.lunarPhase(date);
  const phaseEmoji = Moon.lunarPhaseEmoji(date);
  return {
    emoji: phaseEmoji,
    description: phase,
  };
}
