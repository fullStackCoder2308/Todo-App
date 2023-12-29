import React, { useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoArr, setTodoArr] = useState([]);

  const addTodo = () => {
    // setTodoArr([...todoArr,todo]);
    setTodoArr((todoArr) => {
      const newArr = [...todoArr, todo];
      console.log(newArr);
      setTodo("");
      return newArr;
    });
  };

  const removeTodo = (i) => {
    let newArr = todoArr.filter((itr,id) => {
      return i != id;
    })
    setTodoArr(newArr);
  }


  return (
    <>
      <div className="container-1">
        <input
          type="text"
          className="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="container-2">
        {todoArr != [] &&
          todoArr.map((itr, ind) => (
            <>
              <p key={ind}>
                <div>{itr}</div>
                <button onClick={() => removeTodo(ind)}>Remove</button>
              </p>
            </>
          ))}
      </div>
    </>
  );
};

export default Todo;
