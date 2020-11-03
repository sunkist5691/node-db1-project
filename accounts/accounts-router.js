const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

const Accounts = {

   getAll(){
      return db('accounts')
   },

   getById(id){
      return db('accounts').where({ id })
   },

   create(accounts){
      return db('accounts').insert(accounts)
   },

   update(id, accounts){
      return db('accounts').where({ id }).update(accounts)
   },

   delete(id){
      return db('accounts').where({ id }).del()
   }
}

// GET all accounts
router.get('/', (req, res) => {
   Accounts.getAll()
      .then(data => {
         res.json(data)
      })
      .catch(error => {
         res.json({ error: error.message })
      })
})

// GET specific accounts
router.get('/:id', (req, res) => {
   Accounts.getById(req.params.id).first()
      .then(account => {
         res.json(account)
      })
      .catch(error => {
         res.json({ error: error.message })
      })
})

// ADD account
router.post('/', (req, res) => {
   Accounts.create(req.body)
      .then( ([id]) => {
         return Accounts.getById(id).first() 
         // 보통 [id] 대신에 account 로 할 경우, 
         // 새롭게 추가된 object 의 id number 와 array 형태로 response 를 해주기 때문에
         // id 를 deconstruct 를 하고, getById 로 return 을 한 다음, .first() 를 해줌으로서 추가 된 object 만 출력이 가능해진다.
      })
      .then(account => {
         res.json(account)
      })
      .catch(error => {
         res.json({ error: error.message })
      })
})

// UPDATE specific account
router.put('/:id', async (req, res) => {

   try {
     await Accounts.update(req.params.id, req.body)
     const updatedAccount = await Accounts.getById(req.params.id).first()
     res.json(updatedAccount)

   } catch (error) {
      res.json({ error: error.message })
   }
})

// DELETE specific account
router.delete('/:id', async (req, res) => {
   const result = await Accounts.delete(req.params.id) // return 1 if delete successfully, 0 if failed to delete

   if(!result){
      res.json({ message: 'Unsuccessful deletion, please provide correct id number.'})
   } else {
      res.json({ message: 'Successfully deleted.'})
   }

})


module.exports = router
/*

--FORMAT--

{
  name: 'John',
  budget: 0928384
}

*/