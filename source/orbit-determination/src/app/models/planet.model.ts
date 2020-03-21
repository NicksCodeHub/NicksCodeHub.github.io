export class Planet {
    // Name of the planet this model represents
    name:String;
    // Radius of the planet in kilometers
    radius:number;
    // Time in seconds to complete one revolution
    spin_rate:number;
    // tilt of the plant with relation to it's parent body, measured in radians
    tilt:number;

    constructor(name:String, radius:number, spin_rate:number = 0, tilt = 0) {
        this.name = name;
        this.radius = radius;
        this.spin_rate = spin_rate;
        this.tilt = tilt;
    }
}
