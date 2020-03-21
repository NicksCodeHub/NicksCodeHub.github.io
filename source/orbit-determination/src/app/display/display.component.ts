import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Vector2 } from 'three';

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
  mesh1 = null;
  mesh2 = null;

  constructor() { 
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.camera.position.z = 30;
    this.camera.position.y = 30;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    let geometry = new THREE.SphereGeometry(10,25,25);
    const material1 = new THREE.MeshBasicMaterial({color: 0x2099aa, wireframe: false});
    this.mesh1 = new THREE.Mesh(geometry, material1);

    geometry = new THREE.SphereGeometry(10.1,25,25);
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

      this.mesh1.rotation.y += 0.01;
      this.mesh2.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
