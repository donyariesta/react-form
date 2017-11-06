import React, { Component } from 'react';
import * as ef from './react-form';
import PropTypes from 'prop-types';


class Form extends Component{

    componentWillMount(){
        const children = ef.modifyInputs((child, key) => {
            if(
                child.type === 'button'
                || (
                    child.type === 'input'
                    && (
                        child.props.type === 'submit'
                        || child.props.type === 'button'
                    )
                )){
                return React.cloneElement(child, {
                    key: key,
                    onClick: this.handler.bind(this)
                })
            }else{
                return React.cloneElement(child, {
                    key: key,
                    onChange: this.handler.bind(this)
                })
            }
        }, this.props.children);
        this.setState({children});
    }

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
        const eName = e.currentTarget.name;
        if(typeof(eName) !== 'undefined' && eName!==''){
            dataValue[eName] = ef.getTargetDataValue(e, dataValue[eName]);
            this.setDataValue(dataValue);
        }
    }

    render(){
        let _props = {...this.props};
        const {children} = this.state;
        ['stateSetter'].map(x => delete _props[x]);
        return ( <form {..._props}>{children}</form> );
    }
}
export default Form;

Form.propTypes = {
  stateSetter: PropTypes.func.isRequired,
}
