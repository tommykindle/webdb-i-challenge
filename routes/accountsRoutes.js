const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

//get all accounts

router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Falied to get accounts from the server" })
    })
})

// get accounts by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts').where({ id })
    .then(([accounts]) => {
      if (accounts) {
        res.status(200).json(accounts)
      } else {
        res.status(404).json({ message: "The account with the specified ID does not exist" })
      }
    })
})

//create new account
router.post('/', (req, res) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    return res.status(400).json({ message: "Please provide a name and a budget for this account" })
  }
  db('accounts').insert({ name: name, budget: parseInt(budget, 10) })
    .then(([account]) => {
      res.status(201).json(account)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error saving this account to the database" })
    })
})

//update account



module.exports = router;