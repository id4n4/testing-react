import { useState } from "react";

interface item_i {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [list, setList] = useState<Array<item_i>>([]);

  const addTask = () => {
    setList([...list, { id: list.length, text: "New task", completed: false }]);
  };

  const editTask = (index: number, value: string) => {
    const newList = [...list];
    newList[index].text = value;
    setList(newList);
  };
  const deleteTask = (index: number) => {
    const newList = list.filter((item) => item.id !== index);
    setList(newList);
  };
  const completeTask = (index: number) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };
  return (
    <div>
      <button onClick={addTask}>Add task</button>
      <ul role="list">
        {list.map((item, index) => (
          <li key={item.id}>
            <input
              type="text"
              placeholder="new task"
              value={item.text}
              onChange={(e) => editTask(index, e.target.value)}
            />
            <button onClick={() => deleteTask(item.id)}>Delete</button>
            <button onClick={() => completeTask(item.id)}>
              {item.completed ? "Completed" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
