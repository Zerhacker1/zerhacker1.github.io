import { Color, Vector3 } from "three";
import { Stack } from "../Stack";
import { GridCell, MaterialWithColor, VoxelParams } from "./voxelize-types";

export abstract class Voxelizer {
  private readonly outSideCell: GridCell = {
    materialIndex: -1,
    portions: [],    
  }


  protected parameters: VoxelParams;
  protected grid!: GridCell[][][];
  protected materialGrid: (MaterialWithColor|null)[][][] = [];
  constructor(parameters: VoxelParams) {
    this.parameters = parameters;
  }

  public setResolution(resolution: number) : void {
    this.parameters.resolution = Math.ceil(resolution);
  }

  public setBoxFill(boxFill: number) : void {
    this.parameters.boxFill = boxFill;
  }

  public setParameters(parameters: VoxelParams) : void{
    this.parameters = parameters;
  }

  public getParameters() : VoxelParams {
    return this.parameters;
  }

  protected floodGrid() {
    const neighborKernel = [
      new Vector3(0, 0, -1),
      new Vector3(0, 0, 1),
      new Vector3(0, -1, 0),
      new Vector3(0, 1, 0),
      new Vector3(-1, 0, 0),
      new Vector3(1, 0, 0),
    ];
  
    const floodingPoints = new Stack<Vector3>()
  
    const source = new Vector3(this.grid[0][0].length-1, this.grid[0].length-1, this.grid.length-1);
    floodingPoints.push(source);
    this.setGridAt(source, this.outSideCell);
    while(!floodingPoints.empty()) {
      const point = floodingPoints.pop()!;
  
      for (const offset of neighborKernel) {
        const offsetedPoint = point.clone().add(offset);
        if (this.pointInGrid(offsetedPoint) && this.getGridAt(offsetedPoint).materialIndex === 0) {
          this.setGridAt(offsetedPoint, this.outSideCell);
          floodingPoints.push(offsetedPoint);
        }
      }
    }
  }

  protected fitGrid(size: Vector3): number {
    const biggestDimension = Math.max(size.x, size.y, size.z);

    const dimensionFactor = this.parameters.resolution/biggestDimension;

    this.grid = Array.from(
      {length: Math.ceil(size.z*dimensionFactor)+2},
      () => Array.from(
        {length: Math.ceil(size.y*dimensionFactor)+2},
        () => {
          const length = Math.ceil(size.x*dimensionFactor)+2;
          const arr = [];
          for (let i = 0; i < length; ++i) {
            arr.push({
              materialIndex: 0,
              portions: []
            });
          }
          return arr;
        }
      )
    );

    this.materialGrid = Array.from(
      {length: Math.ceil(size.z*dimensionFactor)+2},
      () => Array.from(
        {length: Math.ceil(size.y*dimensionFactor)+2},
        () => {
          const length = Math.ceil(size.x*dimensionFactor)+2;
          const arr = [];
          for (let i = 0; i < length; ++i) {
            arr.push(null);
          }
          return arr;
        }
      )
    );

    return biggestDimension;
  }

  protected getCellColor(cellValue: GridCell) {
    let weightSum = 0;
    for (const portion of cellValue.portions) {
      weightSum += portion.value;
    }
    const color = new Color(0, 0, 0);
    for (const portion of cellValue.portions) {
      const portionColor = portion.color;
      color.add(portionColor.clone().multiplyScalar(portion.value/weightSum));
    }
    return color;
  }

  protected pointInGrid(v: Vector3): boolean {
    return v.z >= 0 && v.z < this.grid.length
      && v.y >= 0 && v.y < this.grid[v.z].length
      && v.x >= 0 && v.x < this.grid[v.z][v.y].length;
  }

  protected updateGridAt(position: Vector3, value: GridCell, offset = false) {
    const indexOffset = offset ? 1:0;
    this.grid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset].materialIndex = value.materialIndex;
    this.grid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset].portions.push(...value.portions);
  }

  protected setGridAt(position: Vector3, value: GridCell, offset = false): void {
    const indexOffset = offset ? 1:0;
    this.grid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset] = value;
  }

  protected getGridAt(position: Vector3, offset = false): GridCell {
    const indexOffset = offset ? 1:0;
    return this.grid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset];
  }

  protected setMaterialGridAt(position: Vector3, value: MaterialWithColor, offset = false) {
    const indexOffset = offset ? 1:0;
    this.materialGrid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset] = value;
  }

  protected getMaterialAt(position: Vector3, offset = false) {
    const indexOffset = offset ? 1:0;
    return this.materialGrid[position.z+indexOffset][position.y+indexOffset][position.x+indexOffset];
  }

  protected vectorToString(vector: Vector3): string {
    return `${vector.x},${vector.y},${vector.z}`;
  }
}