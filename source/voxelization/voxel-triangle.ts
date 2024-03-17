import { Color, Vector2, Vector3 } from "three";
import { GridCell, TextureData, Triangle2, Triangle3, VoxelParams } from "./voxelize-types";
import { Voxelizer } from "./voxel";

export class VoxelTriangle extends Voxelizer{

  constructor(parameters: VoxelParams) {
    super(parameters);
  }

  public voxelizeTriangle(
    points: Triangle3,
    uvs: Triangle2,
    texture: TextureData,
    unitSize: number,
    gridSize: number,
    materialIndex: number,
    customGrid?: GridCell[][][],
  ) {
    if (customGrid) {
      this.grid = customGrid;
    }
    const {a: p0, b: p1, c: p2} = points;

    const v0 = p1.clone().sub(p0);
    const v1 = p2.clone().sub(p1);
    const v2 = p2.clone().sub(p0);
  
    const triangleLength = Math.max(v0.length(), v1.length(), v2.length());
  
    const segments = Math.ceil(triangleLength/unitSize);
    // console.log(segments);
    if (segments <= 1) {
      this.updateGridOnMicroTriangle(
        points, 
        {a: p0, b: p1, c: p2}, 
        uvs,
        texture,
        gridSize, 
        materialIndex,
      );
    }
  
    const p20 = this.subdivideEdge(p2, p0, segments);
    const p21 = this.subdivideEdge(p2, p1, segments);
    const p10x: Vector3[][] = [];
  
    for (let i = 1; i <= segments; ++i) {
      p10x.push(this.subdivideEdge(p20[i], p21[i], i));
    }
    this.updateGridOnMicroTriangle(
      points, 
      {a: p10x[0][0], b: p10x[0][1], c: p2}, 
      uvs, 
      texture,
      gridSize, 
      materialIndex,
    ); 
    
    for (let i = 1; i < p10x.length; ++i) {
      const prevList = p10x[i-1];
      const list = p10x[i];
      this.updateGridOnMicroTriangle(
        points, 
        {a: list[0], b: list[1], c: prevList[0]}, 
        uvs, 
        texture,
        gridSize, 
        materialIndex,
      );
      for (let j = 1; j < list.length-1; ++j) {
        this.updateGridOnMicroTriangle(
          points, 
          {a: list[j], b: prevList[j-1], c: prevList[j]}, 
          uvs, 
          texture,
          gridSize, 
          materialIndex,
        );
        this.updateGridOnMicroTriangle(
          points, 
          {a: list[j], b: prevList[j], c: list[j+1]}, 
          uvs,
          texture,
          gridSize, 
          materialIndex,
        );
      }
    }
  }

  private subdivideEdge(a: Vector3, b: Vector3, segments: number): Vector3[] {
    const subdividedEdge: Vector3[] = [a.clone()];
    const segmentedDir = b.clone().sub(a).multiplyScalar(1/segments);
    const traversePoint = a.clone();
    
    for (let i = 1; i < segments; ++i) {
      traversePoint.add(segmentedDir);
      subdividedEdge.push(traversePoint.clone());  
    }
  
    subdividedEdge.push(b.clone());
  
    return subdividedEdge;
  }
  private updateGridOnMicroTriangle(
    triangle : Triangle3,
    microTriangle: Triangle3,
    {a: uvA, b: uvB, c: uvC}: Triangle2,
    texture: TextureData,
    gridSize: number,
    materialIndex: number,
  ) {
    const {a, b, c} = microTriangle;

    const cellA = new Vector3(
      Math.floor(a.x / gridSize),
      Math.floor(a.y / gridSize),
      Math.floor(a.z / gridSize),
    );
    const cellB = new Vector3(
      Math.floor(b.x / gridSize),
      Math.floor(b.y / gridSize),
      Math.floor(b.z / gridSize),
    );
    const cellC = new Vector3(
      Math.floor(c.x / gridSize),
      Math.floor(c.y / gridSize),
      Math.floor(c.z / gridSize),
    );
    
    let baryCoords = this.barycentricCoordinatesOnTriangle(triangle, a);
    if (Number.isNaN(baryCoords.x) || baryCoords.x === -Infinity) return;

    const intersections = this.getMicroTriangleGridIntersections(
      microTriangle,
      cellA,
      cellB,
      cellC,
      gridSize,
    );

    let side0End = intersections.ab.x === Infinity ? b : intersections.ab;
    let side0Length = side0End.clone().sub(a).length();
    let side1End = intersections.ac.x === Infinity ? c : intersections.ac;
    let side1Length = side1End.clone().sub(a).length();
    this.updateGridAt(
      cellA, 
      {
        materialIndex,
        portions : [{
          color: this.getColorAtUV(
            texture, 
            uvA.clone()
              .multiplyScalar(baryCoords.x)
              .add(uvB.clone().multiplyScalar(baryCoords.y))
              .add(uvC.clone().multiplyScalar(baryCoords.z)),  
          ),
          value: this.calculateWeight(side0Length, side1Length,),
        }],
      },
      true,
    );
    
    baryCoords = this.barycentricCoordinatesOnTriangle(triangle, b);
    
    side0End = intersections.ba.x === Infinity ? a : intersections.ba;
    side0Length = side0End.clone().sub(b).length();
    side1End = intersections.bc.x === Infinity ? c : intersections.bc;
    side1Length = side1End.clone().sub(b).length();
    this.updateGridAt(
      cellB, 
      {
        materialIndex,
        portions: [{
          color: this.getColorAtUV(
            texture,
            uvA.clone()
              .multiplyScalar(baryCoords.x)
              .add(uvB.clone().multiplyScalar(baryCoords.y))
              .add(uvC.clone().multiplyScalar(baryCoords.z))
          ),
          value: this.calculateWeight(side0Length, side1Length,),
        }]
      },
      true,
    );

    baryCoords = this.barycentricCoordinatesOnTriangle(triangle, c);
    
    side0End = intersections.ca.x === Infinity ? a : intersections.ca;
    side0Length = side0End.clone().sub(b).length();
    side1End = intersections.cb.x === Infinity ? b : intersections.cb;
    side1Length = side1End.clone().sub(c).length();
    this.updateGridAt(
      cellC, 
      {
        materialIndex,
        portions: [{
          color: this.getColorAtUV(
            texture,
            uvA.clone()
              .multiplyScalar(baryCoords.x)
              .add(uvB.clone().multiplyScalar(baryCoords.y))
              .add(uvC.clone().multiplyScalar(baryCoords.z))
          ),
          value: this.calculateWeight(side0Length, side1Length,),
        }]
      },
      true,
    );
  }

