import GUI, { Controller } from 'lil-gui'
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  Euler,
  GridHelper,
  Group,
  InstancedMesh,
  LoadingManager,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as animations from './helpers/animations'
import { toggleFullScreen } from './helpers/fullscreen'
import { resizeRendererToDisplaySize } from './helpers/responsiveness'
import './style.css'
import { SceneVoxelizer } from './voxelization/voxel-scene'
import { VoxelAnimator } from './voxelization/voxel-animator'
import { VoxelParams } from './voxelization/voxelize-types'
import { ModelDecay } from './voxelization/model-decay'

