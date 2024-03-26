import { useEffect, useState } from "react";
import { BASE_API } from "./constants/base";
import { Link } from "react-router-dom";
import { TodoType } from "./interfaces/todo";
import Add from "./components/Add";

const App = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);

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

    const deleteTodo = async (id: number) => {
        try {
            await fetch(`${BASE_API}/todos/${id}`, {
                method: "DELETE",
            });
            getTodos();
        } catch (error) {
            console.log("error", error);
        }
    };

    const isAddFinish = (data: boolean) => {
        setIsAdd(data);
    };

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        getTodos();
    }, [isAdd]);

    return (
        <div className="todoBlock">
            <h1>Todo list</h1>
            <Add props={isAddFinish} />
            {isLoading && "Loading"}
            {!isLoading &&
                todos.map((todo: TodoType) => (
                    <div key={todo.id} className="todo">
                        <h3>{todo.todo}</h3>
                        <div style={{ display: "flex", alignContent: "center" }}>
                            <Link to={`/todo/${todo.id}`}>
                                <button style={{ marginRight: "0.5rem" }}>Edit</button>
                            </Link>
                            <button
                                onClick={() => {
                                    deleteTodo(todo.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default App;
