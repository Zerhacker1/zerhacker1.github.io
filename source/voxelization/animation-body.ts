import { Euler, Vector3 } from "three";
import { AnimationBodyParams, ProgressCurveVariables } from "./voxelize-types";

export class AnimationBody {
  private originalPosition: Vector3;
  private controlPoints: Vector3[];
  private controlPointProgress: number;
  private velocity: number;
  private minVelocity: number;
  private stallPoint: number;
  private gravity: number;
  private firstAngularVelocity: Vector3;
  private secondAngularVelocity: Vector3;
  private rotation: Euler;
  private scale: Vector3;

  private xToGroundRotationFinished = false;
  private zToGroundRotationFinished = false;

  private disappearTimer = 3;
  private toGroundImpulse = 7;

  private static radMax = 2 * Math.PI;

  constructor(params: AnimationBodyParams) {
    this.minVelocity = params.minVelocity;
    this.stallPoint = params.stallPoint;
    this.gravity = params.gravity;
    this.velocity = 0;
    this.controlPointProgress = 0;
    this.firstAngularVelocity = params.firstImpulse;
    this.secondAngularVelocity = params.secondImpulse;
    
    this.rotation = new Euler(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);

    this.controlPoints = [];

    this.originalPosition = params.curve.getPoint(0);
    
    this.controlPoints.push(this.originalPosition);
    for (let i = 1; i <= params.segments; ++i) {
      this.controlPoints.push(params.curve.getPoint(i / params.segments));
    }
  }
  
  public step(deltaTime: number, tempVariables: ProgressCurveVariables): [Vector3, Euler, Vector3] {
    const friction = 0.2;
    const { position, } = tempVariables;
    
    if (this.controlPointProgress >= this.controlPoints.length - 2) {
      this.rotateToGround(deltaTime);
    } else {
      this.rotateDuringMovement(deltaTime);
    }

    if (this.controlPointProgress === this.controlPoints.length-1) {
      this.disappearTimer -= deltaTime;
      if (this.disappearTimer <= 0) {
        const delta = deltaTime/2;
        this.scale.set(
          Math.max(this.scale.x - delta, 0),
          Math.max(this.scale.y - delta, 0),
          Math.max(this.scale.z - delta, 0),
        );
      }
      position.copy(this.controlPoints[this.controlPointProgress]);
      return [position, this.rotation, this.scale];
    }
    
    const acceleration = this.calculateAcceleration(tempVariables, friction);

    this.velocity += deltaTime * acceleration;
    this.velocity = Math.max(this.velocity, this.minVelocity * deltaTime);

    position.copy(this.moveAlongCurve(tempVariables, deltaTime));

    return [position, this.rotation, this.scale];
  }

  private rotateToGround(deltaTime: number): void {
    const epsilon = this.toGroundImpulse * deltaTime;

    const xDirection = Math.sign((this.rotation.x % (Math.PI/2)) - Math.PI/4);
    const zDirection = Math.sign((this.rotation.z % (Math.PI/2)) - Math.PI/4);

    this.secondAngularVelocity.set(
      this.xToGroundRotationFinished ? 0 : this.toGroundImpulse * xDirection,
      this.xToGroundRotationFinished && this.zToGroundRotationFinished ? 0: this.secondAngularVelocity.y,
      this.zToGroundRotationFinished ? 0: this.toGroundImpulse * zDirection,
    )

    this.stepRotation(this.secondAngularVelocity, deltaTime);

    if (this.rotation.x % (Math.PI/2) < epsilon) {
      this.rotation.set(0, this.rotation.y, this.rotation.z);
      this.xToGroundRotationFinished = true;
    }
    if (this.rotation.z % (Math.PI/2) < epsilon) {
      this.rotation.set(this.rotation.x, this.rotation.y, 0);
      this.zToGroundRotationFinished = true;
    }
  }

