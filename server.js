const express = require ('express');
const bodyParser = require ('body-parser');
const fs = require('fs');

const app = express()
const port = 8000

app.use(bodyParser.json());

app.get('/tareas', (req,res)=>{
    const data = fs.readFileSync("tareas.txt", "utf8").trim().split("\n");
    res.status(200).json(data);
        });

app.post('/tareas', (req,res)=>{
    const nuevaTarea = req.body.tarea;
    fs.appendFileSync("tareas.txt", nuevaTarea + "\n");
    res.status(201).json({ message: "Tarea agregada con exito"})
})

app.put("/tareas/:indice", (req, res) => {
const indice = parseInt(req.params.indice);

const {tarea} = req.body;

const data = fs.readFileSync("tareas.txt", "utf8").trim().split("\n");

if (indice >= 0 && indice < data.length) {
    data[indice] = tarea;

    fs.writeFileSync("tareas.txt", data.join("\n"));
    res.status(200).json({ message: "Tarea actualizada con exito" });
} else {
    res.status(404).json({message: "La tarea no pudo ser agragada"});
}
});

app.delete('/tareas/:indice', (req,res)=>{
    const indice = parseInt(req.params.indice);

    const data = fs.readFileSync("tareas.txt", "utf8").trim().split("\n");

    if (indice >= 0 && indice < data.length) {
      data.splice(indice, 1)
      fs.writeFileSync("tareas.txt", data.join("\n"));

      res.status(200).json({ message: "Tarea eliminada con exito" });
    } else {
      res.status(404).json({ message: "La tarea no pudo ser eliminada" });
    }
})


app.listen(port, ()=>{
    console.log(`http://localhost:$(port)`);
})
