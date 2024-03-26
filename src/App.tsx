import { useEffect, useState } from "react";
import { BASE_API } from "./constants/base";

const App = () => {
    interface todaType {
        id: number;
        todo: string;
    }

    const [todos, setTodos] = useState<todaType[]>([]);

    const getTodos = async () => {
        const response = await fetch(`${BASE_API}/todos`, {
            method: "GET",
        });

        let todos = await response.json();

        setTodos(todos);
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="todoBlock">
            <h1>Todo list</h1>
            {todos.map((todo: todaType) => (
                <div key={todo.id} className="todo">
                    <h3>{todo.todo}</h3>
                    <button>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default App;
