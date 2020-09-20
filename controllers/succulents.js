const express = require('express')
const succulents = express.Router()

const Succulents = require('../models/products')

/* ===========
GET ROUTE
============= */
//INDEX
succulents.get('/succulents', (req, res) => {
    Succulents.find({}, (err, allSucculents)=> {
      res.render('index.ejs',
      {
        Succulents:allSucculents,
        
      }
      )
    })
  })
  
  /* ===========
  GET ROUTE
  ============= */
  //NEW
  succulents.get('/new', (req, res) => {
    res.render('new.ejs')
  })
  
  
  /* ===========
  GET ROUTE
  ============= */
  //EDIT
  succulents.get('/:id/edit', (req, res) => {
    Succulents.findById(req.params.id, (err, editedSucculent) => {
      res.render('edit.ejs', {
        succulent: editedSucculent
      })
    })
  })
  
  /* ===========
  GET ROUTE
  ============= */
  //SHOW
  succulents.get('succulents/:id', (req, res) => {
    Succulents.findById(req.params.id, (err, foundSucculent) => {
      res.render('show.ejs', {
        succulent: foundSucculent
      })
    })
  })
  
  
  /* ===========
  PUT ROUTE
  ============= */
  //UPDATE
  succulents.put('/:id', (req, res) => {
    Succulents.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedSucculent) => {
        res.redirect('/succulents')
      }
    )
  })
  
  /* ===========
  POST ROUTE
  ============= */
  //CREATE
  
  succulents.post('/', (req, res)=>{
    Succulents.create(req.body, (err, createdSucculents) => {
    res.redirect('/succulents');
    });
  })
  
  /* ===========
  DELETE ROUTE
  ============= */
  //DELETE
  succulents.delete('/:id', (req, res) => {
    Succulents.findOneAndDelete({ _id: req.params.id }, (err, deletedSucculent) => {
      res.redirect('/succulents')
    })
  })
  
  /* ===========
  BUY ROUTE
  ============= */
  //BUY
  succulents.put('/buy/:id', (req, res) => {
    Succulents.findByIdAndUpdate(
      req.params.id,
      { $inc: { qty: -1 } },
      (err, updatedSucculents) => {
        res.redirect(`/succulents/${req.params.id}`)
      }
    )
  })
  
  
  /* ===========
  SEED ROUTE
  ============= */
  //SEED
  succulents.get('/seed/newsucculents', (req, res)=>{
    const newSucculents =
      [
        {
          name: 'Blue Peruvian Cactus',
          img: "models/cactus.jpg",
          price: 230,
          qty: 13
        },
        {
          name: 'Echeveria "Purple Pearl"',
          img: "models/succulent-echevaria.jpg",
          price: 15,
          qty: 21
        },
        {
          name: 'String of Bananas',
          img: "models/banana-of-strings.jpg",
          price: 60,
          qty: 8
        },
        {
          name: 'Geometric Garden',
          img: "models/garden-of-succulents-1.jpg",
          price: 95,
          qty: 23
        },
        {
          name: 'Spider',
          img: "models/4-2.jpg",
          price: 14,
          qty: 19
        },
        {
          name: 'Red-tipped Blossoming Succulent',
          img: "models/6.jpg",
          price: 14,
          qty: 18
        },
        {
          name: 'Dark Geometric Blossom',
          img: "models/2-6.jpg",
          price: 14,
          qty: 26
        },
        {
          name: 'Echeveria Setosa',
          img: "models/ECHEVERIA-SETOSA.png",
          price: 14,
          qty: 25
        },
        {
          name: 'Crassula Capitella',
          img: "models/sucuclent.jpg",
          price: 18,
          qty: 22
        },
        {
          name: 'Sansevieria Cylindra',
          img: "models/snake.jpg",
          price: 16,
          qty: 20
        },
        {
          name: 'Sand Castle Cactus in a Pot',
          img: "models/castle-cactus.jpg",
          price: 58,
          qty: 12
        }, 
        {
          name: 'Barrel Cactus',
          img: "models/barrol-cactus.jpg",
          price: 180,
          qty: 14
        },
        {
          name: 'Green Peruvian Cactus',
          img: "models/cactus-2.jpg",
          price: 230,
          qty: 7
        },
        {
          name: 'Small Peruvian Cactus',
          img: "models/Cactus_mini.jpg",
          price: 55,
          qty: 32
        }   
      ]
      Succulents.create(newSucculents, (err, succulent) => {
        if (err) {
          console.log(err)
        }
        console.log('SEED: NEW PRODUCTS CREATED!')
        res.redirect('/succulents')
    })
  });
  
  module.exports = succulents