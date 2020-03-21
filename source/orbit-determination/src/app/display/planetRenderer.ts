import { Planet } from '../models/planet.model'
import * as THREE from 'three';
import { Color } from 'three';

export class PlanetRenderer {
    public planet: Planet = null;

    public color: Color;

    private mesh1 = null;
    private mesh2 = null;

    private precision:number = 12;

    constructor() {
        this.planet = new Planet("Earth", 6371, 86400);
        //this.planet = new Planet("Earth", 63, 86400);
        this.color = new Color(0x009933);


        let geometry = new THREE.SphereGeometry(this.planet.radius, this.precision, this.precision);
        const material1 = new THREE.MeshBasicMaterial({color: this.color, wireframe: false});
        this.mesh1 = new THREE.Mesh(geometry, material1);

        geometry = new THREE.SphereGeometry(this.planet.radius,this.precision,this.precision);
        const material2 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh2 = new THREE.Mesh(geometry, material2);
    }

    addToScene(scene:THREE.Scene) {
        scene.add(this.mesh1);
        scene.add(this.mesh2);
        
    }

    update() {
        console.log("test");
    }
}
