//Setup Depedency
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const db = require('../lib/db');
const flash = require('express-flash');
const multer = require('multer')
const path = require('path');
const { render } = require('ejs');

dotenv.config({path: '../.env'});

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init Upload
const upload = multer({
    storage: storage,
}).single('photo')

//router.get('*', checkUsers)

// router.get('/', (req, res) => {
    
//     db.query('SELECT * FROM provinsi_tb ORDER BY id desc', (err, result) => {
//         // if (err) throw err;
        
//         // res.render('index', {data: result})
            
//         if(err){
//             //Render Error
//             res.render("index", {data: ''})
//         } else{
//             //Render Data to Web
//             res.render("index", {data: result})
//         }
//     })
//     //res.render('index')
// })


router.get('/', (req, res) => {
    //kabupaten_tb.nama as nama_kabupaten, provinsi_tb.nama = nama_provinsi
    db.query('SELECT * FROM kabupaten_tb JOIN provinsi_tb ON kabupaten_tb.provinsi_id = provinsi_tb.id', (err, result) => {
        // if (err) throw err;
        
        // res.render('index', {data: result})
            
        if(err){
            //Render Error
            res.render("index", {data: ''})
        } else{
            //Render Data to Web
            res.render("index", {data: result})
        }
    })
    //res.render('index')
})


router.get('/province', (req, res) => {
    res.render('province')
})

router.post('/province-create', upload, (req, res) => {
    const {nama, resmi, pulau} = req.body;
    // const { photo } = req.file
    // let prov = [
    //         req.body,
    //         req.file 
    //     ]
        

    // var post  = req.body;
    // var pnama = post.nama;
    // var presmi = post.resmi;
    // var ppulau = post.pulau;
    // if(!req.files){
    //     return res.status(400)
    // }

    // let file = req.files.photo
   
    // upload(req, res, err => {
    //     // sql = 'INSERT INTO provinsi_tb (nama, resmi, photo, pulau) VALUES (" + pnama + "','" + presemi + "','" + img_name + "','" + ppulau + "")'
        
       
        db.query('INSERT INTO provinsi_tb SET ?', {nama, resmi, pulau}, (err, result) => {
            if (err){
                console.log(err);
            } else {
                console.log('uploaded')
                res.redirect('/')
            }
        })
    // });

})


router.get('/', (req, res) => {
    
    // db.query('SELECT * FROM news ORDER BY id desc', (err, result) => {
    //     // if (err) throw err;
        
    //     // res.render('index', {data: result})
            
    //     if(err){
    //         //Render Error
    //         res.render("index", {data: ''})
    //     } else{
    //         //Render Data to Web
    //         res.render("index", {data: result})
    //     }
    // })
    res.render('index')
})

router.get('/kabupaten', (req, res) => {
    db.query('SELECT * FROM provinsi_tb', (err, result) => {
        // if (err) throw err;
        
        // res.render('index', {data: result})
            
        if(err){
            //Render Error
            res.render("kabupaten", {data: ''})
        } else{
            //Render Data to Web
            res.render("kabupaten", {data: result})
        }
    })
})

router.post('/kabupaten-create', (req, res) => {

    const {nama, resmi} = req.body;

    db.query('INSERT INTO kabupaten_tb SET ?', {nama, resmi}, (err, result) => {
            if (err){
                console.log(err);
            } else {
                console.log('uploaded')
                res.redirect('/')
            }
    })

})

router.get('/view-province', (req, res) => {
    db.query('SELECT * FROM provinsi_tb ORDER BY id desc', (err, result) => {
        // if (err) throw err;
        
        // res.render('index', {data: result})
            
        // if(err){
        //     //Render Error
        //     res.render("index", {data: ''})
        // } else{
        //     //Render Data to Web
        //     res.render("index", {data: result})
        // }

        if(err){
            //Render Error
            res.render("index", {data: '', message: ''})
        } else{
            //Render Data to Web
            res.render("index", {data: result, message: 'x'})
        }
    })
})

router.get('/view-kab', (req, res) => {
    db.query('SELECT * FROM kabupaten_tb ORDER BY id desc', (err, result) => {
        // if (err) throw err;
        
        // res.render('index', {data: result})
            
        if(err){
            //Render Error
            res.render("index", {data: '', message: ''})
        } else{
            //Render Data to Web
            res.render("index", {data: result, message: 'y'})
        }
    })
})

router.get('/view-kab/details/:id', (req,res) => {
    res.render('kab_details')
})


router.get('/details/:id', (req, res) => {

    db.query("SELECT * FROM provinsi_tb WHERE id = ?", [req.params.id], function(err, rows, fields){
       
        //if data Not Found
        if(err){
            
            throw err
        }else {
            //Render Edit to edit.ejs
            res.render("details", {
                id: rows[0].id,
                nama: rows[0].nama,
                resmi: rows[0].resmi,
                pulau: rows[0].pulau
            })
        }
    })

    
})

/////Delete/////

router.get('/delete/:id', (req, res, next) => {
    const { id } = req.body;
    //res.render('index', {message: req.flash('message'), messageS: req.flash('messageS')});
    db.query("DELETE FROM provinsi_tb WHERE id = ?", [req.params.id], (err, result) =>{
        //if Err
        if(err){
            //req.flash("Error", err)
            throw err;
            res.redirect("/")
        }else{
            //req.flash("messageS", "Book successfully Deleted")
            res.redirect("/")
        }
    })
})
//////////////

router.get('/edit/:id', (req, res) => {

    db.query("SELECT * FROM provinsi_tb WHERE id = ?", [req.params.id], function(err, rows, fields){
       
        //if data Not Found
        if(err){
            
            throw err
        }else {
            //Render Edit to edit.ejs
            res.render("prov-edit", {
                id: rows[0].id,
                nama: rows[0].nama,
                resmi: rows[0].resmi,
                pulau: rows[0].pulau
            })
        }
    })

    
})

router.post('/edit/:id', (req, res, next) => {
    const {nama, resmi, pulau} = req.body;
    let param = [
        req.body, 
        req.params.id
    ]
    let errors = false;


    db.query("UPDATE provinsi_tb SET ? WHERE id = ?", param,(err, result) => {
        if (err){
            console.log(err);
        } else {
            //req.flash('messageS', "Success");
            res.redirect('/')
        }
    })
})



module.exports = router
