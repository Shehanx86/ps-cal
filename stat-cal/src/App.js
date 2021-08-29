import React, { Component } from 'react';
import FiveNumberSummary from './components/FiveNumberSummary';


class Stat extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            dataSet: '',
            dataList: [],
            total: 0,
            mean: 0,
            variance: 0,
            standard_deviation: 0
         }
    }

    handleChange = (e) => {    
        //e.preventDefault();
        this.setState({dataSet: e.target.value});  
        
    }



    submitHandler = (e) => {
        e.preventDefault();
        let temp = new Array();

        temp = this.state.dataSet.split(",");
        let total = 0;
        let mean;
        let top = 0;

        for (var a in temp) {
            temp[a] =  parseFloat(temp[a])
            total = total + temp[a]
        }

        for (var a in temp) {
            top = top + ((temp[a] -  total/temp.length)*(temp[a] -  total/temp.length));
        }


        temp.sort((a, b) => a - b);
        console.log(temp)


        this.setState({
            dataList: temp,
            total: total,
            mean: total/temp.length,
            variance: top/(temp.length-1),
            standard_deviation: Math.sqrt(top/(temp.length-1))
          });

    }

    render() { 
        return ( 
            <div className="container">
                <form>
                    Input data set :  
                    <input type='text' id='dataSet' onChange={this.handleChange}/>
                    <button className='btn btn-success' onClick={this.submitHandler}>submit</button>
                    <br/>
                    Your data set : 
                    {this.state.dataSet}
                </form>

                <FiveNumberSummary data={this.state}/>

                    
            </div>
         );
    }
}
 
export default Stat;