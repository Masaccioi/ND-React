import React, { Component } from 'react';
import './App.css';
import Password from './password/password.js'
class App extends Component {
  constructor(){
    super()
    this.state = {
      visible: false,
      value:'',
      title: '请输入支付密码'
    }
    this.onClick = this.onClick.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onCancel () {
    this.setState({
      visible: false
    })
  }

  onClick () {
    this.setState({
      visible: true
    })
  }

  onChange (value) {
    if (value.length === 6) {
      if (value !== '123456') {
        this.setState({
          value: '',
          title: '请再次输入支付密码'
        })
      } else {
        this.setState({
          value: '',
          visible: false
        })
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.onClick() }>click</button>
        <Password
          value={ this.state.value }
          visible={ this.state.visible }
          onChange={ this.onChange }
          onCancel={ this.onCancel }
          title={ this.state.title }/> 
      </div>
    );
  }
}

export default App;
