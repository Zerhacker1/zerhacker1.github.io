import { Box3, CatmullRomCurve3, Color, Euler, InstancedMesh, Matrix4, Mesh, Quaternion, Vector3 } from "three";
import { ProgressCurveVariables, VoxelAnimatorParams } from "./voxelize-types";
import { NoiseBoxTexture } from "./noise-box-texture";
import { AnimationBody } from "./animation-body";
// flat cubes, (height mapping), object overlay, (object detection), shrinking
// presentation outline
export class VoxelAnimator {
  private parameters: VoxelAnimatorParams;

  private tempVariables: ProgressCurveVariables = {
    projectedTangent: new Vector3(),
    position: new Vector3(),
    tangent: new Vector3(),
    upperBound: new Vector3(),
    lowerBound: new Vector3(),
    positionToLowerBound: new Vector3(),
    previousRotation: new Euler(),
    dummyMesh: new Mesh(),
  };

  private bodies: AnimationBody[][];

  private relativeGravity: number;

  private boxNoise: Euler;
  private floorNoise: Euler;
  private noiseTexture: NoiseBoxTexture;
  private RNG: () => number;

  constructor(params: VoxelAnimatorParams) {
    this.parameters = params;

    params.meshes[0].geometry.computeBoundingBox();
    const voxelBoundingBox = params.meshes[0].geometry.boundingBox!;
    const dummyMatrix = new Matrix4();
    const maxY = Math.max(...params.meshes.map((instancedMesh) => {
      let maxY = -Infinity;
      for (let i = 0; i < instancedMesh.count; ++i) {
        instancedMesh.getMatrixAt(i, dummyMatrix);
        //matrix[14] is the y position
        maxY = Math.max(dummyMatrix.elements[14] + voxelBoundingBox.max.y, maxY);
      }
      return maxY;
    }));

    this.relativeGravity = params.gravity / maxY;

    this.RNG = splitmix32(Math.random());

    this.boxNoise = new Euler(10*Math.PI/180, 10*Math.PI/180, 10*Math.PI/180);
    this.floorNoise = new Euler(10*Math.PI/180, 10*Math.PI/180, 10*Math.PI/180);

    const seed = Math.random();
    const boundingBox = this.allMeshesBoundingBox();
    this.noiseTexture = new NoiseBoxTexture(boundingBox, seed);

    this.bodies = this.constructAnimationCurves();
  }

