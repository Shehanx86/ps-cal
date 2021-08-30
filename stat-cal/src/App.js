import React, { Component } from 'react';
import FiveNumberSummary from './components/FiveNumberSummary';
import FrequencyTable from './components/FrequencyTable';


class Stat extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            dataSet: '',
            dataList: [], //sorted list
            total: 0,
            mean: 0,
            variance: 0,
            standard_deviation: 0,
            Q1: 0,
            Q2: 0,
            Q3: 0,
            upperBound: 0,
            lowerBound: 0,
            skewness: '',
            min: 0,
            max: 0,
            range: 0,

        }
    }

    handleChange = (e) => {    
        this.setState({dataSet: e.target.value});  
    }

    setArray = () => {
        let temp = new Array();

        temp = this.state.dataSet.split(",");
        let total = 0;

        for (var a in temp) {
            temp[a] =  parseFloat(temp[a])
            total = total + temp[a]
        }

        temp.sort((a, b) => a - b);

        this.setState({
            dataList: temp,
            dataList1: temp,
            total: total
          });
    }

    calculateMeanTotalVarianceSD = async () => {

        await this.setArray();

        let temp = this.state.dataList
        let total = this.state.total;
        let mean = 0;
        let top = 0;
        let variance = 0;
        let SD = 0;

        for (var a in temp) {
            top = top + ((temp[a] -  total/temp.length)*(temp[a] -  total/temp.length));
        }

        mean = total/temp.length;
        variance = top/(temp.length-1);
        SD = Math.sqrt(top/(temp.length-1));


        this.setState({
            total: total,
            mean: mean,
            variance: variance,
            standard_deviation: SD
          });
    }

    getDecimal = (n) => {
        return (n - Math.floor(n));
    }

    getWhole = (n) => {
        return (n - this.getDecimal(n));
    }

    quartile = async () => {

        await this.calculateMeanTotalVarianceSD();

        let q_1_place;
        let q_2_place;
        let q_3_place;

        q_1_place = (this.state.dataList.length + 1)/4;
        q_2_place = (this.state.dataList.length + 1)/2;
        q_3_place = ((this.state.dataList.length + 1)*3)/4;
        
        let q_1_decimal = this.getDecimal(q_1_place);
        let q_1_whole = this.getWhole(q_1_place);

        let q_2_decimal = this.getDecimal(q_2_place);
        let q_2_whole = this.getWhole(q_2_place);
        let q_3_decimal = this.getDecimal(q_3_place);
        let q_3_whole = this.getWhole(q_3_place);
        
        let Q1,Q2,Q3;

            Q1 = this.state.dataList[q_1_whole - 1] + (q_1_decimal * (this.state.dataList[q_1_whole] - this.state.dataList[q_1_whole - 1]));
            Q2 = this.state.dataList[q_2_whole - 1] + (q_2_decimal * (this.state.dataList[q_2_whole] - this.state.dataList[q_2_whole - 1]));
            console.log(this.state.dataList[q_2_whole - 1])
            Q3 = this.state.dataList[q_3_whole - 1] + (q_3_decimal * (this.state.dataList[q_3_whole] - this.state.dataList[q_3_whole - 1]));

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

    maxMinRange = async () => {

        await this.quartile();
        
        let newMin = this.state.dataList[0];
        let newMax = this.state.dataList[0];

        for ( let i = 0; i < this.state.dataList.length; i++ ) {

            if(newMin > this.state.dataList[i]) {
                newMin = this.state.dataList[i];
            }
            if(newMax < this.state.dataList[i]) {
                newMax = this.state.dataList[i];
            }
        }

        this.setState({
            max: newMax,
            min: newMin,
            range: newMax - newMin
        })
    }


    submitHandler = (e) => {
        e.preventDefault();
        this.maxMinRange();

    }

    render() { 
        return ( 
            <div className="container">
                       <h4>For data sets</h4>
                    <hr/>
                    <d1 className="row">
                    <form>
                        
                        <dd className="col-sm-3">Input data set</dd>
                        <dd className="col-sm-9"><input type='text' id='dataSet' onChange={this.handleChange}/></dd>

                        <dd className="col-sm-3">Your date set in ascending order</dd>
                        <dd className="col-sm-9">{this.state.Array1}</dd>

                        <button className='btn btn-success' onClick={this.submitHandler}>submit</button>

                        <dt className="col-sm-3">Max</dt>
                        <dd className="col-sm-9">{this.state.max}</dd>

                        <dt className="col-sm-3">Min</dt>
                        <dd className="col-sm-9">{this.state.min}</dd>

                        <dt className="col-sm-3">Range</dt>
                        <dd className="col-sm-9">{this.state.range}</dd>

                        <dt className="col-sm-3">Total</dt>
                        <dd className="col-sm-9">{this.state.total}</dd>

                        <dt className="col-sm-3">Mean</dt>
                        <dd className="col-sm-9">{this.state.mean}</dd>

                        <dt className="col-sm-3">Variance</dt>
                        <dd className="col-sm-9">{this.state.variance}</dd>

                        <dt className="col-sm-3">Standerd deviation</dt>
                        <dd className="col-sm-9">{this.state.standard_deviation}</dd>

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


                    </form>
                    </d1>

            </div>
         );
    }
}
 
export default Stat;