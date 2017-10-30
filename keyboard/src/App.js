import React, { Component } from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import closeIcon from './img/redenvelopel_close_icon_normal.png'
import backspaceIcon from './img/redenvelopel_keyboard_Backspace_normal.png'

class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result:[]
    }
    // this.props.onClick = this.props.onClick.bind(this)
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
                  <div className={ 'numberItem' + ' ' + (this.state.result.length > 0 ? 'active' : '') }><span>{this.state.result.length > i ? '*' : '' }</span></div>
                )
              })
            }
          </div>
        </div>
        <table className='numberKeyboardBody'>
          <tbody>
            <tr>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>1</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>2</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>3</td>
            </tr>
            <tr>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>1</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>2</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>3</td>
            </tr>
            <tr>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>1</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>2</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('1') }>3</td>
            </tr>
            <tr>
              <td className={ 'numberKeyboardItem' }></td>
              <td className={ 'numberKeyboardItem' } onClick={ this.props.onClick('0') }>0</td>
              <td className={ 'numberKeyboardItem' } onClick={ this.onDelete }>
                  <img className={ 'backspaceIcon' } src={ backspaceIcon }/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      groupVisibled: false
    }
    this.onClick = () => {}
  }
  render() {
    return (
      <div className="App">
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => { this.setState({ groupVisibled: !this.state.groupVisibled })}}>click</button>
        {
          this.state.groupVisibled ? 
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <h1>Fading at Initial Mount</h1>
          </ReactCSSTransitionGroup> : ''
        } 
        <Keyboard onClick={() => this.onClick()}/>
      </div>
    );
  }
}

export default App;
