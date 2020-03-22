import { Planet } from '../models/planet.model'
import * as THREE from 'three';
import { Color, Vector3 } from 'three';
import { DisplayProperties } from './displayProperties';

export class PlanetRenderer {
    public planet: Planet = null;

    public color: Color;

    private mesh:THREE.Mesh = null;
    private meridians:THREE.Line = null;

    private precision:number = 24;
    private clock = new THREE.Clock();
    private globals:DisplayProperties;


    constructor(globals:DisplayProperties) {
        this.globals = globals;
        this.planet = new Planet("Earth", 6371, 86400, 23*(2*Math.PI)/360);
        this.color = new Color(0x009933);


        let geometry = new THREE.SphereGeometry(this.planet.radius, this.precision, this.precision);

        let material = new THREE.MeshPhongMaterial();
        material.map = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'.png');
        material.bumpMap = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'_Bump.png');
        material.bumpScale = 10;

        material.specularMap = THREE.ImageUtils.loadTexture('assets/Planets/'+ this.planet.name +'_Specular.png');
        material.specular = new THREE.Color(0x222222);

        material.polygonOffset = true;
        material.polygonOffsetFactor = 1;
        material.polygonOffsetUnits = 1;

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotateX(this.planet.tilt);


        this.createMeridians();
        
    }

    addToScene(scene:THREE.Scene) {
        scene.add(this.mesh);
    }

    update() {
        let deltaTime = this.clock.getDelta();

        // rotate the planet
        let rotational_speed = (Math.PI*2*deltaTime*this.globals.time_step)/this.planet.spin_rate;

        this.mesh.rotateY(rotational_speed);
        this.meridians.rotateY(rotational_speed);
    }

    /*
        Returns a vector3 that points in the direction of the longitude referenced by degrees_east
    */
    pointToLongitude(degrees_east:number) {
        let radians = (degrees_east * (2*Math.PI)) / 360;
        console.log(radians);
        
        // Vector that points to the 0 degrees east longitude
        let ret = new THREE.Vector3(-1,0,0);

        ret = ret.applyAxisAngle(new Vector3(0,1,0), radians);
        ret.applyQuaternion(this.mesh.quaternion);

        return ret;
    }

    private createMeridians() {
        let geometry = new THREE.Geometry();

        let matLine = new THREE.LineBasicMaterial( {
            color: 0xff0000
        } );
    
        let attitude = this.planet.radius + 100;
        let precision = 15;

        // Latitudes at 15 degree increments
        for(let lat = precision; lat <= 180; lat+=precision) {
            let lat_angle = (lat * (Math.PI * 2)) / 360;
            let radius = attitude * Math.sin(lat_angle);
            let height = attitude * Math.cos(lat_angle);
            let prev_lat_angle = ((lat - precision) * (Math.PI * 2)) / 360;
            let prev_radius = attitude * Math.sin(prev_lat_angle);
            let prev_height = attitude * Math.cos(prev_lat_angle);
            let x = 0;
            let z = 0;

            // Create longitudes
            for (let long = 0; long < 360; long+=precision) {
                let angle = (long * (Math.PI * 2)) / 360;
                let next_angle = ((long + precision) * (Math.PI * 2)) / 360;
    
                // Add previous rings, current long
                x = -prev_radius * Math.cos(angle);
                z = prev_radius * Math.sin(angle);
                geometry.vertices.push(new THREE.Vector3(x,prev_height,z));  

                // Add previous rings, next long
                x = -prev_radius * Math.cos(next_angle);
                z = prev_radius * Math.sin(next_angle);
                geometry.vertices.push(new THREE.Vector3(x,prev_height,z));  

                // Add cuurrent rings, next long
                x = -radius * Math.cos(next_angle);
                z = radius * Math.sin(next_angle);
                geometry.vertices.push(new THREE.Vector3(x,height,z));  
            }
        }
        

        this.meridians = new THREE.Line(geometry, matLine);
        this.meridians.rotateX(this.planet.tilt);
    }

    toggle:boolean = false;
    toggleMeridians(scene:THREE.Scene) {
        if (this.toggle == false) {
            scene.add(this.meridians);
        } else {
            scene.remove(this.meridians);
        }

        this.toggle = !this.toggle;
    }
}
