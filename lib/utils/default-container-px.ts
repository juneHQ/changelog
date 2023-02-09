/**
 * Gets the default array of responsive values that's mainly used in section containers.
 *
 * @example <Container maxW="landingMax" px={defaultPx(32)} />
 * @param desktopValue value for desktop sizes
 * @returns array of responsive values
 */
export const defaultPx = (desktopValue: number | string | (string | number)[]) => {
  let newValues = [];
  if (typeof desktopValue === "string" || typeof desktopValue === "number") {
    newValues = [desktopValue];
  } else {
    newValues = desktopValue;
  }

  return [4, 4, 12, 12, ...newValues];
};
