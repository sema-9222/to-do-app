import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  const [checked, setChecked] = useState([]);

  function onClick(e) {
    setList([
      ...list,
      { id: Date.now(), name: newTodo, isCompleted: false, isEdited: false },
    ]);
    setNewTodo("");
  }

  useEffect(() => {
    setChecked(list.filter((item) => item.isCompleted === true));
  }, [list]);

  const completed = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const edit = (id, oldtodo) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isEdited: !item.isEdited } : item
      )
    );
    setNewTodo("");
    setTodoEdit(oldtodo);
  };

  const save = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, isEdited: !item.isEdited, name: todoEdit }
          : item
      )
    );
  };

  const remove = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const done = checked.length;
  const waiting = list.length - checked.length;
  const current = new Date();
  const date = `${current.toLocaleString("en-us", { month: "long" })}`;
  const day = `${current.getDate()}`;
  const year = `${current.getFullYear()}`;

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div className="App">
      <div className="container">
        <div className="form">
          <h1>TO-DO LIST</h1>
          <h4>Add To-Do's</h4>
          <input
            className="inputT"
            type="text"
            placeholder="What to do?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="btn-1" onClick={onClick}>
            ADD
          </button>
          <h2 className="date">
            <span className="day">{day}</span> {date} {year}
          </h2>
        </div>

        <div className="list-container">
          <div className="list">
            <div className="head">
              <h2 className="task">Tasks</h2>
              {done === 1 ? (
                <h4>
                  <span>{done}</span> Task is done.
                </h4>
              ) : (
                <h4>
                  <span>{done}</span> Tasks are done.
                </h4>
              )}
              {waiting === 1 ? (
                <h4>
                  <span>{waiting}</span> Task is waiting.
                </h4>
              ) : (
                <h4>
                  <span>{waiting}</span> Tasks are waiting.
                </h4>
              )}
            </div>

            {list.map((item) => (
              <div className="todos" key={item.id}>
                <input
                  onChange={() => completed(item.id)}
                  value={item.isCompleted}
                  className="checkbox"
                  type="checkbox"
                />
                {item.isEdited ? (
                  <input
                    className="inputT"
                    type="text"
                    value={todoEdit}
                    style={{
                      height: "50%",
                      display: "flex",
                      alignContent: "center",
                    }}
                    onChange={(e) => setTodoEdit(e.target.value)}
                  />
                ) : (
                  <span
                    className={`${item.isCompleted ? "item line" : "item"}`}
                  >
                    {item.name}
                  </span>
                )}
                <div className="icon">
                  {item.isEdited ? (
                    <Icon.CheckSquareFill
                      cursor="pointer"
                      onClick={() => save(item.id)}
                    />
                  ) : (
                    <Icon.PencilSquare
                      cursor="pointer"
                      onClick={() => edit(item.id, item.name)}
                    />
                  )}
                  <Icon.TrashFill
                    cursor="pointer"
                    onClick={() => remove(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
