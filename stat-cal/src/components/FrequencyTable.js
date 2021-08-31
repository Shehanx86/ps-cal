import React, { Component } from 'react'

export default class FrequencyTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            disabled: false,
            dataList: '',
            frequencyList: '',
            dataListArray: [],
            frequencyListArray: [],
            totalFrequency: 0,
            totalData: 0,
            mean: 0,
            sampleVariance: 0,
            populationVariance: 0

        }
    }

    handleChange1 = (e) =>{
        this.setState({
            dataList: e.target.value,
            disabled: false
        })
    }

    handleChange2 = (e) =>{
        this.setState({
            frequencyList: e.target.value,
            disabled: false
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
        let totalFrequency = this.state.totalFrequency;

        for(let i = 0; i < this.state.dataListArray.length; i++){
            top += ((this.state.dataListArray[i] - mean)*(this.state.dataListArray[i] - mean))*this.state.frequencyListArray[i];
        }

        console.log(top)

        let sampleVariance = top/(totalFrequency-1);
        let populationVariance = top/(totalFrequency);

        this.setState({
            sampleVariance: sampleVariance,
            populationVariance: populationVariance
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.dataListarrayCreate();
        this.frequencyListArrayCreate();
        this.getVariance();

        this.setState({
            disabled: true
        })

    }


    render() {
        return (
                <div className="container">
                    <h4>For Frequency Table</h4>
                    <hr/>
                    <d1 className="row">
                    <form>
                    <p>Type your data list and frequency list inside relevant input fields respectively, separated with commas. Dont put spaces </p>
                        <p>eg: data list - <i>1,2,3,4,5   </i>
                        frequency list -  <i>6,7,8,9,10</i></p>
                        <dd className="col-sm-3">Input data list:</dd>
                        <dd className="col-sm-9"><input type='text' id='dataList' onChange={this.handleChange1}/></dd>

                        <dd className="col-sm-3">Input frequency list:</dd>
                        <dd className="col-sm-9"><input type='text' id='frequencyList' onChange={this.handleChange2}/></dd>
                        
                        <button className='btn btn-success' disabled={this.state.disabled} onClick={this.submitHandler}>Get Answers</button>
                        <br/>
                        <br/>

                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">x</th>
                                <th scope="col">frequency</th>
                                <th scope="col">fx</th>
                                </tr>
                            </thead>
                            <tbody>
                                  
                                {this.state.dataListArray.map((x, i) => (

                                        <tr key={i}>
                                        <td scope="row">{x}</td>
                                        <td scope="row">{this.state.frequencyListArray[i]}</td>
                                        <th scope="row">{this.state.frequencyListArray[i]*x}</th>
                                        </tr>
                                      
                                  ))} 
                                        <tr>
                                        <th scope="row">Σ(x) = {this.state.totalData}</th>
                                        <th scope="row">Σ(f) = {this.state.totalFrequency}</th>
                                        <th scope="row">Σ(fx) = {this.state.totalFrequency*this.state.totalData}</th>
                                        </tr>   

                            </tbody>
                            </table>

                        <dt className="col-sm-3">Mean</dt>
                        <dd className="col-sm-9">Σ(fx)/Σ(f) = {this.state.mean}</dd>
                        <br/>
                        <p>If the question does not mention if sample or population, GET SAMPLE VALUES. DEFAULT IS SAMPLE</p>
                        <h3>IF DATA SET IS SAMPLE</h3>
                        <dt className="col-sm-3">Variance</dt>
                        <dd className="col-sm-9">{this.state.sampleVariance}</dd>

                        <dt className="col-sm-3">Standerd deviation</dt>
                        <dd className="col-sm-9">{Math.sqrt(this.state.sampleVariance)}</dd>
                        <br/>
                        
                        <h3>IF DATA SET IS POPULATION</h3>
                        <dt className="col-sm-3">Variance</dt>
                        <dd className="col-sm-9">{this.state.populationVariance}</dd>

                        <dt className="col-sm-3">Standerd deviation</dt>
                        <dd className="col-sm-9">{Math.sqrt(this.state.populationVariance)}</dd>

                    </form>
                    </d1>
                </div>
        )
    }
}
