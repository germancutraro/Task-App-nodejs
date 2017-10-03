module.exports = app => {
  const mongoose = require('mongoose');
  const Task = require('../models/Task');

  app.get('/', (req, res) => {
    Task.find({}).then(tasks => {
      res.render('index', {tasks});
    }).catch(err => console.log(err));
  });

  app.post('/add', (req, res) => {
    Task.create(req.body.task).then(() => {
      res.status(200).send(`${req.body.task.name} created!`);
    }).catch(err => res.status(500).send(`Error! ${err}`));
  });

  app.put('/status/:id', (req, res) => {
    let id = req.params.id;
    let status;
    Task.findById(id).then(task => {
      task.status = !task.status;
      task.save().then(() => console.log('Status Saved!'));
    });
  });

  app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Task.findByIdAndRemove(id).then(task => {
      console.log(`${task.name} removed!`);
    }).catch(err => console.log(err));
  });

}; // Finish function
