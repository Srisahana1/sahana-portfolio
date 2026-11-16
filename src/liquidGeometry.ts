export type LiquidConnection = { from: readonly number[]; control: readonly number[]; to: readonly number[] };

// Gentle, deterministic quadratic geometry shared by Canvas and the SVG fallback.
export function liquidConnection(from: readonly number[], to: readonly number[], index: number): LiquidConnection {
  const bend = (index % 2 ? 1 : -1) * .1;
  return { from, to, control: [(from[0] + to[0]) / 2 - (to[1] - from[1]) * bend, (from[1] + to[1]) / 2 + (to[0] - from[0]) * bend] };
}

export function pointOnConnection({ from, control, to }: LiquidConnection, t: number) {
  const inverse = 1 - t;
  return [inverse * inverse * from[0] + 2 * inverse * t * control[0] + t * t * to[0], inverse * inverse * from[1] + 2 * inverse * t * control[1] + t * t * to[1]];
}

export function connectionPath({ from, control, to }: LiquidConnection) {
  return `M${from[0]} ${from[1]} Q${control[0]} ${control[1]} ${to[0]} ${to[1]}`;
}
