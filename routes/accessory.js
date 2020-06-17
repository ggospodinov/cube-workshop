const express = require('express')
const { authAccess, getUserStatus } = require('../controllers/user')
const { attachedAccessories } = require('../controllers/accessories')
const { updateCube } = require('../controllers/cubes')
const Accessory= require('../models/accessory')

const router = express.Router()

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
  res.render('createAccessory', {
    title: 'Create accessory',
    isLoggedIn: req.isLoggedIn
  })
})

router.post('/create/accessory', authAccess, async (req, res) => {
  const {
    name,
    description,
    imageUrl
  } = req.body

  const accessory = new Accessory({
    name,
    description,
    imageUrl
  })

  await accessory.save()

  res.redirect('/create/accessory')
})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res, next) => {
  const { id: cubeId } = req.params
  try {
    const data = await attachedAccessories(cubeId)

    res.render('attachAccessory', {
      title: 'Attach accessory',
      ...data,
      isLoggedIn: req.isLoggedIn
    });
  } catch (err) {
    next(err)
  }
})

router.post('/attach/accessory/:id', authAccess, async (req, res, next) => {
  const { accessory: accessoryId } = req.body
  const { id: cubeId} = req.params
  try {
    await updateCube(cubeId, accessoryId)
    res.redirect(`/details/${cubeId}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router