import { 
  Box3, 
  BoxGeometry, 
  BufferAttribute, 
  BufferGeometry, 
  Color, 
  Group, 
  InstancedMesh, 
  InterleavedBufferAttribute, 
  Material, 
  Matrix4, 
  Mesh, 
  MeshBasicMaterial, 
  MeshPhongMaterial, 
  MeshStandardMaterial, 
  Object3DEventMap,
  Vector3 
} from "three";
import { VoxelParams, MaterialWithColor, CellColor, MeshReference,} from "./voxelize-types";
import { VoxelMesh } from "./voxel-mesh";
import { Voxelizer } from "./voxel";
import { GeneralSet } from "../GeneralSet";
 
export class SceneVoxelizer extends Voxelizer {

  public constructor(parameters: VoxelParams) {
    super(parameters);
  }

  public voxelScene(scene: Group<Object3DEventMap>): {
    meshGrid: MeshReference[][][],
    meshGroup: Group,
  } {
    const importedMeshes: Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        importedMeshes.push(child);
      }
    });
    
    const points: Vector3[] = [];

    const positions: (BufferAttribute|InterleavedBufferAttribute)[] = [];
    const indices: BufferAttribute [] = [];
    const uvMappings: (BufferAttribute|InterleavedBufferAttribute)[] = [];

    const modelTransforms: Matrix4[] = [];
    const materials: (MaterialWithColor)[] = [];

    const sceneRotation = scene.rotation.clone();
    const scenePosition = scene.position.clone();

    scene.rotation.set(0, 0, 0);
    scene.position.set(0, 0, 0);
    scene.updateMatrix();

    for (const child of importedMeshes) {
      if (child.material instanceof Material) {
        if (child.material instanceof MeshBasicMaterial || 
          child.material instanceof MeshStandardMaterial ||
          child.material instanceof MeshPhongMaterial) {
          materials.push(child.material);
        }
      } else {
        if (child.material[0] instanceof MeshBasicMaterial || 
          child.material[0] instanceof MeshStandardMaterial ||
          child.material[0] instanceof MeshPhongMaterial) {
          materials.push(child.material[0]);
        }
      }
      
      const index = child.geometry.getIndex();
      const positionAttribute = child.geometry.getAttribute('position');
      const uvMapping = child.geometry.getAttribute('uv');
      
      positions.push(positionAttribute.clone());
      if (index === null) {
        throw 'non indexed objects currently not supported';
      }
      indices.push(index);
      uvMappings.push(uvMapping);
      
      // const modelTransform = child.matrix.clone();

      const matrices: Matrix4[] = [child.matrix];

      let parent = child.parent;

      while(parent !== null) {
        matrices.push(parent.matrix);
        parent = parent.parent;
      }

      const modelTransform = matrices[matrices.length-1].clone();
      for (let i = matrices.length-2; i >= 0; --i) {
        modelTransform.multiply(matrices[i]);
      }
      modelTransforms.push(modelTransform);
      for (let i = 0; i < positionAttribute.count; ++i) {
        points.push(new Vector3(
          positionAttribute.getX(i),
          positionAttribute.getY(i),
          positionAttribute.getZ(i),
        ).applyMatrix4(modelTransform));
      }
    }
  
    const boundingBox = new Box3().setFromPoints(points);
    const size = new Vector3();
    boundingBox.getSize(size);

    const voxelTranslation = boundingBox.min.clone().multiplyScalar(-1.);
    
    const biggestDimension = this.fitGrid(size);

    for (let i = 0; i < positions.length; ++i) {
      const attribute = positions[i];
      const modelTransform = modelTransforms[i];
      for (let i = 0; i < attribute.count; ++i) {
        const transformedVector = new Vector3(
          attribute.getX(i),
          attribute.getY(i),
          attribute.getZ(i),
        ) .applyMatrix4(modelTransform)
          .add(voxelTranslation);
        
        attribute.setXYZ(
          i,
          transformedVector.x,
          transformedVector.y,
          transformedVector.z,  
        );
      }
    }

    const meshVoxelizer = new VoxelMesh(this.parameters);
    for (let i = 0; i < positions.length; ++i) {
      // if (uvMappings[i] !== undefined) {
        const geometry = new BufferGeometry();
        geometry.setIndex(indices[i]);
        geometry.setAttribute('position', positions[i]);
        geometry.setAttribute('uv', uvMappings[i]);
        meshVoxelizer.voxelizeMesh({
            mesh: new Mesh(geometry, materials[i]),
            modelSize: biggestDimension,
            materialIndex: i+1,
            customGrid: this.grid,
            translateMesh: false,
            fillGrid: false,
            paintGrid: false,
        });
      // }
    }

    this.floodGrid();
    
    this.paintVoxels(materials);
    const {meshes, meshGrid} = this.createVoxels(materials, biggestDimension);
    
    const sceneBoundingBox = new Box3().setFromObject(scene);

    const group = new Group();
    group.add(...meshes);
    
    for (const mesh of meshes) {
      mesh.position.copy(sceneBoundingBox.min);
      mesh.updateMatrix();
    }

    scene.rotation.copy(sceneRotation);
    scene.position.copy(scenePosition);
    scene.updateMatrix();

    group.rotation.copy(sceneRotation);
    group.position.copy(scenePosition);
    group.updateMatrix();
    return {meshGroup: group, meshGrid};
  }


  private paintVoxels(materials: (MeshStandardMaterial | MeshBasicMaterial | MeshPhongMaterial)[]) {
    const hullCells = this.paintHull(materials);
    this.paintInside(materials, hullCells);
  }

  private paintHull(materials: (MeshStandardMaterial | MeshBasicMaterial | MeshPhongMaterial)[]) {
    const hullCells: CellColor[] = [];
    for (let z = 0; z < this.grid.length; ++z) {
      for (let y = 0; y < this.grid[z].length; ++y) {
        for (let x = 0; x < this.grid[z][y].length; ++x) {
          const cell = new Vector3(x, y, z);
          const cellValue = this.getGridAt(cell);
          const materialIndex = cellValue.materialIndex;
          if (materialIndex > 0) {
            const cellColor = this.paintVoxel(materials, cell);
            hullCells.push({color: cellColor, position: new Vector3(x, y, z)});
          }
        }
      }
    }
    return hullCells;
  }

  private paintVoxel(
    materials: (MeshStandardMaterial | MeshBasicMaterial | MeshPhongMaterial)[],
    voxelPosition: Vector3,
  ): Color {
    const cell = this.getGridAt(voxelPosition);
    const material = this.computeMaterial([materials[cell.materialIndex - 1]]);
    const cellColor = this.getCellColor(cell);
    material.setValues({
      color: cellColor,
    });
    this.setMaterialGridAt(voxelPosition, material);
    return cellColor;
  }

  private paintInside(
    materials: (MeshStandardMaterial | MeshBasicMaterial | MeshPhongMaterial)[],
    hullCells: CellColor[]
  ): void {
    const neighborKernel = [
      new Vector3(0, 0, 1),
      new Vector3(0, 0, -1),
      new Vector3(0, 1, 0),
      new Vector3(0, -1, 0),
      new Vector3(1, 0, 0),
      new Vector3(-1, 0, 0),
    ]
    
    let iteration = 1;
    let currentIteration: CellColor[] = [...hullCells];
    const materialPortions = new Map<Vector3, MaterialWithColor[]>();
    while(currentIteration.length > 0) {
      const nextIteration: GeneralSet<Vector3> = new GeneralSet();
      for (const finishedCell of currentIteration) {
        for (const offset of neighborKernel) {
          const offsetedPoint = finishedCell.position.clone().add(offset);
          if (this.pointInGrid(offsetedPoint)) {
            const cell = this.getGridAt(offsetedPoint);
            if (cell.materialIndex !== -1 && (cell.portions.length === 0 || cell.portions[0].value === iteration)) {
              cell.materialIndex = this.getGridAt(finishedCell.position).materialIndex;
              cell.portions.push({color: finishedCell.color, value: iteration});
              const portions = materialPortions.get(offsetedPoint);
              const finishedCellMaterial = this.getMaterialAt(finishedCell.position)!;
              if (portions) {
                portions.push(finishedCellMaterial);
                materialPortions.set(offsetedPoint, portions);
              } else {
                materialPortions.set(offsetedPoint, [finishedCellMaterial])
              }
              nextIteration.add(offsetedPoint);
            }
          }
        }
      }
      
      currentIteration = [];
      for (const annotatedCell of nextIteration.values()) {
        const color = this.paintVoxel(materials, annotatedCell);
        // const material = this.computeMaterial(materialPortions.get(annotatedCell)!);
        currentIteration.push({color: color, position: annotatedCell}); 
      }
      ++iteration;
    }
  }

  private computeMaterial(portions: MaterialWithColor[]): MaterialWithColor {
    const standardMaterial = portions[0] as MeshStandardMaterial;
    const voxelizationMaterial = new MeshStandardMaterial(
      {
        color: standardMaterial.color,
        // metalness: standardMaterial.metalness??1.,  
        // metalnessMap: standardMaterial.metalnessMap,
        // roughness: standardMaterial.roughness,
        // blendAlpha: standardMaterial.blendAlpha,
        // blendColor: standardMaterial.blendColor,
        // blendDst: standardMaterial.blendDst,
        // blendDstAlpha: standardMaterial.blendDstAlpha ?? undefined,
        // blendEquation: standardMaterial.blendEquation,
        // blendEquationAlpha: standardMaterial.blendEquationAlpha ?? undefined,
        // blending: standardMaterial.blending,
        // blendSrc: standardMaterial.blendSrc,
        // blendSrcAlpha: standardMaterial.blendSrcAlpha ?? undefined,
        // clipIntersection: standardMaterial.clipIntersection,
        // clippingPlanes: standardMaterial.clippingPlanes ?? undefined,
        // clipShadows: standardMaterial.clipShadows,
        opacity: standardMaterial.opacity,
        // fog: standardMaterial.fog,
      }
    ); 
    return voxelizationMaterial;
  }

  private createVoxels(materials: MaterialWithColor[], modelSize: number): {
    meshes: InstancedMesh[],
    meshGrid: MeshReference[][][] 
  } {
    const sideLength = modelSize / this.parameters.resolution * this.parameters.boxFill;
    const baseGeometry = new BoxGeometry(sideLength, sideLength, sideLength);
    const gridSize = modelSize / this.parameters.resolution;

    const materialIndexCount: number[] = Array.from({length: materials.length}, () => 0);
    for (let z = 0; z < this.grid.length; ++z) {
      for (let y = 0; y < this.grid[z].length; ++y) {
        for (let x = 0; x < this.grid[z][y].length; ++x) {
          const materialIndex = this.getGridAt(new Vector3(x, y, z)).materialIndex;
          if (materialIndex !== 0) {
            ++materialIndexCount[materialIndex-1];
          }
        }
      }
    }
    const meshGrid: MeshReference[][][] = Array.from(
      {length: this.grid.length},
      () => Array.from(
        {length: this.grid[0].length},
        () => {
          const length = this.grid[0][0].length;
          const arr = [];
          for (let i = 0; i < length; ++i) {
            arr.push({
              meshIndex: -1,
              instanceIndex: -1, 
            });
          }
          return arr;
        }
      )
    );


    const instancedMeshes: InstancedMesh[] = [];
    const instancedMeshesIndices: number[] = [];
    for (let i = 0; i < materials.length; ++i) {
      const newMaterial = this.computeMaterial([materials[i]]);
      newMaterial.map = null
      instancedMeshes.push(new InstancedMesh(baseGeometry, newMaterial, materialIndexCount[i]));
      instancedMeshesIndices.push(0);
    }
    const dummyMesh = new Mesh();
    for (let z = 0; z < this.grid.length; ++z) {
      for (let y = 0; y < this.grid[z].length; ++y) {
        for (let x = 0; x < this.grid[z][y].length; ++x) {
          const cell = new Vector3(x, y, z);
          const material = this.getMaterialAt(cell);
          if (material) {
            // const mesh = new Mesh(baseGeometry, material!);
            // mesh.position.copy(new Vector3(x, y, z).multiplyScalar(gridSize));
            // mesh.updateMatrix();
            // meshes.push(mesh);
            const materialIndex = this.getGridAt(cell).materialIndex;
            dummyMesh.position.copy(new Vector3(x, y, z).multiplyScalar(gridSize).addScalar(sideLength/2 - gridSize));
            dummyMesh.updateMatrix();
            const instancedMesh = instancedMeshes[materialIndex-1];
            const index = instancedMeshesIndices[materialIndex-1];
            instancedMesh.setMatrixAt(index, dummyMesh.matrix);
            instancedMesh.setColorAt(index, material.color);
            meshGrid[z][y][x] = {meshIndex: materialIndex-1, instanceIndex: index};
            ++instancedMeshesIndices[materialIndex-1];
          } 
        }
      }
    }

    return {meshes: instancedMeshes, meshGrid};
  }
} 
