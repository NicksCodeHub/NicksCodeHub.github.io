import { Planet } from '../models/planet.model'
import * as THREE from 'three';
import { Color } from 'three';
import { DisplayProperties } from './displayProperties';

export class PlanetRenderer {
    public planet: Planet = null;

    public color: Color;

    private mesh1:THREE.Mesh = null;
    private mesh2:THREE.Mesh = null;
    private precision:number = 24;
    private clock = new THREE.Clock();
    private globals:DisplayProperties;

    constructor(globals:DisplayProperties) {
        this.globals = globals;
        this.planet = new Planet("Earth", 6371, 86400, 23*(2*Math.PI)/360);
        this.color = new Color(0x009933);


        let geometry = new THREE.SphereGeometry(this.planet.radius, this.precision, this.precision);
        //let material1 = new THREE.MeshBasicMaterial({color: this.color, wireframe: false});
        let material1 = new THREE.MeshPhongMaterial();
        material1.map = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'.png');
        material1.bumpMap = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'_Bump.png');
        material1.bumpScale = 10;

        material1.specularMap = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'_Specular.png');
        material1.specular = new THREE.Color(0x222222);

        this.mesh1 = new THREE.Mesh(geometry, material1);
        this.mesh1.rotateZ(this.planet.tilt);

        let material2 = new THREE.MeshBasicMaterial({color: 0x880000, wireframe: true});
        this.mesh2 = new THREE.Mesh(geometry, material2);
        this.mesh2.rotateZ(this.planet.tilt);
    }

    addToScene(scene:THREE.Scene) {
        scene.add(this.mesh1);
        scene.add(this.mesh2);
    }

    update() {
        let deltaTime = this.clock.getDelta();

        // rotate the planet
        let rotational_speed = (Math.PI*2*deltaTime*this.globals.time_step)/this.planet.spin_rate;

        this.mesh1.rotateY(rotational_speed);
        this.mesh2.rotateY(rotational_speed);
    }
}
