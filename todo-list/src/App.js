import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
    id = 3;
    state = {
        input: '',
        todos: [
            { id: 0, text: 'text1', cheecked: false },
            { id: 1, text: 'text2', checked: true },
            { id: 2, text: 'text3', checked: false }
        ]
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '',
            // React에서는 절대 배열에 요소 추가할 때 push 사용 안함
            // 불변성에 어긋남 (concat은 새로운 배열 생성)
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    };

    handleToggle = id => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];
        // 배열 값을 직접 수정하면 절대 안됨 -> 새롭게 선언
        const nextTodos = [...todos];
        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };
        this.setState({
            todos: nextTodos
        });
    };

    handleRemove = id => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    };

    render() {
        const { input, todos } = this.state;
        const { handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove } = this;
        return (
            <>
                <TodoListTemplate
                    form={
                        <Form
                            value={input}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                            onCreate={handleCreate}
                        />
                    }
                >
                    <TodoItemList
                        todos={todos}
                        onToggle={handleToggle}
                        onRemove={handleRemove}
                    ></TodoItemList>
                </TodoListTemplate>
            </>
        );
    }
}

export default App;