  private rotateDuringMovement(deltaTime: number): void {
    if (this.stallPoint === -Infinity) {
      this.stepRotation(this.secondAngularVelocity, deltaTime);
    } else {
      this.stepRotation(this.firstAngularVelocity, deltaTime);
    }
  }

  private calculateAcceleration(tempVariables: ProgressCurveVariables, friction: number): number {
    const {lowerBound, upperBound, tangent, projectedTangent} = tempVariables;

    const controlPointIndex = Math.floor(this.controlPointProgress);
    lowerBound.copy(this.controlPoints[controlPointIndex+1]);
    upperBound.copy(this.controlPoints[controlPointIndex]);

    tangent.copy(lowerBound).sub(upperBound);

    projectedTangent.set(tangent.x, 0, tangent.z);
    
    let angle = Math.PI/2; 
    
    // otherwise the tangent is perpendicular to the ground.
    if (projectedTangent.length() !== 0) {
      // I have to use Math.min() here because of floating point imprecisions (a / a > 1)
      angle = Math.acos(
        Math.min(tangent.dot(projectedTangent)/(tangent.length()*projectedTangent.length()), 1)
      );
    }

    const parallelForce = Math.sin(angle) * this.gravity;

    const perpendicularForce = Math.cos(angle) * this.gravity;

    // normal force = perpendicular force
    const frictionForce = friction * perpendicularForce;

    const netForce = parallelForce - frictionForce;

    const mass = 1;
    const acceleration = netForce / mass;

    return acceleration;
  }

  private moveAlongCurve(tempVariables: ProgressCurveVariables, deltaTime: number): Vector3 {
    const {position, tangent, upperBound, lowerBound, positionToLowerBound} = tempVariables;

    position
      .copy(tangent)
      .multiplyScalar(this.controlPointProgress-Math.floor(this.controlPointProgress))
      .add(upperBound);
  
    if (position.y < this.stallPoint) {
      this.velocity = Math.max(this.velocity / 10, this.minVelocity * deltaTime);
      this.stallPoint = -Infinity;
    }

    let tangentLength = tangent.length(); 
    let stepProgress = this.velocity;
    
    while (stepProgress > 0) {
      const distanceToNextControlPoint = positionToLowerBound.copy(lowerBound).sub(position).length();
      if (stepProgress <= distanceToNextControlPoint) {
        this.controlPointProgress += stepProgress/tangentLength;
        stepProgress = 0;
        position
          .copy(tangent)
          .multiplyScalar(this.controlPointProgress-Math.floor(this.controlPointProgress))
          .add(upperBound);
      } else {
        stepProgress -= distanceToNextControlPoint;
        
        this.controlPointProgress = Math.floor(this.controlPointProgress)+1;
        if (this.controlPointProgress === this.controlPoints.length-1) {
          position.copy(this.controlPoints[this.controlPoints.length-1]);
          break;
        }
        position.copy(this.controlPoints[this.controlPointProgress]);
        upperBound.copy(position);
        lowerBound.copy(this.controlPoints[this.controlPointProgress+1]);
      
        tangentLength = tangent.copy(lowerBound).sub(position).length();
      }
    }

    return position;
  }

  private stepRotation(impulse: Vector3, deltaTime: number) {
    const xRotation = (this.rotation.x + impulse.x * deltaTime) % AnimationBody.radMax;
    const yRotation = (this.rotation.y + impulse.y * deltaTime) % AnimationBody.radMax;
    const zRotation = (this.rotation.z + impulse.z * deltaTime) % AnimationBody.radMax;
    this.rotation.set(
      xRotation < 0 ? AnimationBody.radMax + xRotation : xRotation,
      yRotation < 0 ? AnimationBody.radMax + yRotation : yRotation,
      zRotation < 0 ? AnimationBody.radMax + zRotation : zRotation,
    );
  }
  
  public setGravity(gravity: number): void {
    this.gravity = gravity;
  }

  public getOriginalPosition(): Vector3 {
    return this.originalPosition;
  }
}