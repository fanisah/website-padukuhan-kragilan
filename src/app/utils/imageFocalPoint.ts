export type ImageFocalPoint = {
  x: number;
  y: number;
};

function legacyPosition(position?: string | null): ImageFocalPoint {
  switch (position) {
    case "top":
      return { x: 50, y: 0 };
    case "bottom":
      return { x: 50, y: 100 };
    case "left":
      return { x: 0, y: 50 };
    case "right":
      return { x: 100, y: 50 };
    default:
      return { x: 50, y: 50 };
  }
}

function normalizeAxis(value: number | null | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(100, Math.max(0, value));
}

export function normalizeImagePosition(
  positionX?: number | null,
  positionY?: number | null,
  legacy?: string | null,
): ImageFocalPoint {
  const fallback = legacyPosition(legacy);
  return {
    x: normalizeAxis(positionX, fallback.x),
    y: normalizeAxis(positionY, fallback.y),
  };
}

export function getObjectPositionStyle(
  positionX?: number | null,
  positionY?: number | null,
  legacy?: string | null,
) {
  const { x, y } = normalizeImagePosition(positionX, positionY, legacy);
  return { objectPosition: `${x}% ${y}%` };
}
