import React, { Component } from 'react';
import FiveNumberSummary from './components/FiveNumberSummary';
import FrequencyTable from './components/FrequencyTable';


class Stat extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            disabled1: false,
            dataSet: '',
            dataList: [], //sorted list
            total: 0,
            mean: 0,
            populationSD: 0,
            sampleSD: 0,
            sampleVariance: 0,
            populationVariance: 0,
            Q1: 0,
            Q2: 0,
            Q3: 0,
            upperBound: 0,
            lowerBound: 0,
            skewness: '0',
            min: 0,
            max: 0,
            range: 0,
            outliers: '0',
            list: '0'

        }
    }

    handleChange = (e) => {    
        this.setState({dataSet: e.target.value, disabled1: false});  
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

        for (var a in temp) {
            top = top + ((temp[a] -  total/temp.length)*(temp[a] -  total/temp.length));
        }

        mean = total/temp.length;
        let sampleVariance = top/(temp.length-1);
        let populationVariance = top/(temp.length);
        let sampleSD = Math.sqrt(top/(temp.length-1));
        let populationSD = Math.sqrt(top/(temp.length));



        this.setState({
            total: total,
            mean: mean,
            populationVariance: populationVariance,
            sampleVariance: sampleVariance,
            sampleSD: sampleSD,
            populationSD: populationSD
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

    getOutliers = async () => {
        await this.quartile();
        
        let outliers = '';

        for (let i = 0; i < this.state.dataList.length; i++){
            if (this.state.lowerBound > this.state.dataList[i]){
                outliers = outliers + this.state.dataList[i] + ', '
            } 
            if (this.state.upperBound < this.state.dataList[i]){
                outliers = outliers + this.state.dataList[i] + ', '
            } 
        }
        if(outliers == '') {
            outliers = 'No outliers'
        } else {
            outliers = outliers.slice(0, -1);
            outliers = outliers.slice(0, -1);
        }

        this.setState({
            outliers: outliers
        })
    }

    maxMinRange = async () => {

        await this.getOutliers();
        
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

    getList = async () => {
        await this.maxMinRange();

        let list = '';

        for (let i = 0; i < this.state.dataList.length; i++){
            list = list + this.state.dataList[i] + ', ';
        }

        list = list.slice(0, -1);
        list = list.slice(0, -1);

        this.setState({
            list: list
        })
    }


    submitHandler = (e) => {
        e.preventDefault();
        this.getList();

        this.setState({
            disabled1: true
        })
    }

    render() { 
        return ( 
            <div className="container">

                <p><b>NOTE: </b>All the calculations are done using the formulas we were taught in lectures. Good luck with your mid-exam! <br/><i>work by - <a href="https://shehanx86.github.io/">Shehan bossa</a></i></p>

                       <h4>For Data Lists</h4>
                    <hr/>
                    <d1 className="row">
                    <form>
                    <p>Type your data set separated with commas. Dont put spaces </p>
                        <p>eg: <i>12,25,14,2,4 </i>
                        or <i>12.54,25,1.4,2,4.78</i></p>
                        <dd className="col-sm-3">Input data set:</dd>
                        <dd className="col-sm-9"><input type='text' id='dataSet' onChange={this.handleChange}/></dd>
        
                        <button className='btn btn-success' disabled={this.state.disabled1} onClick={this.submitHandler}>Get Answers</button>
                        <br/>
                        <br/>

                        <dd className="col-sm-3">Your date set in ascending order</dd>
                        <dd className="col-sm-9">{this.state.list}</dd>

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

                        <dt className="col-sm-3">Q1</dt>
                        <dd className="col-sm-9">{this.state.Q1}</dd>

                        <dt className="col-sm-3">Q2 (Median)</dt>
                        <dd className="col-sm-9">{this.state.Q2}</dd>

                        <dt className="col-sm-3">Q3</dt>
                        <dd className="col-sm-9">{this.state.Q3}</dd>

                        <dt className="col-sm-3">IQR (Q3 - Q1)</dt>
                        <dd className="col-sm-9">{this.state.Q3 - this.state.Q1}</dd>

                        <dt className="col-sm-3">Upper bound</dt>
                        <dd className="col-sm-9">{this.state.upperBound}</dd>

                        <dt className="col-sm-3">Lower bound</dt>
                        <dd className="col-sm-9">{this.state.lowerBound}</dd>

                        <dt className="col-sm-3">Outliers</dt>
                        <dd className="col-sm-9">{this.state.outliers}</dd>

                        <dt className="col-sm-3">Skeweness</dt>
                        <dd className="col-sm-9">{this.state.skewness}</dd>

                        <dt className="col-sm-3">Variance (SAMPLE)</dt>
                        <dd className="col-sm-9">{this.state.sampleVariance}</dd>

                        <dt className="col-sm-3">Standerd deviation (SAMPLE)</dt>
                        <dd className="col-sm-9">{Math.sqrt(this.state.sampleVariance)}</dd>

                        <dt className="col-sm-3">Variance (POPULATION)</dt>
                        <dd className="col-sm-9">{this.state.populationVariance}</dd>

                        <dt className="col-sm-3">Standerd deviation (POPULATION)</dt>
                        <dd className="col-sm-9">{Math.sqrt(this.state.populationVariance)}</dd>


                    </form>
                    </d1>

            </div>
         );
    }
}
 
export default Stat;