import { useEffect, useState } from "react";
import { BASE_API } from "./constants/base";
import { Link } from "react-router-dom";
import { todoType } from "./interfaces/todo";

const App = () => {
    const [todos, setTodos] = useState<todoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getTodos = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_API}/todos`, {
                method: "GET",
            });
            let todos = await response.json();
            setTodos(todos);
            setIsLoading(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="todoBlock">
            <h1>Todo list</h1>
            {isLoading && "Loading"}
            {!isLoading &&
                todos.map((todo: todoType) => (
                    <div key={todo.id} className="todo">
                        <h3>{todo.todo}</h3>
                        <Link to={`/todo/${todo.id}`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default App;
