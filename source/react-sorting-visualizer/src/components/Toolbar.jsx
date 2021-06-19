import React, { Component } from 'react'
import "./Toolbar.css";

export class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventBus: props.eventBus,
            arrayLength: 90,
        };

        // bind functions
        this.resetArray = this.resetArray.bind(this);
        this.changeArraySize = this.changeArraySize.bind(this);
        this.sort = this.sort.bind(this);
    }

    sort(algorithm) {
        console.log("Wanting to sort by " + algorithm);
        this.state.eventBus.dispatch("sort", {algo:algorithm});
    }

    resetArray() {
        this.state.eventBus.dispatch("resetArray", {length:this.state.arrayLength});
    }

    changeArraySize(e) {
        this.setState({arrayLength: e.target.value})
    }

    render() {
        return (
            <div className="toolbar-container">
                <button className="toolbar-button" onClick={this.resetArray}>Reset Array</button>
                <input name="array-length" type="text" className="toolbar-textinput"
                    value={this.state.arrayLength}
                    onChange={this.changeArraySize}
                />
                <button className="toolbar-button" disabled></button>
                <button className="toolbar-button" onClick={() => this.sort("bubble")}>Bubble Sort</button>
                <button className="toolbar-button" onClick={() => this.sort("insertion")}>Insertion Sort</button>
                <button className="toolbar-button" onClick={() => this.sort("merge")}>Merge Sort</button>
                <button className="toolbar-button" onClick={() => this.sort("quick")}>Quick Sort</button>
            </div>
        )
    }
}

export default Toolbar
