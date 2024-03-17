import GUI from "../node_modules/lil-gui"
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  GridHelper,
  Group,
  LoadingManager,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  WebGLRenderer
} from "../node_modules/three"
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"
import { DragControls } from "../node_modules/three/examples/jsm/controls/DragControls"
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls"
import Stats from "../node_modules/three/examples/jsm/libs/stats.module"
import * as animations from "./helpers/animations"
import { toggleFullScreen } from "./helpers/fullscreen"
import { resizeRendererToDisplaySize } from "./helpers/responsiveness"
import "./style.css"
import { ModelDecay } from "./voxelization/model-decay"

const CANVAS_ID = "scene"

let canvas
let renderer
let scene
let loadingManager
let ambientLight
let pointLight
let mesh
let camera
let cameraControls
let dragControls
let axesHelper
let pointLightHelper
let clock
let stats
let gui
let loader

let voxels = []
let previousTime = 0
const animation = { enabled: false, play: true }
let modelDecay

let resettedPreviousFrame = false
const animatorOptions = {
  play: false,
  gravity: 0.1,
  timeFactor: 1,
  reset: () => {
    if (modelDecay) {
      modelDecay.reset()
      modelDecay.switchToOriginalModel()
      resettedPreviousFrame = true
    }
  }
}

loader = new GLTFLoader()

let importedScene = new Group()

let modelName = {
  selectedOption: "Astronaut"
}
const options = [
  "Astronaut",
  "Cabinet Bed Drawer Tabl",
  "chess",
  "Earth",
  "Little Man",
  "low_poly_car_-_de_tomaso_p72_2020",
  "Mercedes-Benz 190",
  "Police Car",
  "sportcar.017"
]
let previousModelName = ""

let frameCounter = 0
const voxelizerOptions = {
  resolution: 15,
  boxFill: 1
}

const updateVoxelizer = {
  update: () => {
    modelDecay = null
    loadModel(modelName.selectedOption)
  }
}

init()
// animate()

function init() {
  // ===== CANVAS, RENDERER, & SCENE =====
  {
    canvas = document.querySelector(`canvas#${CANVAS_ID}`)
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    scene = new Scene()
  }

  // ===== LOADING MANAGER =====
  {
    loadingManager = new LoadingManager()

    loadingManager.onStart = () => {
      console.log("loading started")
    }
    loadingManager.onProgress = (url, loaded, total) => {
      console.log("loading in progress:")
      console.log(`${url} -> ${loaded} / ${total}`)
    }
    loadingManager.onLoad = () => {
      console.log("loaded!")
    }
    loadingManager.onError = () => {
      console.log("error while loading")
    }
  }

  // ===== LIGHTS =====
  {
    ambientLight = new AmbientLight("white", 0.8)
    pointLight = new PointLight("#ffdca8", 1.2, 100)
    pointLight.position.set(-2, 3, 3)
    pointLight.castShadow = true
    pointLight.shadow.radius = 4
    pointLight.shadow.camera.near = 0.5
    pointLight.shadow.camera.far = 4000
    pointLight.shadow.mapSize.width = 2048
    pointLight.shadow.mapSize.height = 2048
    scene.add(ambientLight)
    // scene.add(pointLight)
  }

  {
    // const planeGeometry = new PlaneGeometry(20, 20)
    const planeGeometry = new PlaneGeometry(3, 3)
    // const planeMaterial = new MeshLambertMaterial({
    //   color: 'gray',
    //   emissive: 'teal',
    //   emissiveIntensity: 0.2,
    //   side: 2,
    //   transparent: true,
    //   opacity: 0.4,
    // })
    const planeMaterial = new MeshStandardMaterial({
      color: "gray",
      side: 2
    })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.rotateX(Math.PI / 2)
    plane.receiveShadow = true
    mesh = new Mesh(
      new BoxGeometry(0.001, 0.001, 0.001),
      new MeshStandardMaterial()
    )
    scene.add(mesh)
    scene.add(plane)
  }

  // ===== CAMERA =====
  {
    camera = new PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    )
    camera.position.set(20, 20, 30)
  }

  // ===== CONTROLS =====
  {
    cameraControls = new OrbitControls(camera, canvas)
    cameraControls.target = mesh.position.clone()
    cameraControls.enableDamping = true
    cameraControls.autoRotate = false
    cameraControls.update()

    dragControls = new DragControls([mesh], camera, renderer.domElement)
    dragControls.addEventListener("hoveron", event => {
      event.object.material.emissive.set("orange")
    })
    dragControls.addEventListener("hoveroff", event => {
      event.object.material.emissive.set("black")
    })
    dragControls.addEventListener("dragstart", event => {
      cameraControls.enabled = false
      animation.play = false
      event.object.material.emissive.set("black")
      event.object.material.opacity = 0.7
      event.object.material.needsUpdate = true
    })
    dragControls.addEventListener("dragend", event => {
      cameraControls.enabled = true
      animation.play = true
      event.object.material.emissive.set("black")
      event.object.material.opacity = 1
      event.object.material.needsUpdate = true
    })
    dragControls.enabled = false

    // Full screen
    window.addEventListener("dblclick", event => {
      if (event.target === canvas) {
        toggleFullScreen(canvas)
      }
    })
  }

  // ===== HELPERS =====
  {
    axesHelper = new AxesHelper(4)
    axesHelper.visible = false
    scene.add(axesHelper)

    pointLightHelper = new PointLightHelper(pointLight, undefined, "orange")
    pointLightHelper.visible = false
    scene.add(pointLightHelper)

    const gridHelper = new GridHelper(20, 20, "teal", "darkgray")
    gridHelper.position.y = -0.01
    scene.add(gridHelper)
  }

  // ===== STATS & CLOCK =====
  {
    clock = new Clock()
    stats = new Stats()
    document.body.appendChild(stats.dom)
  }
  gui = new GUI({ title: " Debug GUI", width: 300 })

  // ==== DEBUG GUI ====
  {
    const voxelizerFolder = gui.addFolder("voxelizer")
    voxelizerFolder.add(voxelizerOptions, "resolution").name("resolution")
    voxelizerFolder.add(voxelizerOptions, "boxFill").name("box fill")
    voxelizerFolder.add(updateVoxelizer, "update").name("update model")

    const animatorFolder = gui.addFolder("animator")
    animatorFolder.add(animatorOptions, "play").name("play animation")
    animatorFolder.add(animatorOptions, "reset").name("reset model")
    animatorFolder.add(animatorOptions, "gravity", 0, 10).onChange(value => {
      if (modelDecay) modelDecay.setGravity(value)
    })
    animatorFolder.add(animatorOptions, "timeFactor", 0, 2).name("time factor")

    const modelFolder = gui.addFolder("model")
    modelFolder.add(modelName, "selectedOption", options)

    // persist GUI state in local storage on changes
    gui.onFinishChange(() => {
      const guiState = gui.save()
      localStorage.setItem("guiState", JSON.stringify(guiState))
    })

    // load GUI state if available in local storage
    const guiState = localStorage.getItem("guiState")
    if (guiState) gui.load(JSON.parse(guiState))

    // reset GUI state button
    const resetGui = () => {
      localStorage.removeItem("guiState")
      gui.reset()
    }
    gui.add({ resetGui }, "resetGui").name("RESET")

    gui.close()
  }
  animate()
}

