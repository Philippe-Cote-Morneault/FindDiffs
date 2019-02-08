import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as THREE from "three";
// import * as OrbitControls from "three-orbitcontrols";

@Component({
  selector: "app-cube",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.css"],
})
export class CubeComponent implements AfterViewInit {

  private camera: THREE.PerspectiveCamera;
  // public controls: OrbitControls;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  public test: THREE.PerspectiveCamera;

  @ViewChild("canvas")
  private canvasRef: ElementRef;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;

  /* CUBE PROPERTIES */
  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 2;

  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 3;

  @Input()
  public fieldOfView: number = 70;

  public nearClippingPane: number = 1;

  public farClippingPane: number = 1000;

  private animateCube(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private createCube(): void {
    // const texture = new THREE.TextureLoader().load(this.texture);
    // const material = new THREE.MeshBasicMaterial({ map: texture });

    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: false });

    const geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
  }

  private createScene(): void {
    this.scene = new THREE.Scene();

    const aspectRatio: number = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane,
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop(): void {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    document.body.appendChild(this.renderer.domElement);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  public onResize(): void {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  public ngAfterViewInit(): void {
    this.createScene();
    this.createCube();
    this.startRenderingLoop();
  }
}
