import React, { Component } from 'react';
import "./SortingVisualizer.css";

export class SortingVisualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            eventBus: props.eventBus,
            sorter: null,
            interval: null,
            intervalSpeed: 3,
        };

        this.resetArray = this.resetArray.bind(this);
        this.isSorted = this.isSorted.bind(this);
        this.sort = this.sort.bind(this);
        this.sort_bubble = this.sort_bubble.bind(this);
        this.beginSort = this.beginSort.bind(this);
        this.stopSorting = this.stopSorting.bind(this);
    }

    componentDidMount() {
        this.resetArray(90);
        this.state.eventBus.on("resetArray", (data) => this.resetArray(data.length));
        this.state.eventBus.on("sort", (data) => this.beginSort(data.algo));
    }

    componentWillUnmount() {
        this.state.eventBus.remove("resetArray");
        this.state.eventBus.remove("sort");
    }

    resetArray(length) {
        this.stopSorting();

        const array = [];
        for(let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(5,1000));
        }
        this.setState({array});
    }

    beginSort(algo) {
        if (this.state.sorter == null) {
            this.setState({sorter: this.sort_bubble()});
            this.setState({interval: setInterval(() => {this.sort()}, this.state.intervalSpeed)});
        } else {
            alert("Already sorting!");
        }
    }

    stopSorting() {
        if (this.state.sorter != null) {
            this.setState({sorter: null});
        }

        if (this.state.interval != null) {
            let interval = this.state.interval;
            clearInterval(interval);
            this.setState({interval: null});
        }
    }

    sort() {
        //console.log("SORTING!");
        if (this.state.sorter == null) {
            console.log("No sorter set.");
            this.stopSorting();
            return;
        }

        let retArr = this.state.sorter.next().value;
        //console.log(retArr);
        this.setState({array: retArr});

        if (this.isSorted()) {
            this.stopSorting();
            //alert("We are sorted now!!");
        }
    }


    * sort_bubble() {
        //console.log("Bubble sorting");
        let sortMe = this.state.array;

        for(let i = 0; i < sortMe.length - 1; i++) {
            for(let j = 0; j < sortMe.length - 1 - i; j++) {
                if (sortMe[j] > sortMe[j + 1]) {
                    let tmp = sortMe[j];
                    sortMe[j] = sortMe[j+1];
                    sortMe[j+1] = tmp;
                }

                //console.log("This is my array: " + sortMe);
                yield sortMe;
            }
        }

        yield sortMe;
    }

    isSorted() {
        let curSize = -Infinity;
        for(let i = 0; i < this.state.array.length; i++) {
            if (this.state.array[i] >= curSize) {
                curSize = this.state.array[i];
            } else {
                return false;
            }
        }

        return true;
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
              {array.map((value, idx) => (
                  <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                  </div>
              ))}
            </div>
        )
    }
}

export default SortingVisualizer

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}