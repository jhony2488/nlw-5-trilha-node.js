import express from 'express'

const router = express.Router()

//default
router.get('/', (req, res) => {
  res.json({ version: '1.0.0' })
})

module.exports = router
