import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PlanetRenderer } from './planetRenderer';

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

  earth:PlanetRenderer = null;

  mouseDown = false;

  constructor() { 
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100000);
    this.camera.position.z = 15000;
    this.camera.position.y = 1000;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.enablePan = false;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 50000;
    
    this.earth = new PlanetRenderer();
    this.earth.addToScene(this.scene);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
      window.requestAnimationFrame(() => this.animate());

      this.controls.update();
      this.earth.update();
      
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
