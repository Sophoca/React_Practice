import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    // 키를 입력할 때마다 rerendering 되는 것을 방지
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }
    render() {
        const { todos, onToggle, onRemove } = this.props;
        const todoList = todos.map(todo => (
            <TodoItem {...todo} onToggle={onToggle} onRemove={onRemove} key={todo.id} />
        ));
        return <div>{todoList}</div>;
    }
}

export default TodoItemList;
