import express from 'express';
import db from './config/firebase.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 2547;

app.use(cors());
app.use(bodyParser.json());

// Object array
const myShops = [
    {
    shopId: 100,
    shopName: "Adidas",
    shopType: "Fashion",
    shopLoc: { lat: 100, lon: 150},
    shopStatus: true
    },
    {
    shopId: 200,
    shopName: "Chanel",
    shopType: "Bags",
    shopLoc: { lat: 105, lon: 125},
    shopStatus: true
    },
    {
    shopId: 300,
    shopName: "Tough",
    shopType: "Bags",
    shopLoc: { lat: 110, lon: 135},
    shopStatus: true
    }];

// GET: http://localhost:2547/api/shops
app.get('/api/shops', async(req, res) => { 
    try {
// คำสั่ง: สำหรับการอ่านหรือดึงข้อมูลจาก Documents ที่จัดเก็บภายใน Collection
    const snapshot = await db
    .collection("shops_it_10055")
    .orderBy("shopName", "desc")
    .get();

    const shops =  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
}));

    res.json(shops);
    } catch (error) {
    res.status(500).json(
        {
            message: "FAILED: การอ่านข้อมูล shops มีปัญหา กรุณาตรวจสอบ",
            error: error.message
        }
    );
}});


// http://localhost:2547/
app.get('/', (req, res) => {
    res.send('<h1>Web Programming in 2/2569.</h1>');
});

// Route สำหรับการ Read ข้อมูลจากฐานข้อมูลด้วย id
// GET : http://localhos:2547/api/shops/1
app.get('/api/shops/:id', async (req, res) => { 
    try {
    // คำสั่ง: สำหรับการอ่านหรือดึงข้อมูลจาก Documents ที่จัดเก็บภายใน Collection ด้วย id
    const doc = await db
        .collection("shops_it_10055")
    //    .where("shopId", "==", Number(req.params.id))
        .doc(req.params.id)
        .get();

    res.json(
        {
            id: doc.id,
            ...doc.data()
        }
    );
    } catch (error) {
        res.status(500).json(
        {
            message: "FAILED: การอ่านข้อมูล shops ด้วยรหัสร้านค้า (shopId) มีปัญหา กรุณาตรวจสอบ",
            error: error.message
        }
    );
}});

app.get('/shops{/:shopId}', (req, res) => {
    res.set('Content-type', 'application/json');
    const { shopId } = req.params;

    if(isNaN(shopId)){
        res.send(myShops);
    }else{
        const shopItem = myShops.filter(
            shop => { return shop.shopId === Number(shopId) }
        );
        res.send(shopItem[0]);
    }
    
    let myText = '';
    myText+= '<h1>Shop information</h1><br/>';
    myText+= `<br/><b>Shop ID:</b> ${myShops.shopId}`;
    myText+= `<br/><b>Shop Name:</b> ${myShops.shopName}`;
    myText+= `<br/><b>Shop Type:</b> ${myShops.shopType}`;
    myText+= `<br/><b>Shop Location (Lat, Lon):</b>${myShops.shopLoc.lat}, ${myShops.shopLoc.lon}`;
    myText+= `<br/><b>Shop Status:</b> ${myShops.shopStatus}`;

    res.set('Content-type', 'text/html');
    res.send(myText);
});

// การลบข้อมูลร้านค้าจากไฟร์เบสด้วย id (Method: DELETE)
const deleteShop = async (req, res) => {
    const ShopRef = db
      .collection("shops_it_10055")
      .doc(req.params.id);
 
    await ShopRef.delete();
 
    res.status(200).json({
      message: "Shop deleted successfully",
      id: req.params.id,
    });
}
 
// App route: /api/shops/:id (Method: DELETE)
// Endpoint: http://localhost:2547/api/shops/100
app.delete('/api/shops/:id', (req, res) => {
  try {
    deleteShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to deleting shop.",
      error: error.message,
    });
  }
});

// การสร้างข้อมูลร้านค้าในไฟร์เบส (Method: POST)
const createShop = async (req, res) => {
    const {
      shopName,
      shopType,
      shopStatus,
    } = req.body;
 
    if (!shopName || !shopType || !shopStatus) {
      return res.status(400).json({
          message: "Name, type and status are required",
      });
    }
 
    const shopRef = await db.collection("shops_it_10055").doc();
    const newId = shopRef.id; // Access the generated ID
 
    const newShop = {
      shopId: newId,
      shopName,
      shopType,
      shopStatus: shopStatus === 'true',
    };
 
    // Builder query: Add
    const docRef = await db
      .collection("shops_it_10055")
      .add(newShop);
 
    res.status(201).json({
      id: docRef.id,
      ...newShop,
    });
}
 
// App route: /api/shops (Method: POST)
// Endpoint: http://localhost:2547/api/shops
app.post('/api/shops', (req, res) => {
  try {
    createShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to adding shop.",
      error: error.message,
    });
  }
});

// การแก้ไขข้อมูลร้านค้าในไฟร์เบส (Method: PUT)
const updateShop = async (req, res) => {

  try {

    const ShopRef = db
      .collection("shops_it_10055")
      .doc(req.params.id);

    const doc = await ShopRef.get();

    if (!doc.exists) {

      return res.status(404).json({
        message: "Shop not found",
      });

    }

    const {
      shopName,
      shopType,
      shopStatus,
    } = req.body;

    const updateData = {
      shopName,
      shopType,
      shopStatus: shopStatus === 'true',
    };

    await ShopRef.update(updateData);

    res.status(200).json({
      id: req.params.id,
      ...updateData,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update Shop",
    });

  }

};

// App route: /api/shops (Method: PUT)
// Endpoint: http://localhost:2547/api/shops
app.put('/api/shops/:id', (req, res) => {
  try {
    updateShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to updating shop.",
      error: error.message,
    });
  }
});


app.listen(port, ()=> {
    console.log(`App listening on port ${port}...`);
});

