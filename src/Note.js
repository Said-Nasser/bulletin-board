import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FaTrash } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaThumbtack } from 'react-icons/fa';
import { FiSave } from "react-icons/fi";


class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            zIndex: this.props.zIndex,
            colors: ['#F55D3E', '#878E88', '#F7CB15', '#FFFFFF', '#76BED0', '#F0F3BD', '#00BFB2'],
            style: {}
        }
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.randomBetween = this.randomBetween.bind(this);
        this.randomColor = this.randomColor.bind(this);
        this.increaseZIndex = this.increaseZIndex.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        // this.shiftX = 0;
        // this.shiftY = 0;
    }
    
    componentWillMount() {
        this.setState(prevState => ({
            ...prevState, style: {
                    left: this.randomBetween(0, window.innerWidth - 200, 'px'),
                    top: this.randomBetween(0, window.innerHeight - 200, 'px'),
                    transform: `rotate(${this.randomBetween(-15, 15, 'deg')})`,
                    backgroundColor: this.randomColor(),
                    zIndex: this.state.zIndex
            }
        }))
        // this.state.style = {
        //     left: this.randomBetween(0, window.innerWidth - 200, 'px'),
        //     top: this.randomBetween(0, window.innerHeight - 200, 'px'),
        //     transform: `rotate(${this.randomBetween(-15, 15, 'deg')})`,
        //     backgroundColor: this.randomColor(),
        //     zIndex: this.state.zIndex,
        // }
        // this.updateStyle()
    }
    randomColor() {
        return this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    }
    randomBetween(x, y, s) {
        return x + Math.ceil(Math.random() * (y - x)) + s;
    }
    updateStyle(
        left = this.state.style.left,
        top = this.state.style.top,
        transform = this.state.style.transform,
        backgroundColor = this.state.style.backgroundColor,
        zIndex = this.state.zIndex,
        // hidden = false
    ) {
        this.state.style = {
            left: left,
            top: top,
            transform: transform,
            backgroundColor: backgroundColor,
            zIndex: zIndex,
            // hidden: hidden
        };
    }
    increaseZIndex(event) {
        this.setState(prevState => ({
            ...prevState, zIndex: this.props.onPop(this.props.index)
        }), function () {
            this.updateStyle()
        }.bind(this))
    }
    add(event) {
        // event.stopPropagation();
        this.props.onAdd('New Note');
    }
    edit(event) {
        // event.stopPropagation();
        console.log("edit");
        this.setState({
            editing: true
        })
    }
    remove(event) {
        // event.stopPropagation();
        this.props.onRemove(this.props.index)
    }
    save(e) {
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
        })
    }

    /**======================================================= */
    /**======================================================= */
    /**======================================================= */
    onMouseDown(event) {
        console.log('mouse down');
        ReactDOM.findDOMNode(this).addEventListener('mousemove', this.onMouseMove)
        ReactDOM.findDOMNode(this).addEventListener('mouseup', this.onMouseUp)
        /** ----------------------------- */
        let clientX = event.clientX;
        let clientY = event.clientY;
        this.shiftX = clientX - ReactDOM.findDOMNode(this).getBoundingClientRect().left;
        this.shiftY = clientY - ReactDOM.findDOMNode(this).getBoundingClientRect().top;
        this.setState((prevState) => ({
            ...prevState, style: {
                ...this.state.style,
                left: clientX  - this.shiftX + 'px',
                top: clientY - this.shiftY + 'px'
            }
        }))
        console.log(clientX);
        console.log(ReactDOM.findDOMNode(this).getBoundingClientRect().left);
        console.log(clientY);
        console.log(ReactDOM.findDOMNode(this).getBoundingClientRect().top);


    }
    onMouseMove(event) {
        console.log('mouse move');
        console.log(event.clientX, event.clientY);
        let clientX = event.clientX;
        let clientY = event.clientY;
        this.setState((prevState) => ({
            ...prevState, style: {
                ...this.state.style,
                left: clientX - this.shiftX + 'px',
                top: clientY - this.shiftY + 'px'
            }    
        }))
    }
    onMouseUp(event) {
        console.log('mouse up');
        ReactDOM.findDOMNode(this).removeEventListener('mousemove', this.onMouseMove);
        ReactDOM.findDOMNode(this).onmouseup = null;
    }
    onDragStart (event) {
        return false;
    }
    /**======================================================= */
    /**======================================================= */
    /**======================================================= */



    renderForm() {
        return (
            <div className='note' style={this.state.style} onClick={this.increaseZIndex}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input} />
                    <button>< FiSave /></button>
                </form>
            </div>
        )
    }
    renderDisplay() {
        return (
            <div className='note' style={this.state.style} onClick={this.increaseZIndex}>
                <div className="pin" onMouseDown={this.onMouseDown} onDragStart={this.onDragStart}><FaThumbtack /></div>
                <div className='actions d-flex justify-content-between px-0'>
                    <button id='plus' onClick={this.add}> <FaPlus /> </button>
                    <span>
                        <button onClick={this.edit}> <FaPencilAlt /> </button>
                        <button onClick={this.remove}> <FaTrash /> </button>
                    </span>
                </div>
                <p>{this.props.children}</p>
            </div>
        );
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}

export default Note;