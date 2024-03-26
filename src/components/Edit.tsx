import { useParams, useNavigate } from "react-router-dom";
import { todoType } from "../interfaces/todo";
import { useEffect, useState } from "react";
import { BASE_API } from "../constants/base";

const Edit = () => {
    let { id } = useParams();

    const [todo, setTodo] = useState<todoType>({
        id: 0,
        todo: "",
    });

    const getTodo = async () => {
        try {
            const response = await fetch(`${BASE_API}/todos/${id}`, {
                method: "GET",
            });
            let todo = await response.json();
            setTodo(todo);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo((previousState) => ({
            ...previousState,
            todo: event.target.value,
        }));
    };

    const navigate = useNavigate();

    const saveTodo = async () => {
        try {
            await fetch(`${BASE_API}/todos/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ todo: todo.todo }),
            }).then(()=> {
                navigate('/')
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getTodo();
    }, [id]);

    return (
        <div className="editBlock">
            <h1>Edit</h1>
            <input
                type="text"
                value={todo?.todo}
                onChange={(e) => {
                    onChangeTodo(e);
                }}
            />
            <button
                onClick={() => {
                    saveTodo();
                }}
                disabled={!todo?.todo}
            >
                Save
            </button>
        </div>
    );
};

export default Edit;
