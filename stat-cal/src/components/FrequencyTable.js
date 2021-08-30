import React, { Component } from 'react'

export default class FrequencyTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            dataList: '',
            frequencyList: '',
            dataListArray: [],
            frequencyListArray: [],
            totalFrequency: 0,
            totalData: 0,
            mean: 0,
            variance: 0,
            standard_deviation: 0

        }
    }

    handleChange1 = (e) =>{
        this.setState({
            dataList: e.target.value
        })
    }

    handleChange2 = (e) =>{
        this.setState({
            frequencyList: e.target.value
        })
    }

    frequencyListArrayCreate = async () => {
        let temp = new Array();
        let total = 0;

        temp = this.state.frequencyList.split(",");

        for (var a in temp) {
            temp[a] =  parseFloat(temp[a]);
            total = total + temp[a];
        }

        this.setState({
            frequencyListArray: temp,
            totalFrequency: total
          });
    }

    dataListarrayCreate = async () => {
        let temp = new Array();
        let total = 0;

        temp = this.state.dataList.split(",");

        for (var a in temp) {
            temp[a] =  parseFloat(temp[a])
            total = total + temp[a]
        }

        this.setState({
            dataListArray: temp,
            totalData: total
          });
    }

    getMean = async () => {
        await this.dataListarrayCreate();
        await this.frequencyListArrayCreate();

        let top = 0;
        let mean = 0;

        for(let i = 0; i < this.state.dataListArray.length; i++){
            top += (this.state.dataListArray[i]*this.state.frequencyListArray[i]);
        }

        mean = top/this.state.totalFrequency;

        this.setState({
            mean: mean
        })

        return mean;
    }

    getVariance = async () => {
        let mean = await this.getMean();
        let top = 0;
        let totalFrequency = this.state.totalFrequency
        let variance = 0;

        for(let i = 0; i < this.state.dataListArray.length; i++){
            top += ((this.state.dataListArray[i] - mean)*(this.state.dataListArray[i] - mean))*this.state.frequencyListArray[i];
        }

        console.log(top)

        variance = top/(totalFrequency-1);

        this.setState({
            variance: variance
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.dataListarrayCreate();
        this.frequencyListArrayCreate();
        this.getVariance();

    }

    render() {
        return (
                <div className="container">
                    <h4>For Frequency Table</h4>
                    <hr/>
                    <d1 className="row">
                    <form>
                        
                        <dd className="col-sm-3">Input data list</dd>
                        <dd className="col-sm-9"><input type='text' id='dataList' onChange={this.handleChange1}/></dd>

                        <dd className="col-sm-3">Input frequency list</dd>
                        <dd className="col-sm-9"><input type='text' id='frequencyList' onChange={this.handleChange2}/></dd>
                        
                        <button className='btn btn-success' onClick={this.submitHandler}>Get Answers</button>
                        <br/>
                        <br/>

                        <dt className="col-sm-3">Mean</dt>
                        <dd className="col-sm-9">{this.state.mean}</dd>

                        <dt className="col-sm-3">Variance</dt>
                        <dd className="col-sm-9">{this.state.variance}</dd>

                        <dt className="col-sm-3">Standerd deviation</dt>
                        <dd className="col-sm-9">{this.state.standard_deviation}</dd>

                    </form>
                    </d1>
                </div>
        )
    }
}
