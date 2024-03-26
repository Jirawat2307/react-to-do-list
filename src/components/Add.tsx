import { useState } from "react";
import { BASE_API } from "../constants/base";

type PropsType = {
    props: any;
};

const Add = ({ props }: PropsType) => {
    const [todo, setTodo] = useState<string>("");

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    };

    const onAddTodo = async () => {
        try {
            await fetch(`${BASE_API}/todos`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ todo: todo }),
            });
            props(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginBottom: "1rem", width: "100%", display: "flex", alignContent: "center" }}>
            <input
                style={{ width: "100%", marginRight: "0.5rem" }}
                value={todo}
                onChange={(e) => {
                    onChange(e);
                }}
                required
            />
            <button
                style={{ flexShrink: 0 }}
                disabled={!todo}
                onClick={() => {
                    onAddTodo();
                }}
            >
                Add
            </button>
        </div>
    );
};

export default Add;
