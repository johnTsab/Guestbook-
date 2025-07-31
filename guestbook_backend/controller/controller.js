const express = require('express');
const router = express.Router();
const db = require('./db/database.js');

router.get("/api/v1/guests" , (req,res)=>{
    const sql = "SELECT * FROM guest";
    db.query(sql,(err,result)=>{
    if(err)return res.json(err);
    return res.json(result);
    }  
);
})

router.post("/api/v1/guests" , (req,res)=>{
    const sql = "INSERT INTO GUEST(`name`,`email`,`address`) values(?,?,?)";

    db.query(sql,[req.body.name,req.body.email,req.body.address],(err,result)=>{
        if(err)return res.json(err);
        return res.json(result);
    }
);
})

router.put("/api/v1/guests/:id" , (req,res)=>{
    const sql = "UPDATE GUEST SET `name=?`,`email=?`,`address=?` WHERE id=?";
    const id = Number[req.params.id];
    db.query(sql,[req.body.name,req.body.email,req.body.address,id],(err,result)=>{
        if(err)return res.json(err);
        return res.json(result);
    }
);
})

router.delete("/api/v1/guests" , (req,res)=>{
    const sql = "DELETE FROM GUEST WHERE id=?";
    const id = Number[req.params.id];
    db.query(sql,[id],(err,result)=>{
        if(err)return res.json(err);
        return res.json(result);
    }
);
})

module.exports = router;



