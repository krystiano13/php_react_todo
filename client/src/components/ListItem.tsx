import React from "react";

interface Task {
  task: string;
  del: (id: number) => Promise<void>;
  itemId: number;
}

const ListItem: React.FC<Task> = ({ task, del, itemId }) => {
  return (
    <div className="ListItem">
      <p className="taskText">{task}</p>
      <button onClick={() => del(itemId)} className="taskButton">
        Done
      </button>
    </div>
  );
};

export { ListItem };
