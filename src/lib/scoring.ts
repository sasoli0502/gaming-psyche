import { AxisScores, GamerType, AxisDirection } from "./types";

export const INITIAL_SCORES: AxisScores = {
  aggression: 0,
  altruism: 0,
  cooperation: 0,
  intuition: 0,
  mastery: 0,
};

export function addScores(current: AxisScores, delta: AxisScores): AxisScores {
  return {
    aggression: current.aggression + delta.aggression,
    altruism: current.altruism + delta.altruism,
    cooperation: current.cooperation + delta.cooperation,
    intuition: current.intuition + delta.intuition,
    mastery: current.mastery + delta.mastery,
  };
}

export function resolveTypeId(scores: AxisScores): string {
  const axes: (keyof AxisScores)[] = [
    "aggression",
    "altruism",
    "cooperation",
    "intuition",
    "mastery",
  ];

  return axes.map((axis) => (scores[axis] >= 0 ? "H" : "L")).join("");
}

export function getAxisDirections(
  scores: AxisScores
): Record<keyof AxisScores, AxisDirection> {
  return {
    aggression: scores.aggression >= 0 ? "high" : "low",
    altruism: scores.altruism >= 0 ? "high" : "low",
    cooperation: scores.cooperation >= 0 ? "high" : "low",
    intuition: scores.intuition >= 0 ? "high" : "low",
    mastery: scores.mastery >= 0 ? "high" : "low",
  };
}

export function findType(
  types: GamerType[],
  scores: AxisScores
): GamerType | undefined {
  const directions = getAxisDirections(scores);

  return types.find(
    (t) =>
      t.axes.aggression === directions.aggression &&
      t.axes.altruism === directions.altruism &&
      t.axes.cooperation === directions.cooperation &&
      t.axes.intuition === directions.intuition &&
      t.axes.mastery === directions.mastery
  );
}

export function normalizeScores(
  scores: AxisScores,
  questionCount: number
): AxisScores {
  // Normalize to -100 to +100 range based on max possible score per axis
  // Assuming max score per question per axis is ~20, max total = questionCount * 20
  const maxPossible = questionCount * 15; // average max contribution
  const normalize = (val: number) =>
    Math.max(-100, Math.min(100, Math.round((val / maxPossible) * 100)));

  return {
    aggression: normalize(scores.aggression),
    altruism: normalize(scores.altruism),
    cooperation: normalize(scores.cooperation),
    intuition: normalize(scores.intuition),
    mastery: normalize(scores.mastery),
  };
}
