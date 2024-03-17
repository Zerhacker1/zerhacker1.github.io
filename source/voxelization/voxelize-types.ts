import { Color, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Vector3, Vector2, Mesh, InstancedMesh, CatmullRomCurve3, Euler, Object3DEventMap, Group } from "three";

export type VoxelParams = {
  resolution: number;
  boxFill: number;
};

export type GridCell = {
  materialIndex: number,
  
  portions: {
    color: Color,
    value: number,
  }[]
}

export type CellColor = {
  color: Color;
  position: Vector3;
}

export type MaterialWithColor = MeshBasicMaterial|MeshPhongMaterial|MeshStandardMaterial;


export type Triangle3 = {
  a: Vector3,
  b: Vector3,
  c: Vector3,
}

export type Triangle2 = {
  a: Vector2,
  b: Vector2,
  c: Vector2,
}

export type TextureData = {
  width: number,
  height: number,
  data: Uint8ClampedArray,
}

export type MeshVoxelizationCall = {
  mesh: Mesh;
  modelSize: number;
  materialIndex?: number;
  customGrid?: GridCell[][][];
  translateMesh?: boolean;
  fillGrid?:boolean;
  paintGrid?: boolean;
}

export type VoxelAnimatorParams = {
  meshes: InstancedMesh[];
  meshGrid: MeshReference[][][];
  gravity: number;
  curveSegments: number;
};

export type MeshReference = {
  meshIndex: number;
  instanceIndex: number;
};

export type ProgressCurveVariables = {
  tangent: Vector3,
  projectedTangent: Vector3;
  position: Vector3;
  upperBound: Vector3;
  lowerBound: Vector3;
  positionToLowerBound: Vector3;
  previousRotation: Euler;
  dummyMesh: Mesh;
}

export type AnimationBodyParams = {
  curve: CatmullRomCurve3;
  firstImpulse: Vector3;
  gravity: number;
  minVelocity: number;
  secondImpulse: Vector3;
  segments: number;
  stallPoint: number;
};

export type ModelDecayParams = VoxelParams & {
  segments: number;
  gravity: number;
  model: Group<Object3DEventMap>;
}