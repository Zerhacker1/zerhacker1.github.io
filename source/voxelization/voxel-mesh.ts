import { Vector3, Vector2, BufferAttribute, } from "three";
import { MaterialWithColor, MeshVoxelizationCall, TextureData, VoxelParams } from "./voxelize-types";
import { VoxelTriangle } from "./voxel-triangle";
import { Voxelizer } from "./voxel";

export class VoxelMesh extends Voxelizer{
  constructor(parameters: VoxelParams) {
    super(parameters);
  }

  public voxelizeMesh({
    mesh,
    materialIndex,
    customGrid,
    modelSize,
    translateMesh,
    fillGrid,
    paintGrid,
  } : MeshVoxelizationCall
  ) {
    if (customGrid) {
      this.grid = customGrid;
    }
    materialIndex = materialIndex === undefined ? 0:materialIndex;  

    const gridSize = modelSize/this.parameters.resolution;

    const index = mesh.geometry.getIndex()!;
    const positionAttribute = mesh.geometry.getAttribute('position');
    let uvMapping = mesh.geometry.getAttribute('uv');
    const material = (mesh.material as MaterialWithColor);
    let texture = material.map;
    let textureData: TextureData = {width: 0, height: 0, data: new Uint8ClampedArray()};
    if (!texture) {
      uvMapping = new BufferAttribute(
        this.createCustomUvMapping(index.count),
        2,
      );
      textureData = {
        width: index.count,
        height: 1,
        data: this.createCustomImageData(index.count, material),
      }
    } else {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      if (texture) {
        canvas.width = texture?.image.width;
        canvas.height = texture?.image.height;
        context.drawImage(texture?.image, 0, 0);
      } 
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height,);
      textureData = {width: canvas.width, height: canvas.height, data: imageData.data};
    }

    const triangleVoxelizer = new VoxelTriangle(this.parameters); 
    //times two to fullfill the Shannon Nyquist Theorem
    const unitSize = gridSize * .5;
    for (let i = 0; i < index.count; i+=3) {
      const p0 = new Vector3(
        positionAttribute.getX(index.array[i]),
        positionAttribute.getY(index.array[i]),
        positionAttribute.getZ(index.array[i]),
      );
      const p1 = new Vector3(
        positionAttribute.getX(index.array[i+1]),
        positionAttribute.getY(index.array[i+1]),
        positionAttribute.getZ(index.array[i+1]),
      );
      const p2 = new Vector3(
        positionAttribute.getX(index.array[i+2]),
        positionAttribute.getY(index.array[i+2]),
        positionAttribute.getZ(index.array[i+2]),
      );

      const uv0 = new Vector2(
        uvMapping.getX(index.array[i]),
        uvMapping.getY(index.array[i]),
      );
      const uv1 = new Vector2(
        uvMapping.getX(index.array[i+1]),
        uvMapping.getY(index.array[i+1]),
      );
      const uv2 = new Vector2(
        uvMapping.getX(index.array[i+2]),
        uvMapping.getY(index.array[i+2]),
      );
      
      triangleVoxelizer.voxelizeTriangle(
        {a: p0, b: p1, c: p2},
        {a: uv0, b: uv1, c: uv2},
        textureData,
        unitSize,
        gridSize,
        materialIndex,
        this.grid,
      );
    }
  }

  private createCustomUvMapping(length: number) : Float32Array {
    const uvMapping = new Float32Array(2*length);
    for (let i = 0; i < length; ++i) {
      uvMapping[2*i] = i/length;
      uvMapping[2*i+1] = 0;
    }
    return uvMapping;
  }

  private createCustomImageData(length: number, material: MaterialWithColor): Uint8ClampedArray {
    const imageData = new Uint8ClampedArray(length*4);
    const imageColor = material.color;
    for (let i = 0; i < length; ++i) {
      imageData[4*i] = Math.floor(Math.pow(imageColor.r, 1/2.2) * 255);
      imageData[4*i+1] = Math.floor(Math.pow(imageColor.g, 1/2.2) * 255);
      imageData[4*i+2] = Math.floor(Math.pow(imageColor.b, 1/2.2) * 255);
      imageData[4*i+3] = 255;
    }
    return imageData;
  } 
}