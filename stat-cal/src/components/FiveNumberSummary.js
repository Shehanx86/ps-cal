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
            Array1: [],
            upperBound: 0,
            lowerBound: 0,
            skewness: '',
            mean: 0,
            variance: 0,
            standard_deviation: 0

        }
    }

    // getVariance = () => {
    //     let Array1 = this.props.data.dataList;
    //     let top = 0;
    //     let variance = 0;

    //     for (var a in Array1) {
    //         top = top + ((Array1[a] + this.props.data.mean)*(Array1[a] + this.props.data.mean))
    //     }

    //     variance = top/this.props.data.dataList.length

    //     this.setState({
    //         variance: variance,
    //         standard_deviation: variance^0.5
    //     })

    // }

    getArray() {
        let Array1 = this.props.data.dataList;
        let top = 0;
        let variance = 0;

        for (var a in Array1) {
            Array1[a] = Array1[a] + ", ";
            // top = top + ((Array1[a] + this.props.data.mean)*(Array1[a] + this.props.data.mean));
            // console.log("hi" +top)
        }

        // variance = top/this.props.data.dataList.length

        this.setState({
            Array1: Array1,
            // variance: variance,
            // standard_deviation: variance^0.5
        })
    }

    getStats= (e) =>{
        e.preventDefault();
        this.quartile();
        this.maxMinRange();
        this.getArray();
        // this.getVariance();
    }

    getDecimal = (n) => {
        return (n - Math.floor(n));
    }

    getWhole = (n) => {
        return (n - this.getDecimal(n));
    }

    quartile = () => {
        let q_1_place = (this.props.data.dataList.length + 1)/4;
        let q_2_place = (this.props.data.dataList.length + 1)/2;
        let q_3_place = ((this.props.data.dataList.length + 1)*3)/4;

        let q_1_decimal = this.getDecimal(q_1_place);
        let q_1_whole = this.getWhole(q_1_place);

        let q_2_decimal = this.getDecimal(q_2_place);
        let q_2_whole = this.getWhole(q_2_place);

        let q_3_decimal = this.getDecimal(q_3_place);
        let q_3_whole = this.getWhole(q_3_place);

        let Q1 = this.props.data.dataList[q_1_whole - 1] + (q_1_decimal * (this.props.data.dataList[q_1_whole] - this.props.data.dataList[q_1_whole - 1]));
        let Q2 = this.props.data.dataList[q_2_whole - 1] + (q_2_decimal * (this.props.data.dataList[q_2_whole] - this.props.data.dataList[q_2_whole - 1]));
        let Q3 = this.props.data.dataList[q_3_whole - 1] + (q_3_decimal * (this.props.data.dataList[q_3_whole] - this.props.data.dataList[q_3_whole - 1]));

        let skewness 

        if((Q3 - Q2) > (Q2 - Q1)) {
            skewness = 'Positive skewed (right skewed distribution)'
        } else if ((Q3 - Q2) < (Q2 - Q1)) {
            skewness = 'Negative skewed (left skewed distribution)'
        } else{
            skewness = 'Symmetric distribution'
        }

        this.setState({
            Q1: Q1,
            Q2: Q2,
            Q3: Q3,
            upperBound: Q3 + 1.5*(Q3-Q1),
            lowerBound: Q1 - 1.5*(Q3-Q1),
            skewness: skewness
            
        })
    }

    maxMinRange = () => {
        
        let newMin = this.props.data.dataList[0];
        let newMax = this.props.data.dataList[0];

        for ( let i = 0; i < this.props.data.dataList.length; i++ ) {

            if(newMin > this.props.data.dataList[i]) {
                newMin = this.props.data.dataList[i];
                console.log(newMin)
            }
            if(newMax < this.props.data.dataList[i]) {
                newMax = this.props.data.dataList[i];
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

                        <dt className="col-sm-3">Max</dt>
                        <dd className="col-sm-9">{this.state.max}</dd>

                        <dt className="col-sm-3">Min</dt>
                        <dd className="col-sm-9">{this.state.min}</dd>

                        <dt className="col-sm-3">Range</dt>
                        <dd className="col-sm-9">{this.state.range}</dd>

                        <dt className="col-sm-3">Total</dt>
                        <dd className="col-sm-9">{this.props.data.total}</dd>

                        <dt className="col-sm-3">Mean</dt>
                        <dd className="col-sm-9">{this.props.data.mean}</dd>

                        <dt className="col-sm-3">Variance</dt>
                        <dd className="col-sm-9">{this.props.data.variance}</dd>

                        <dt className="col-sm-3">Standerd deviation</dt>
                        <dd className="col-sm-9">{this.props.data.standard_deviation}</dd>

                        <dt className="col-sm-3">Q1</dt>
                        <dd className="col-sm-9">{this.state.Q1}</dd>

                        <dt className="col-sm-3">Q2</dt>
                        <dd className="col-sm-9">{this.state.Q2}</dd>

                        <dt className="col-sm-3">Q3</dt>
                        <dd className="col-sm-9">{this.state.Q3}</dd>

                        <dt className="col-sm-3">IQR (Q3 - Q1)</dt>
                        <dd className="col-sm-9">{this.state.Q3 - this.state.Q1}</dd>

                        <dt className="col-sm-3">Upper bound</dt>
                        <dd className="col-sm-9">{this.state.upperBound}</dd>

                        <dt className="col-sm-3">Lower bound</dt>
                        <dd className="col-sm-9">{this.state.lowerBound}</dd>

                        <dt className="col-sm-3">Skeweness</dt>
                        <dd className="col-sm-9">{this.state.skewness}</dd>

                </d1>
                </div>
        )
    }
}

