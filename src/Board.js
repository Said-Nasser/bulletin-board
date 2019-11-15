import React, { Component } from 'react';
// import { FaPlus } from 'react-icons/fa';
import Note from './Note';
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    id: this.nextId(),
                    zIndex: this.nextZIndex(),
                    note: 'New Note'
                }
            ]
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
        this.nextZIndex = this.nextZIndex.bind(this)
        this.maxZIndex = this.maxZIndex.bind(this)
        this.increaseZIndex = this.increaseZIndex.bind(this)
    }
    add(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes, {
                    id: this.nextId(),
                    zIndex: this.nextZIndex(),
                    note: text
                }
            ]
        }))
    }
    nextZIndex() {
        this.zIndex = this.zIndex || 1;
        return this.zIndex++;
    }
    maxZIndex() {
        return function() {
            var arr = [];
            this.state.notes.forEach((note, i) => {
                arr.push(note.zIndex);
            })
            return Math.max(...arr);
        }.call(this)
    }
    increaseZIndex(i) {
        console.log('click event');
        var newIndex = this.maxZIndex() + 1;
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : { ...note, zIndex: newIndex }
            )
        }))
        return newIndex;     
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }
    update(newText, i) {
        console.log('updating item at index ', i, newText);
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : { ...note, note: newText }
            )
        }))
    }
    remove(id) {
        console.log('removing item at ', id);
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    eachNote(note, i) {
        return (
            <Note key={note.id} index={note.id} zIndex={note.zIndex} onPop={this.increaseZIndex}
                onChange={this.update} onRemove={this.remove} onAdd={this.add}>
                {note.note}
            </Note>
        )
    }
    render() {
        return (
            <div className='Board'>
                {/* <button onClick={this.add.bind(null, 'New Note')} id='add'>< FaPlus /></button> */}
                {/* <Note key={0} index={0} zIndex={0} onClick={this.maxZIndex}
                onChange={this.update} onRemove={this.remove} onAdd={this.add}>
                    {'New Note'}
                </Note> */}
                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }

}

export default Board;