  private constructAnimationCurves(): AnimationBody[][] {
    const {meshes, meshGrid, curveSegments} = this.parameters;
    
    const threeChooseOne = [
      new Vector3(0, 0, 1),
      new Vector3(0, 1, 0),
      new Vector3(1, 0, 0),
    ]

    const threeChooseTwo = [
      new Vector3(0, 1, 1),
      new Vector3(1, 0, 1),
      new Vector3(1, 1, 0),
    ]

    this.RNG = splitmix32(Math.random());

    // The center (on the ground) used for determining in what direction a voxel
    // should be deflected.
    const boundingBox = this.allMeshesBoundingBox();
    
    meshes[0].geometry.computeBoundingBox();
    const voxelBoundingBox = meshes[0].geometry.boundingBox!;

    const center = new Vector3(
      (boundingBox.max.x - boundingBox.min.x) / 2,
      0,
      (boundingBox.max.z - boundingBox.min.z) / 2,
    );

    const bodies: (AnimationBody|null)[][] = meshes.map((instancedMesh) => {
      return Array(instancedMesh.count).fill(null);
    });

    let numberOfCollisions = 0;
    let maxminVelocity = 0;
    const noContactPoint = new Vector3(Infinity, Infinity, Infinity)
    const previousContactPoint = new Vector3().copy(noContactPoint);
    for (let z = 0; z < meshGrid.length; ++z) {
      for (let x = 0; x < meshGrid[0][0].length; ++x) {
        
        numberOfCollisions = 0;
        previousContactPoint.copy(noContactPoint);
        const fallLine: number[] = [];
        for (let y = 0; y < meshGrid[0].length; ++y) {
          const cell = meshGrid[z][y][x];
          // no voxel in this cell
          if (cell.meshIndex === -1) continue;
          
          const glideChance = 0.4;
          // const randomNumber = Math.abs(this.noiseTexture.getRandom(new Vector3(x, y, z), 0.9));
          const randomNumber = this.RNG();
          // const insertIndex = Math.floor(Math.log2((1-successChance)*(1-randomNumber))/Math.log2(successChance));

          const insertIndex = Math.floor(Math.log(randomNumber)/Math.log(glideChance));
          
          if (insertIndex < fallLine.length) {
            fallLine.splice(insertIndex, 0, y);
          } else {
            fallLine.push(y);
          } 
        }
        const yToFallLineIndex: number[] = Array(meshGrid[0].length);
        for (let i = 0; i < fallLine.length; ++i) {
          yToFallLineIndex[fallLine[i]] = i;
        }

        for (let y = 0; y < meshGrid[0].length; ++y) {
          const cell = meshGrid[z][y][x];
          // no voxel in this cell
          if (cell.meshIndex === -1) continue;

          const matrix = new Matrix4();
          meshes[cell.meshIndex].getMatrixAt(cell.instanceIndex, matrix);
          
          const contactPoints: Vector3[] = [];
          
          const position = new Vector3().setFromMatrixPosition(matrix);

          if (previousContactPoint.x === Infinity) {
            previousContactPoint.copy(new Vector3(position.x, 0, position.z));
          }

          const boxContact = previousContactPoint.clone().add(new Vector3(0, voxelBoundingBox.max.y, 0));        
          previousContactPoint.copy(boxContact);
          contactPoints.push(new Vector3(position.x, position.y, position.z));

          const noisedBoxContact = this.applyNoiseBetweenPoints(
            position, 
            boxContact, 
            this.boxNoise,
          ); 
          
          const centerToBoxContact = noisedBoxContact.clone()
            .sub(center)
            .setY(0)
            .normalize()
            .multiplyScalar(voxelBoundingBox.max.y * this.relativeGravity * 2);
          const postCollisionDirection = centerToBoxContact.clone().multiplyScalar(yToFallLineIndex[y]);

          const floorContact = postCollisionDirection
            .add(noisedBoxContact)
            .setY(voxelBoundingBox.max.y);

          const noisedFloorContact = this.applyNoiseBetweenPoints(
            noisedBoxContact, 
            floorContact, 
            this.floorNoise,
          ).setY(voxelBoundingBox.max.y); 

          numberOfCollisions++;

          contactPoints.push(new Vector3(noisedBoxContact.x, noisedBoxContact.y, noisedBoxContact.z));
          contactPoints.push(new Vector3(noisedFloorContact.x, noisedFloorContact.y, noisedFloorContact.z));
          
          const curve = new CatmullRomCurve3(
            contactPoints,
            undefined,
            undefined,
            0.2,
          );

          const gravity = this.randomiseGravity(position, boundingBox);
          // make dependent on resolution
          const impulseForPush = 5 / meshGrid[0].length* this.relativeGravity;
          const minVelocity = Math.max(yToFallLineIndex[y], 1) * impulseForPush;
          maxminVelocity = Math.min(minVelocity, maxminVelocity);
          bodies[cell.meshIndex][cell.instanceIndex] = new AnimationBody({
            curve,
            firstImpulse: new Vector3(
              this.noiseTexture.getRandom(position, 0.6)*3.5, 
              this.noiseTexture.getRandom(position, 0.7)*3.5, 
              this.noiseTexture.getRandom(position, 0.8)*3.5,
            ).multiply(threeChooseOne[Math.floor(this.RNG() * threeChooseOne.length)]),
            secondImpulse: new Vector3(
              this.noiseTexture.getRandom(position, 0.65)*8, 
              this.noiseTexture.getRandom(position, 0.75)*8, 
              this.noiseTexture.getRandom(position, 0.85)*8,
            ).multiply(threeChooseTwo[Math.floor(this.RNG() * threeChooseTwo.length)]),
            gravity,
            minVelocity,
            segments: curveSegments,
            stallPoint: noisedBoxContact.y,
          });
        }
      }
    }
    // console.log(avgRatio/meshes[0].count, 'average ratio');
    console.log(maxminVelocity);
    // It is guaranteed that all curves now have a value.
    return bodies as AnimationBody[][];
  }


