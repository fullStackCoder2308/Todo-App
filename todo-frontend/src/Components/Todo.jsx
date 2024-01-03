import React, { useEffect, useState } from "react";
import { authToken } from "./Signin";
const Todo = () => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [post, setPost] = useState(false);
  console.log(authToken);

  const addTodo = async () => {
    //setTodoArr is async should avoid doing below line
    // setTodoArr([...todoArr,todo]);

    // this is slightly better way, but ideally we should use async await
    // setTodoArr((todoArr) => {
    //   const newArr = [...todoArr, todo];
    //   console.log(newArr);
    //   setTodo("");
    //   return newArr;
    // });

    // for backend, here is the below code.
    await fetch("http://localhost:3000/user/add-todo", {
      method: "POST",
      body: JSON.stringify({
        title: todo,
        description: description,
      }),
      headers: {
        "Authorization":`Bearer ${authToken}`,
        "Content-type": "application/json",
      },
    });
    setPost(true);
    setTodo("");
    setDescription("");
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/user/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }
  
      const data = await res.json();
      return data.todos;
    } catch (error) {
      console.error(error.message);
      throw new Error('Error fetching todos');
    }
  
  };
  useEffect(() => {
    const fetchUserTodo = async () => {
      const mytodo = await fetchTodos();
      console.log(mytodo);
      setTodoArr(mytodo);
    };
    fetchUserTodo();
  }, [post]);

  const removeTodo = (i) => {
    let newArr = todoArr.filter((itr, id) => {
      return i != id;
    });
    setTodoArr(newArr);
  };

  return (
    <>
      <div className="container-1">
        <input
          type="text"
          className="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          type="text"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="container-2">
        {todoArr != [] &&
          todoArr.map((itr, ind) => (
            <>
              <p key={ind}>
                <div>{itr.title}</div>
                <div>{itr.description}</div>
                <button onClick={() => removeTodo(ind)}>Remove</button>
              </p>
            </>
          ))}
      </div>
    </>
  );
};

export default Todo;
