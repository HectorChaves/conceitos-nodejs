const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  
  const repository = repositories.find(rep => {return rep.id === id});
  console.log(repository);

  if (!repository){
    return response.status(400).send();
  }

  const repositoryIndex = repositories.findIndex(rep => rep.id === id);

  repositories[repositoryIndex] = {...repository, title, url, techs};

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(rep => rep.id === id);

  if (repositoryIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send("teste");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repository = repositories.find(rep => {return rep.id === id});
  console.log(repository);

  if (!repository){
    return response.status(400).send();
  }

  const { likes } = repository;
  let auxLike = likes + 1;

  const repositoryIndex = repositories.findIndex(rep => rep.id === id);

  repositories[repositoryIndex] = {...repository, likes: auxLike};

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
