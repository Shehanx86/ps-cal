import React, { Component } from 'react';
import FiveNumberSummary from './components/FiveNumberSummary';


class Stat extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            dataSet: '',
            dataList: []
         }
    }

    handleChange = (e) => {    
        //e.preventDefault();
        this.setState({dataSet: e.target.value});  
        
    }



    submitHandler = (e) => {
        e.preventDefault();
        let temp = new Array();

        console.log("haloo")

        temp = this.state.dataSet.split(",");
        
        for (var a in temp) {
            temp[a] =  parseFloat(temp[a])
        }
        console.log(temp)
        temp.sort((a, b) => a - b);
        console.log(temp)

        this.setState({
            dataList: temp
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

                <FiveNumberSummary data={this.state.dataList}/>

                    
            </div>
         );
    }
}
 
export default Stat;