import { Group, InstancedMesh, Object3D, Object3DEventMap } from "three";
import { SceneVoxelizer } from "./voxel-scene";
import { VoxelAnimator } from "./voxel-animator";
import { MeshReference, ModelDecayParams, VoxelParams } from "./voxelize-types";

export class ModelDecay extends Object3D {
    private voxelizer: SceneVoxelizer;
    private animator: VoxelAnimator;
    
    private originalModel: Group<Object3DEventMap>;

    private meshGrid: MeshReference[][][];
    private meshGroup: Group<Object3DEventMap>;

    constructor(parameters: ModelDecayParams) {
        super();

        const {model, resolution, boxFill, segments, gravity} = parameters;

        this.originalModel = model;

        this.voxelizer = new SceneVoxelizer({
            resolution,
            boxFill,
        });

        const voxelizationResult = this.voxelizer.voxelScene(model);
        this.meshGrid = voxelizationResult.meshGrid;
        this.meshGroup = voxelizationResult.meshGroup;

        this.animator = new VoxelAnimator({
           meshes: this.meshGroup.children as InstancedMesh[],
           gravity: gravity,
           meshGrid: this.meshGrid,
           curveSegments: segments, 
        });

        this.children.push(this.originalModel);
    }

    public switchToVoxelModel(): void {
        this.children[0] = this.meshGroup;
    }

    public switchToOriginalModel(): void {
        this.children[0] = this.originalModel;
    }

    public animate(deltaTime: number): void {
        if (this.children[0] === this.originalModel) return;

        this.animator.animateVoxels(deltaTime);
    }

    public reset(): void {
        const startTime = Date.now();
        this.animator.reset();
        const endTime = Date.now();
        console.log("resetting: ", endTime-startTime)
    }

    public setGravity(gravity: number): void {
        this.animator.setGravity(gravity);
    }
}