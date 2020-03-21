import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  controls = null;

  mesh1 = null;
  mesh2 = null;

  mouseDown = false;

  constructor() { 
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.camera.position.z = 30;
    this.camera.position.y = 30;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.enablePan = false;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 500;
    

    let geometry = new THREE.SphereGeometry(1,15,15);
    const material1 = new THREE.MeshBasicMaterial({color: 0x2099aa, wireframe: false});
    this.mesh1 = new THREE.Mesh(geometry, material1);

    geometry = new THREE.SphereGeometry(1,15,15);
    const material2 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh2 = new THREE.Mesh(geometry, material2);


    this.scene.add(this.mesh1);
    this.scene.add(this.mesh2);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
      window.requestAnimationFrame(() => this.animate());

      this.controls.update();

      this.mesh1.rotation.y += 0.01;
      this.mesh2.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseWheel(e) {
  }

  onMouseUp(e) {
    this.mouseDown = false;
  }

  onMouseDown(e) {
    this.mouseDown = true;
  }
  
  onMouseMove(e) {
  }
}
