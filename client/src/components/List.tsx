import React from "react";
import { ListItem } from "./ListItem";

type task = {
  id: number;
  text: string;
};

const List = () => {
  const [tasks, setTasks] = React.useState<task[]>([]);
  const [success, setSuccess] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const getData = () => {
    fetch("http://localhost/todo/server/show.php", {
      method: "get",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((content) => {
        if (!content.msg) {
          const array:task[] = [];
          content.data.forEach((item: task) => {
            array.push({ id: item.id, text: item.text });
          });
          setTasks(array);
        } else {
          setSuccess(false);
        }
      });
  };
  const insertData = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("task", inputRef.current?.value as string | Blob);
    await fetch("http://localhost/todo/server/add.php", {
      method: "post",
      mode: "cors",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        getData();
      });
  };
  const deleteData = async (id: number) => {
    const formData = new FormData();
    formData.append('id',String(id));
    await fetch('http://localhost/todo/server/delete.php', { method: 'post', mode: 'cors', body: formData })
      .then(res => res.json())
      .then(data => {
        if (!data.msg) {
          getData();
        } else alert('Database error')
      })
  }
  React.useEffect(() => getData(), []);
  return (
    <main className="List">
      <form onSubmit={insertData} className="Form">
        <input
          ref={inputRef}
          className="input"
          placeholder="Name your task here"
        />
        <button className="formButton" type="submit">
          Add
        </button>
      </form>
      <section className="listItems">
        {success ? (
          <>
            {tasks.map((item) => (
              <ListItem itemId={item.id} del={deleteData} key={item.id} task={item.text} />
            ))}
          </>
        ) : (
          <p>Cannot connect to database</p>
        )}
      </section>
    </main>
  );
};

export { List };
