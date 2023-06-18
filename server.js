const express = require('express');
const lvm = require("./lvmB");
const morgan = require("morgan");
const mongoose = require("mongoose");
const model = require("./models/model");
const mdlshort = require("./models/shorter");
const port = 3000;
lvm.cpx("cls",lvm.tipo.unix());
const dburl=""; // linki mongoDB sitesinden alınmalı
  mongoose.connect(dburl,{useNewUrlParser:true}).then(r=>lvm.cpx("mongoose Bağlantısı gerçekleşti")).catch(e=>lvm.cpx(e))

let errobj;
const app = express();
app.use(express.static('repos'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.listen(port,()=>{
    lvm.cpx(`${port} numaralı port dinleniyor...`);
});
app.get("/",(req,res)=>{
    res.render("index",{reqtime : lvm.tipo.ll(true),title:"NODE:JS"});
})
app.get("/add",(req,res)=>{
    const nwadd = new model({
        title:"mısır",
        code:"465465464",
        stock:50,
        price:323.23
    })
    nwadd.save().then(r=>{lvm.cpx("kaydedildi👍👍👍");res.send(r)}).catch(e=>lvm.cpx(e,"\n","Hay aksi Bir sorun var 😞😞😞"))
});
app.get("/admin",(req,res)=>{
   // model.find().then(r=>res.send(r)).catch(e=>res.send(e))
   res.render("admin",{title:"kaydet"})
})
app.get("/error",(req,res)=>{
    res.render("error",errobj)
})
app.post("/admin",(req,res)=> {
     model.find({code:req.body.code}).then(r=>{
          console.log(r);
          if(r.length === 0){
            const nwdata = new model(req.body);
            nwdata.save()
             
            .then((result)=>{
                res.redirect('/admin')
            })
            .catch((err)=>{
                lvm.cpx(err,"res");
            })
          }
          
          else{
            errobj = {title:"hata",err:"Bu ürün Zaten Kaydedilmiş Güncelleme Ekranına Gidin",href:"/admin",shw:"güncelleme ekranı"}
            res.redirect("/error",errobj,200);
          }
    }).catch(e=>{
        console.log(e);
    });
  


})
app.post("/shortURL", (req, res) => {
    let shorturl = req.body.shdw;
    let longurl = req.body.url;
    let unix = lvm.tipo.unix();
    
    mdlshort.find({ shdw: shorturl })
    .then((result) => {
        lvm.cpx(result);
      if (result.length === 0) {
        const newdata = new mdlshort({
            url:longurl,
            shdw:shorturl,
            unix:unix
        });
        newdata.save()
          .then(() => {
            res.redirect("/showurl/" + shorturl);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Hay aksi sunucuda bir hata var :(");
          });
      } else if(result.length===1) {
        let beg=0;
        let fns = lvm.tipo.unix();
        mdlshort.find({shdw:shorturl}).then((result)=>{
            beg=  result[0].unix;
            if(fns-beg > 1000 * 60){
                lvm.cpx(fns-beg)
                  mdlshort.find({ shdw: shorturl }).deleteOne({shdw: shorturl})
        .then(()=>{
            const newdata = new mdlshort({
                url:longurl,
                shdw:shorturl,
                unix:unix
            });
        newdata.save()
          .then(() => {
            res.redirect("/showurl/" + shorturl);
          })
          .catch((err)=>{
            res.send(err);
          })
         
        })
            }
            else{
                res.send("Kısaltılmış link malesef başkası tarafından kullanılıyor ...");
              }
        }) 

      
      }
      else{
        res.send("Kısaltılmış link malesef başkası tarafından kullanılıyor ...");
      }
    }) .catch((err) => {
        console.error(err);
        res.status(500).send("Hay aksi sunucuda bir hata var :(");
      });
  });
  
  app.get("/showurl/:id", (req, res) => {
    res.render("showurl", { title: "Link Kısaltıcı", shrt: req.params.id });
  });
  
  app.get("/shr/:id", (req, res) => {
    const shorturl = req.params.id;
    mdlshort.find({ shdw: shorturl }).then((result) => {
      if (result.length === 1) {
        res.send(`
        <html>
          <head>
           
          </head>
          <body id = "bdy">
          <style>
          *{
            color:#111;
           
        }
        body{
            background: radial-gradient(#324,#32bfce);
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;


        }
          </style>
            <h3>Web Sayafasına Yönlendiriliyorsunuz</h3>

            <script>
            setTimeout(() => {
                window.open("${result[0].url}", "_blank");
              }, 1881);
            
              setTimeout(() => {
                document.getElementById("bdy").innerHTML += '<a href="${result[0].url}">GİT</a>';
              }, 2312);
          </script>
          </body>
        </html>
      `);
      } else {
        res.send("Sayfa Bulunamadı...");
      }
    });
  });
  