# react-form
Simplify your work at handling the form especially its data. no more headache for handling the state.


## Usage

```js

import React, { Component } from 'react';
import Form from 'react-form';

class Test extends Component{
    submit(e){
        e.preventDefault();
        // you can get the form data by accessing class state "this.state.input"
    }

    render(){
        return(

            <Form
                onSubmit={this.submit.bind(this)} // binding a submit function
                stateSetter={(input) => {this.setState({input})}} // needed to set your state
            >
                /*
                * write all your input field components here..
                * example <input type="text" defaultValue="john doe" name="fullname" />
                */
            </Form>
        );
    }
}

```


## License

MIT © [Dony Ariesta](http://abdireka.com)