  private calculateWeight(sideALength: number, sideBLength: number) {
    const area = sideALength*sideBLength*0.5*1000;
    return Math.exp(area);
  }

  private getColorAtUV(texture: TextureData, uv: Vector2) {
    uv.setX(Math.min(uv.x, 1.0));
    uv.setY(Math.min(uv.y, (texture.height-1)/texture.height));
    const startIndex = Math.min(
      texture.data.length - 4,
      4 * (Math.floor(uv.x*texture.width) + texture.width*Math.floor(uv.y*texture.height)),
    );
    const data = texture.data;
    // const color = new Color(Math.pow(data[startIndex]/255, 2.2), Math.pow(data[startIndex+1]/255, 2.2), Math.pow(data[startIndex+2]/255, 2.2));
    // if (Number.isNaN(color.r) || Number.isNaN(color.g) || Number.isNaN(color.b)) {
    //   console.log('color is NaN');
    // }
    return new Color(Math.pow(data[startIndex]/255, 2.2), Math.pow(data[startIndex+1]/255, 2.2), Math.pow(data[startIndex+2]/255, 2.2));
  }

  private barycentricCoordinatesOnTriangle({a, b, c}: Triangle3, p: Vector3): Vector3 {
    const v0 = b.clone().sub(a); 
    const v1 = c.clone().sub(a);
    const v2 = p.clone().sub(a);
    const d00 = v0.dot(v0);
    const d01 = v0.dot(v1);
    const d11 = v1.dot(v1);
    const d20 = v2.dot(v0);
    const d21 = v2.dot(v1);
    const denom = d00 * d11 - d01 * d01;
    const v = (d11 * d20 - d01 * d21) / denom;
    const w = (d00 * d21 - d01 * d20) / denom;
    const u = 1.0 - v - w;
  
    return new Vector3(u, v, w);
  }

  private getMicroTriangleGridIntersections(
    {a, b, c} : Triangle3,
    cellA: Vector3,
    cellB: Vector3,
    cellC: Vector3,
    gridSize: number,
  ):{
    ab: Vector3,
    ba: Vector3,
    ac: Vector3,
    ca: Vector3,
    bc: Vector3,
    cb: Vector3,
  } {
    return {
      ab: this.getLineSegmentGridIntersection(
        a,
        b,
        cellA,
        cellB,
        gridSize,
      ),
      ba: this.getLineSegmentGridIntersection(
        b,
        a,
        cellB,
        cellA,
        gridSize,
      ),
      ac: this.getLineSegmentGridIntersection(
        a,
        c,
        cellA,
        cellC,
        gridSize,
      ),
      ca: this.getLineSegmentGridIntersection(
        c,
        a,
        cellC,
        cellA,
        gridSize,
      ),
      bc: this.getLineSegmentGridIntersection(
        b,
        c,
        cellB,
        cellC,
        gridSize,
      ),
      cb: this.getLineSegmentGridIntersection(
        c,
        b,
        cellC,
        cellB,
        gridSize,
      ),
    };
  }

  private getLineSegmentGridIntersection(
    a: Vector3,
    b: Vector3,
    cellA: Vector3,
    cellB: Vector3,
    gridSize: number,
  ): Vector3 {
    const gridMin = cellA.clone().multiplyScalar(gridSize);
    const gridMax = gridMin.clone().addScalar(gridSize);

    const gridMinArr = [gridMin.x, gridMin.y, gridMin.z];
    const gridMaxArr = [gridMax.x, gridMax.y, gridMax.z];

    const aArr = [a.x, a.y, a.z];

    let minFactor: number = Infinity;

    const dir = b.clone().sub(a);
    const dirArr = [dir.x, dir.y, dir.z];

    let dirFactor = 0;

    for (let i = 0; i < 3; ++i) {
      if (dirArr[i] !== 0) {
        dirFactor = (gridMinArr[i] - aArr[i]) / dirArr[i];
        if (dirFactor > 1) {
          minFactor = Math.min(dirFactor, minFactor);
        } else if (dirFactor >= 0) {
          return a.clone().add(dir.multiplyScalar(dirFactor));
        }
  
        dirFactor = (gridMaxArr[i] - aArr[i]) / dirArr[i];
        if (dirFactor > 1) {
          minFactor = Math.min(dirFactor, minFactor);
        } else if (dirFactor >= 0) {
          return a.clone().add(dir.multiplyScalar(dirFactor));
        }
      }
    }

    if (minFactor !== Infinity) {
      return new Vector3(Infinity, Infinity, Infinity);
    }
    return new Vector3(Infinity, Infinity, Infinity);
  }
}