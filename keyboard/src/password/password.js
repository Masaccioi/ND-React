import React, { Component } from 'react';
import './password.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import closeIcon from './img/redenvelopel_close_icon_normal.png'
import backspaceIcon from './img/redenvelopel_keyboard_Backspace_normal.png'

class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: props.value
    }
    this.onClick = this.onClick.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete () {
    let str = this.state.result
    if (str.length === 0) {
      return
    }
    str = str.substr(0, str.length - 1)
    this.setState({ result: str })
    this.props.onChange(str)
  }

  onClick (value) {
    let str = this.state.result
    if (str.length < 6) {
        str = str + value
        this.setState({ result: str })
        this.props.onChange( str )
    } else {
        return
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ result: nextProps.value })
  }

  renderNumber(i) {
    if (i === 10) {
      return (
        <td className={ 'numberKeyboardItem' }></td>
      )
    } else if (i === 11){
      return (
        <td className={ 'numberKeyboardItem' } onClick={ () => this.onDelete() }>
          <img className={ 'backspaceIcon' } src={ backspaceIcon }/>
        </td>
      )
    } else {
      return (
        <td className={ 'numberKeyboardItem' } onClick={ () => this.onClick(i) }>{i}</td>
      )
    }
  }

  render() {
    return (
      <div>
        <div className='numberKeyboardHeader'>
          <img src={ closeIcon } className= { 'closeIcon' } onClick={ this.props.onCancel }/>
          <p className='numberKeyboardTitle'>{ this.props.title }</p>
        </div>
        <div className='numberList'>
          <div className={ 'numberListWrapper' }>
            {
              [0,1,2,3,4,5].map(i => {
                return (
                  <div key={i} className={ 'numberItem' + ' ' + (this.state.result.length > 0 ? 'active' : '') }><span>{this.state.result.length > i ? '*' : '' }</span></div>
                )
              })
            }
          </div>
        </div>
        <table className='numberKeyboardBody'>
          <tbody>
            <tr>
              {this.renderNumber(1)}
              {this.renderNumber(2)}
              {this.renderNumber(3)}
            </tr>
            <tr>
              {this.renderNumber(4)}
              {this.renderNumber(5)}
              {this.renderNumber(6)}
            </tr>
            <tr>
              {this.renderNumber(7)}
              {this.renderNumber(8)}
              {this.renderNumber(9)}
            </tr>
            <tr>
              {this.renderNumber(10)}
              {this.renderNumber(0)}
              {this.renderNumber(11)}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class Password extends Component {
  constructor(props){
    super(props)
    this.maskClose = this.maskClose.bind(this)
  }
  maskClose () {
    if (this.props.maskClose || !this.props.maskClose) {
      this.props.onCancel()
    }
  }

  render() {
    return (
      <div>
        <div className={'password' + ' ' + (this.props.visible ? 'show' : '')}>
          <div className='mask' onClick={() => this.maskClose() }></div>
          <div className={'keyboard' + ' ' + (this.props.visible ? 'in' : 'out')}>
            <Keyboard onChange={this.props.onChange}
              onCancel={this.props.onCancel}
              title={this.props.title}
              value={this.props.value}
            />
          </div>
        </div> 
      </div>
    );
  }
}

export default Password;
