/**
 * A function returning a pseudo-random floating-point number in the interval [0, 1)
 */
export declare type PRNG = () => number;
/**
 * A simplex noise generator
 */
export interface SimplexNoise {
    noise2D: (x: number, y: number) => number;
    noise3D: (x: number, y: number, z: number) => number;
    noise4D: (x: number, y: number, z: number, w: number) => number;
}
/**
 * Initialize a new simplex noise generator using the provided PRNG
 *
 * @param random a PRNG function like `Math.random` or `AleaPRNG.random`
 * @returns an initialized simplex noise generator
 */
export declare const mkSimplexNoise: (random: PRNG) => SimplexNoise;
//# sourceMappingURL=index.d.ts.map