function loadModel(model) {
  for (const voxel of voxels) {
    scene.remove(voxel)
  }
  voxels = []
  if (modelDecay) {
    scene.remove(modelDecay)
  }
  loader.load(`./models/${model}.glb`, gltf => {
    importedScene = gltf.scene
    // mesh.position.copy(new Vector3(7, 0, 0));
    // importedScene.setRotationFromEuler(new Euler(5.34759384759345345, 2.439543954, 4.843759435));
    importedScene.position.set(2, 2, 3)
    importedScene.scale.set(2, 2, 2)
    importedScene.updateMatrix()
    const startTime = Date.now()
    modelDecay = new ModelDecay({
      model: importedScene.clone(),
      resolution: voxelizerOptions.resolution,
      boxFill: voxelizerOptions.boxFill,
      segments: 15,
      gravity: animatorOptions.gravity
    })
    const endTime = Date.now()
    console.log(endTime - startTime)
    scene.add(modelDecay)

    animatorOptions.play = false
    gui.children[1].children[0].setValue(false)
  })
}

function animate() {
  ++frameCounter
  requestAnimationFrame(animate)

  const elapsedTime = clock.getElapsedTime()
  const deltaTime =
    (elapsedTime - previousTime) * (resettedPreviousFrame ? 0 : 1)
  resettedPreviousFrame = false
  previousTime = elapsedTime

  if (modelDecay && animatorOptions.play) {
    // modelDecay.setGravity(animatorOptions.gravity);
    modelDecay.switchToVoxelModel()
    modelDecay.animate(deltaTime * animatorOptions.timeFactor)
  }

  stats.update()

  if (animation.enabled && animation.play) {
    animations.rotate(mesh, clock, Math.PI / 3)
    animations.bounce(mesh, clock, 1, 0.5, 0.5)
  }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  camera.far = 50000
  cameraControls.update()

  renderer.render(scene, camera)

  if (modelName.selectedOption !== previousModelName) {
    previousModelName = modelName.selectedOption
    loadModel(modelName.selectedOption)
  }
}
