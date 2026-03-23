/**
 * Increments a counter.
 * @param count The actual number.
 * @returns The number incremented.
 */
export const increment = (count: number, step: number = 1) => {
  return (count += step);
};

/**
 * Decrements a counter.
 * @param count The actual number.
 * @returns The number decremented.
 */
export const decrement = (count: number, step: number = 1) => {
  return (count -= step);
};
