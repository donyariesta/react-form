import React, { Component } from 'react';
import * as ef from './react-form';
import PropTypes from 'prop-types';


class Form extends Component{

    componentDidMount(){
        const dataValue = ef.getInputsValue(this.props.children);
        this.setDataValue(dataValue);
    }

    setDataValue(dataValue){
        this.setState({dataValue});
        this.props.stateSetter(dataValue);
    }

    handler(e){
        let {dataValue} = this.state;
        const eName = e.target.name;
        dataValue[eName] = ef.getTargetDataValue(e, dataValue[eName]);
        this.setDataValue(dataValue);
    }

    render(){
        let _props = {...this.props};

        const children = ef.modifyInputs((child, key) => {
            return React.cloneElement(child, {
                key: key,
                onChange: this.handler.bind(this)
            })
        }, this.props.children);
        ['stateSetter'].map(x => delete _props[x]);

        return ( <form {..._props}>{children}</form> );
    }
}
export default Form;

Form.propTypes = {
  stateSetter: PropTypes.func.isRequired,
}
