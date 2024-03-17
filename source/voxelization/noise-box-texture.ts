import { SimplexNoise, mkSimplexNoise } from "@spissvinkel/simplex-noise";
import Alea from "alea";
import { Box3, Vector3 } from "three"

export class NoiseBoxTexture {
  private extent: Box3;
  private seed: number;

  private noise: SimplexNoise;

  constructor(extent: Box3, seed: number) {
    this.extent = extent;
    this.seed = seed;

    this.noise = mkSimplexNoise(Alea(this.seed));
  }

  public getRandom(position: Vector3, w?: number) {
    const index = position.clone()
      .sub(this.extent.min)
      .divide(
        this.extent.max.clone().sub(this.extent.min)
      )

    if (w === undefined) {
      return this.noise.noise3D(
        index.x,
        index.y,
        index.z,
      );
    }

    return this.noise.noise4D(
      index.x, 
      index.y, 
      index.z, 
      w
    );
  }

  public setSeed(seed: number) {
    this.noise = mkSimplexNoise(Alea(seed));
  }
}