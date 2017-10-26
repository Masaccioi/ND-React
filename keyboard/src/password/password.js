import React, { PropTypes } from 'react'
import { intlShape, defineMessages, FormattedMessage } from 'react-intl'
import IntlUtil from 'i18n/intlUtil'
import styles from './password.css'
import Popup from 'antd-mobile/lib/popup'
import closeIcon from './img/redenvelopel_close_icon_normal.png'
import backspaceIcon from './img/redenvelopel_keyboard_Backspace_normal.png'
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let maskProps
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault()
  }
}

class Keyboard extends React.Component {
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

    render() {
        return (<div>
            <div className={ styles.numberKeyboardHeader }>
                <img src={ closeIcon } className= { styles.closeIcon } onClick={ this.props.onCancel }/>
                <p className={ styles.numberKeyboardTitle }>{ this.props.title }</p>
            </div>
            <div className={ styles.numberList }>
                <div className={ styles.numberListWrapper }>
                    {/* todo 用循环渲染 */}
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 0 ? '*' : '' }</span></div>
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 1 ? '*' : '' }</span></div>
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 2 ? '*' : '' }</span></div>
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 3 ? '*' : '' }</span></div>
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 4 ? '*' : '' }</span></div>
                    <div className={ styles.numberItem + ' ' + (this.state.result.length > 0 ? styles.active : '') }><span>{this.state.result.length > 5 ? '*' : '' }</span></div>
                </div>
            </div>
            <table className={ styles.numberKeyboardBody } >
                <tbody>
                    <tr>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '1') }>1</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '2') }>2</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '3') }>3</td>
                    </tr>
                    <tr>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '4') }>4</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '5') }>5</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '6') }>6</td>
                    </tr>
                    <tr>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '7') }>7</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '8') }>8</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '9') }>9</td>
                    </tr>
                    <tr>
                        <td className={ styles.numberKeyboardItem }></td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onClick.bind(this, '0') }>0</td>
                        <td className={ styles.numberKeyboardItem } onClick={ this.onDelete }>
                            <img className={ styles.backspaceIcon } src={ backspaceIcon }/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>)
    }
}
Keyboard.propTypes = {
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string
}
export default class Password extends React.Component {

    constructor(props) {
        super(props)
        const self = this
        this.onClear = (value, title) => {
            Popup.show(<Keyboard
                onChange={ this.props.onChange } 
                onCancel={ this.props.onCancel }
                value={ value }
                title={ title || this.props.title }/>, { animationType: 'slide-up', maskProps, onMaskClose: this.props.onCancel, maskClosable:true })
        }
    }

    componentDidMount() {
        if(this.props.visible) {
            Popup.show(<Keyboard 
                onChange={ this.props.onChange } 
                onCancel={ this.props.onCancel }
                value={ this.props.value }
                title={ this.props.title }/>, { animationType: 'slide-up', maskProps, onMaskClose: this.props.onCancel, maskClosable:true })
        } else {
            Popup.hide()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.visible && nextProps.visible) {
            Popup.show(<Keyboard 
                onChange={ nextProps.onChange } 
                onCancel={ nextProps.onCancel }
                value={ nextProps.value }
                title={ nextProps.title }/>, { animationType: 'slide-up', maskProps, onMaskClose: nextProps.onCancel, maskClosable:true })
        } 
        if (this.props.visible && !nextProps.visible) {
            Popup.hide()
        }
        
    }
    
    componentWillUnmount() {
        Popup.hide()
    }

    render() {
        return <div />
    }
}

Password.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    value: PropTypes.string
}