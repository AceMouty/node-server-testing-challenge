const express = require('express');
const router = express.Router();
const Hobbits = require('../database/helpers/hobbits-helper');

router.post('/', (req, res) => {
  Hobbits.insert(req.body)
    .then(newHobbit => {
      res.status(201).json({data: newHobbit})
    })
})

router.delete('/', (req, res) => {
  const id = req.body.id
  Hobbits.remove(id)
    .then(rowsAffected => {
      res.status(200).json({data: rowsAffected})
    })
})

module.exports = router;