import React, { Component } from 'react';
import * as ef from './react-form';
import PropTypes from 'prop-types';


class Form extends Component{

    componentWillMount(){
        this.modifyChild(this.props);
    }

    componentDidMount(){
        const dataValue = ef.getInputsValue(this.props.children);
        this.setDataValue(dataValue);
    }

    componentWillReceiveProps(nextProps){
        this.modifyChild(nextProps);
    }


    /*
    find and modify the input type children by adding an event listener
    */
    modifyChild(props){
        const children = ef.modifyInputs((child, key) => {
            if(
                child.type === 'button'
                || (
                    child.type === 'input'
                    && (
                        child.props.type === 'submit'
                        || child.props.type === 'button'
                    )
                )
            ){
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
        }, props.children);
        this.setState({children});
    }

    /*
    store updated input values to the state and execute stateSetter to sync
    parent's component state
    @dataValue : updated input value
    */
    setDataValue(dataValue){
        this.setState({dataValue});
        this.props.stateSetter(dataValue);
    }

    /*
    handle onChange event to get updated value and store it in the input values
    collection
    @e : event
    */
    handler(e){
        let {dataValue} = this.state;
        const eName = e.currentTarget.name;

        // ensure the target have a name attribute
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