  public reset() {
    const {meshes,} = this.parameters;

    const dummyMesh = new Mesh();
    for (let i = 0; i < meshes.length; ++i) {
      const instancedMesh = meshes[i];
      for (let j = 0; j < instancedMesh.count; ++j) {
        dummyMesh.setRotationFromQuaternion(new Quaternion(0, 0, 0, 1));
        dummyMesh.position.copy(this.bodies[i][j].getOriginalPosition());
        dummyMesh.updateMatrix();
        instancedMesh.setMatrixAt(j, dummyMesh.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.updateMatrix();
      instancedMesh.matrixWorldNeedsUpdate = true;
    }

    this.noiseTexture.setSeed(Math.random());
    this.bodies = this.constructAnimationCurves();
  }

  public animateVoxels(deltaTime: number) {
    const {meshes,} = this.parameters;
    const dummyMesh = new Mesh();
    for (let i = 0; i < meshes.length; ++i) {
      const instancedMesh = meshes[i];
      for (let j = 0; j < instancedMesh.count; ++j) {
        const [position, rotation, scale] = this.bodies[i][j].step(deltaTime, this.tempVariables);
        
        dummyMesh.rotation.copy(rotation);
        dummyMesh.scale.copy(scale);
        dummyMesh.position.copy(position.setY(position.y + 0*(scale.y-1)*0.1));
        dummyMesh.updateMatrix();
        instancedMesh.setMatrixAt(j, dummyMesh.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.updateMatrix();
      instancedMesh.matrixWorldNeedsUpdate = true;
    }
    // console.log(overAllProgress / meshes[0].count);
  }

  public setGravity(gravity: number) {
    this.parameters.gravity = gravity; 

    this.parameters.meshes[0].geometry.computeBoundingBox();
    const voxelBoundingBox = this.parameters.meshes[0].geometry.boundingBox!;
    const dummyMatrix = new Matrix4();
    const maxY = Math.max(...this.parameters.meshes.map((instancedMesh) => {
      let maxY = -Infinity;
      for (let i = 0; i < instancedMesh.count; ++i) {
        instancedMesh.getMatrixAt(i, dummyMatrix);
        //matrix[14] is the y position
        maxY = Math.max(dummyMatrix.elements[14] + voxelBoundingBox.max.y, maxY);
      }
      return maxY;
    }));
    this.relativeGravity = this.parameters.gravity / maxY;
  }

  private allMeshesBoundingBox() {
    const {meshes} = this.parameters;
    meshes[0].computeBoundingBox();
    const boundingBox = new Box3().copy(meshes[0].boundingBox!);
    for (const instancedMesh of meshes) {
      instancedMesh.computeBoundingBox();
      const instancedMeshBoundingBox = instancedMesh.boundingBox!;
      if (instancedMeshBoundingBox.min.x === Infinity || instancedMeshBoundingBox.max.x === -Infinity) {
        continue;
      }
      boundingBox.setFromPoints([
        ...(boundingBox.min.x !== Infinity && boundingBox.max.x !== -Infinity ?
          [boundingBox.min.clone(), 
          boundingBox.max.clone()]
          :
          []
        ), 
        instancedMeshBoundingBox.min.clone(),
        instancedMeshBoundingBox.max.clone()
      ]);
    }

    return boundingBox;
  }

  private applyNoiseBetweenPoints(from: Vector3, to: Vector3, noise: Euler): Vector3 {
    const direction = to.clone().sub(from);

    let randomValues = [
      // this.noiseTexture.getRandom(from, 0),
      // this.noiseTexture.getRandom(from, 0.1),
      // this.noiseTexture.getRandom(from, 0.2),
      this.RNG() * Math.sign(this.RNG() - 0.5),
      this.RNG() * Math.sign(this.RNG() - 0.5),
      this.RNG() * Math.sign(this.RNG() - 0.5),
    ];

    direction.applyEuler(new Euler(
      randomValues[0] * noise.x,
      randomValues[1] * noise.y,
      randomValues[2] * noise.z,
      'ZYX',
    ));
    
    return from.clone().add(direction);
  }

  private randomiseGravity(position: Vector3, boundingBox: Box3): number {
    return this.relativeGravity * 
      (0.3 + (position.y/boundingBox.max.y)*0.7+Math.abs(this.noiseTexture.getRandom(position, 0.4))*0.3); 
  }
}

function splitmix32(a: number) {
  return function() {
    a |= 0; a = a + 0x9e3779b9 | 0;
    var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
  }
}
