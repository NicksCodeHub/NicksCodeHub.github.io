import { Orbit } from '../models/orbit.model'
import * as THREE from 'three';
import { Color, Vector3 } from 'three';
import { DisplayProperties } from './displayProperties';

export class OrbitRenderer {
    public orbit: Orbit = null;

    private mesh:THREE.Mesh = null;
    private globals:DisplayProperties;


    constructor(globals:DisplayProperties) {
        this.globals = globals;

        this.orbit = new Orbit();

    }

    addToScene(scene:THREE.Scene) {

    }

    update() {
        let deltaTime = this.globals.delta_Time;
    }
}
