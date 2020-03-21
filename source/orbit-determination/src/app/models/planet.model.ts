export class Planet {
    // Name of the planet this model represents
    name:String;
    // Radius of the planet in kilometers
    radius:number;
    // Time in seconds to complete one revolution
    spin_rate:number;

    constructor(name:String, radius:number, spin_rate:number = 0) {
        this.name = name;
        this.radius = radius;
        this.spin_rate = spin_rate;
    }
}
