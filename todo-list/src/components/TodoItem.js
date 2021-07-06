import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;
        // console.log(id);
        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div
                    className="remove"
                    onClick={e => {
                        // todo-item까지 event가 확산되는걸 방지
                        // onRemove 실행, onToggle 실행 안함
                        e.stopPropagation();
                        onRemove(id);
                    }}
                >
                    &times;
                </div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {checked && <div className="check-mark">&#x2713;</div>}
            </div>
        );
    }
}

export default TodoItem;
