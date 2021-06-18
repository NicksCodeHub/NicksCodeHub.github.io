import { Planet } from '../models/planet.model'
import * as THREE from 'three';
import { Color, Vector3 } from 'three';
import { DisplayProperties } from './displayProperties';

export class PlanetRenderer {
    public planet: Planet = null;

    private mesh:THREE.Mesh = null;
    private meridians:THREE.Line = null;
    // Three axes, x, y, and z
    private axes:THREE.ArrowHelper[] = new Array(3);

    private precision:number = 24;
    private globals:DisplayProperties;


    constructor(globals:DisplayProperties) {
        this.globals = globals;
        
        this.createPlanet();
        this.createMeridians();
        this.createAxis();

    }

    addToScene(scene:THREE.Scene) {
        scene.add(this.mesh);
        scene.add(this.meridians);

        scene.add(this.axes[0]);
        scene.add(this.axes[1]);
        scene.add(this.axes[2]);
    }

    update() {
        let deltaTime = this.globals.delta_Time;

        // rotate the planet
        let rotational_speed = (Math.PI*2*deltaTime*this.globals.time_step)/this.planet.spin_rate;

        this.mesh.rotateOnWorldAxis(new THREE.Vector3(0,0,1), rotational_speed);
        this.meridians.rotateOnWorldAxis(new THREE.Vector3(0,0,1), rotational_speed);
        this.axes.forEach(function (axis) {
            axis.rotateOnWorldAxis(new THREE.Vector3(0,0,1), rotational_speed);
        });
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

    private createPlanet() {
        this.planet = new Planet("Earth", 6371, 86400, 23*(2*Math.PI)/360);

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
        this.mesh.rotateY(Math.PI);
        this.mesh.rotateX(-Math.PI/2);
    }

    private createMeridians() {
        let geometry = new THREE.Geometry();

        let matLine = new THREE.LineBasicMaterial( {
            color: 0xff0000
        } );
    
        // How high the meridian lines will be drawn.
        let attitude = this.planet.radius + 100;

        // How often a line should be drawn. This is measured in degrees (longitude and latitude)
        // Make sure this is a divisor of 360
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
        this.meridians.rotateY(Math.PI);
        this.meridians.rotateX(-Math.PI/2);
        //this.meridians.rotateX(this.planet.tilt);
    }

    private createAxis() {
        let axis_size = this.planet.radius * 1.15;
        let head_size = axis_size / 20;
        let head_width = head_size / 2;

        this.axes[0] = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), axis_size, 0xff0000, head_size, head_width);
        this.axes[1] = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), axis_size, 0x00ff00, head_size, head_width);
        this.axes[2] = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), axis_size, 0x0000ff, head_size, head_width);
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
