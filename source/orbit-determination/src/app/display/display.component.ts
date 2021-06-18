import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PlanetRenderer } from './planetRenderer';
import { OrbitRenderer } from './orbitRenderer';
import { DisplayProperties } from './displayProperties';

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
  orbit1:OrbitRenderer = null;

  mouseDown = false;

  private globals = new DisplayProperties();
  private clock = new THREE.Clock();

  constructor() { 
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100000);
    this.camera.up = new THREE.Vector3(0,0,1);
    this.camera.position.x = 15000;
    this.camera.position.z = 1000;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.enablePan = false;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 10000;
    this.controls.maxDistance = 50000;
    
    this.earth = new PlanetRenderer(this.globals);
    this.earth.addToScene(this.scene);

    this.orbit1 = new OrbitRenderer(this.globals);
    this.orbit1.addToScene(this.scene);

    let ambiantLight = new THREE.AmbientLight( 0x707070 ); // soft white light
    this.scene.add(ambiantLight);

    let sun = new THREE.PointLight(0xffffff, 1);
    sun.position.x = 149040000;
    
    this.scene.add(sun);
    

  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
      window.requestAnimationFrame(() => this.animate());

      this.globals.delta_Time = this.clock.getDelta();
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
    // Create a line pointing out of the origin
    /*let matLine = new THREE.LineBasicMaterial( {

        color: 0x0ff000,
        linewidth: 500

    } );

    let line:THREE.Line;
    let line_geometry = new THREE.Geometry();
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));
    console.log(this.earth.pointToLongitude(90));
    line_geometry.vertices.push(this.earth.pointToLongitude(90).setLength(7000));

    line = new THREE.Line(line_geometry, matLine);

    this.scene.add(line);*/

    //this.earth.toggleMeridians(this.scene);
  }
  
  onMouseMove(e) {
  }
}
