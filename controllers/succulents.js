const express = require('express')
const router = express.Router()

const Succulents = require('../models/products')


/* ===========
GET ROUTE
============= */
//INDEX
router.get('/', (req, res) => {
    Succulents.find({}, (err, allSucculents)=> {
      res.render('index.ejs',
      {
        succulents:allSucculents,
        
      }
      )
    })
  })
  
  /* ===========
  GET ROUTE
  ============= */
  //NEW
  router.get('/new', (req, res) => {
    res.render('new.ejs')
  })
  

  
  /* ===========
  GET ROUTE
  ============= */
  //EDIT
  router.get('/:id/edit', (req, res) => {
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
  router.get('/:id', (req, res) => {
    Succulents.findById(req.params.id, (err, foundSucculent) => {
      res.render('show.ejs', {
        succulent:foundSucculent
      })
    })
  })




  // also need get route render Cart.ejs and pass cart variable

  
  /* ===========
  PUT ROUTE
  ============= */
  //UPDATE
  router.put('/:id', (req, res) => {
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
  
  router.post('/', (req, res)=>{
    Succulents.create(req.body, (err, createdSucculents) => {
    res.redirect('/succulents');
    });
  })
  
  /* ===========
  DELETE ROUTE
  ============= */
  //DELETE
  router.delete('/:id', (req, res) => {
    Succulents.findOneAndDelete({ _id: req.params.id }, (err, deletedSucculent) => {
      res.redirect('/succulents')
    })
  })
  
 /* ===========
  GET ROUTE
  ============= */
  //BUY

router.put('/:id/buy', async (req, res) => {
  try{
    await Succulents.findByIdAndUpdate(req.params.id, {$inc:{ qty: -1}})
    res.redirect('/')
  }catch(err){
    res.send(err.message)
  }
})
  
  /* ===========
  SEED ROUTE
  ============= */
  //SEED
  router.get('/seed/newsucculents', (req, res)=>{
    const newSucculents =
      [
        {
          name: 'Blue Peruvian Cactus',
          img: "https://i.ibb.co/Qnj53GZ/cactus.jpg",
          price: 230,
          qty: 13
        },
        {
          name: 'Echeveria "Purple Pearl"',
          img: "https://i.ibb.co/hK2mDJn/succulent-echevaria.jpg",
          price: 15,
          qty: 21
        },
        {
          name: 'String of Bananas',
          img: "https://i.ibb.co/SyDqZFR/banana-of-strings.jpg",
          price: 60,
          qty: 8
        },
        {
          name: 'Geometric Garden',
          img: "https://i.ibb.co/KbXjd9p/garden-of-succulents-1.jpg",
          price: 95,
          qty: 23
        },
        {
          name: 'Spider',
          img: "https://i.ibb.co/r2LRvxj/4-2.jpg",
          price: 14,
          qty: 19
        },
        {
          name: 'Red-tipped Blossoming Succulent',
          img: "https://i.ibb.co/ZBSsDXW/6.jpg",
          price: 14,
          qty: 18
        },
        {
          name: 'Dark Geometric Blossom',
          img: "https://i.ibb.co/n00vykG/2-6.jpg",
          price: 14,
          qty: 26
        },
        {
          name: 'Echeveria Setosa',
          img: "https://i.ibb.co/82vxVb5/ECHEVERIA-SETOSA.png",
          price: 14,
          qty: 25
        },
        {
          name: 'Crassula Capitella',
          img: "https://i.ibb.co/Rv7RtxS/sucuclent.jpg",
          price: 18,
          qty: 22
        },
        {
          name: 'Sansevieria Cylindra',
          img: "https://i.ibb.co/qLQTNqp/snake.jpg",
          price: 16,
          qty: 20
        },
        {
          name: 'Sand Castle Cactus in a Pot',
          img: "https://i.ibb.co/Ny4ybLY/castle-cactus.jpg",
          price: 58,
          qty: 12
        }, 
        {
          name: 'Barrel Cactus',
          img: "https://i.ibb.co/bNjZMW3/barrol-cactus.jpg",
          price: 180,
          qty: 14
        },
        {
          name: 'Green Peruvian Cactus',
          img: "https://i.ibb.co/8cL5f3z/cactus-2.jpg",
          price: 230,
          qty: 7
        },
        {
          name: 'Small Peruvian Cactus',
          img: "https://i.ibb.co/QCdyJYn/Cactus-mini.jpg",
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
  
  module.exports = router