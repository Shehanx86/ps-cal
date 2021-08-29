import React, { Component } from 'react'

export default class fiveNumberSummary extends Component {
    constructor(props) {
        super(props)

        this.state={
            max: 0,
            min: 0,
            range: 0,
            Q1: 0,
            Q2: 0,
            Q3: 0,
            Array1: [] 
        }
    }

    getArray() {
        let Array1 = this.props.data;

        for (var a in Array1) {
            Array1[a] = Array1[a] + ", "
        }

        this.setState({
            Array1: Array1
        })
    }


    getStats= (e) =>{
        e.preventDefault();
        this.quartile();
        this.maxMinRange();
        this.getArray();
    }

    getDecimal(n) {
        return (n - Math.floor(n));
    }

    getWhole(n) {
        return (n - this.getDecimal(n));
    }

    quartile = () => {
        let q_1_place = (this.props.data.length + 1)/4;
        let q_2_place = (this.props.data.length + 1)/2;
        let q_3_place = ((this.props.data.length + 1)*3)/4;

        let q_1_decimal = this.getDecimal(q_1_place);
        let q_1_whole = this.getWhole(q_1_place);

        let q_2_decimal = this.getDecimal(q_2_place);
        let q_2_whole = this.getWhole(q_2_place);

        let q_3_decimal = this.getDecimal(q_3_place);
        let q_3_whole = this.getWhole(q_3_place);

        let Q1 = this.props.data[q_1_whole - 1] + (q_1_decimal * (this.props.data[q_1_whole] - this.props.data[q_1_whole - 1]));
        let Q2 = this.props.data[q_2_whole - 1] + (q_2_decimal * (this.props.data[q_2_whole] - this.props.data[q_2_whole - 1]));
        let Q3 = this.props.data[q_3_whole - 1] + (q_3_decimal * (this.props.data[q_3_whole] - this.props.data[q_3_whole - 1]));

        this.setState({
            Q1: Q1,
            Q2: Q2,
            Q3: Q3,
            
        })
    }

    maxMinRange = () => {
        
        let newMin = this.props.data[0];
        let newMax = this.props.data[0];

        for ( let i = 0; i < this.props.data.length; i++ ) {

            if(newMin > this.props.data[i]) {
                newMin = this.props.data[i];
                console.log(newMin)
            }
            if(newMax < this.props.data[i]) {
                newMax = this.props.data[i];
            }
        }

        this.setState({
            max: newMax,
            min: newMin,
            range: newMax - newMin
        })
    }


    render() {

        return (
                <div style={{marginTop:'20px'}} className="container">
                    <button className='btn btn-success' onClick={this.getStats}>Get stats</button>
                    <h4>Five number summary</h4>
                        <hr/>
                        <d1 className="row">
                        <dt className="col-sm-3">Data set in ascending order</dt>
                        <dd className="col-sm-9">{this.state.Array1}</dd>

                        <dt className="col-sm-3">Q1</dt>
                        <dd className="col-sm-9">{this.state.Q1}</dd>

                        <dt className="col-sm-3">Q2</dt>
                        <dd className="col-sm-9">{this.state.Q2}</dd>

                        <dt className="col-sm-3">Q3</dt>
                        <dd className="col-sm-9">{this.state.Q3}</dd>

                        <dt className="col-sm-3">Max</dt>
                        <dd className="col-sm-9">{this.state.max}</dd>

                        <dt className="col-sm-3">Min</dt>
                        <dd className="col-sm-9">{this.state.min}</dd>

                        <dt className="col-sm-3">Range</dt>
                        <dd className="col-sm-9">{this.state.range}</dd>

                </d1>
                </div>
        )
    }
}

