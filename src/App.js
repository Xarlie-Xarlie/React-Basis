import React from "react";
import api from "./services/api";

import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    //using node

    // const form = document.querySelector('form');
    // const title = form.title.value.trim();
    // const url = form.url.value.trim();
    // const techs = form.techs.value.trim();

    // const project = {
    //   title: title ? title : `New Project created at timestamp: ${Date.now()}`,
    //   url: url ? url : "https://github.com/xarlie-xarlie/React-Basis",
    //   techs: techs? [...techs.split(',')] : ["NodeJS", "ReactJS", "React Native"]
    // }

    //using mock api
    const response = await api.post("repositories", {
      title: "Charlie Charlie",
      url: "https://github.com/xarlie-xarlie/React-Basis",
      techs: ["NodeJS", "ReactJS", "React Native"]
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    //using node

    // api.delete(`/repositories/${id}`);
    //   .then(() => {
    //     const removedProject = repositories.findIndex(repository => repository.id === id);
    //     repositories.splice(removedProject, 1);
    //   }).catch(err => console.log(err));

    //using mock api
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

        )}
      </ul>
      {/* 
        for node and user interation
      <form>
        <input name="title" type="text" placeholder="Title of project"/>
        <input name="url" type="text" placeholder="URL of project"/>
        <input name="techs" type="text" placeholder="techs"/>
      </form>
      */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
