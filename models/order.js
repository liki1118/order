const pool=require("./setup");
const db=require("./firebaseSetup")
const { getFirestore, collection, query, where, getDocs, updateDoc, arrayUnion, addDoc } = require("firebase/firestore");
exports.addItem = async (orderItems) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const query = 'INSERT INTO orders (name, price) VALUES ($1, $2)';
        
        for (const item of orderItems) {
            const values = [item.name, item.price];
            await client.query(query, values);
        }
        await client.query('COMMIT');
        client.release();
        return "true";
    } catch (err) {
        await client.query('ROLLBACK');
        client.release();
        if (err.code === '23505') {
            return "dup";
        } else {
            return "false";
        }
    }
};

exports.getMenu=async()=>{
    const client = await pool.connect();
    try{
        const query = 'select * from orders';
        const result=await client.query(query);
        client.release();
        return result.rows;
    }
    catch(err){
        return false;
    }
}

exports.addOrder=async(data)=>{
    try {
        const name=data.name;
        const newItem=data.items;
        const itemsToAdd = Array.isArray(newItem) ? newItem : [newItem];
        const collectionRef = collection(db, "collections");
        const q = query(collectionRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const updatePromises = querySnapshot.docs.map((doc) =>
            updateDoc(doc.ref, {
              items: arrayUnion(...itemsToAdd)
            })
          );
          await Promise.all(updatePromises);
        } else {
          await addDoc(collectionRef, {
            name: name,
            items: itemsToAdd
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
}

exports.CheckData=async(items)=>{
    const client = await pool.connect();
    try {
        const placeholders = items.map((_, i) => `$${i + 1}`).join(', ');
        const query = `SELECT COUNT(*) AS count FROM orders WHERE name IN (${placeholders})`;
        const result = await client.query(query, items);
        return parseInt(result.rows[0].count) === items.length;
      } catch (error) {
        console.error("Error checking items in orders:", error);
        return false;
      } finally {
        await client.end();
      }
}

exports.GetBill=async(data)=>{
    const client = await pool.connect();
    try{
        const name=data.name;
        const collectionRef = collection(db, "collections");
        const q = query(collectionRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const items=doc.data().items;//has an array
            const queryText = `
                SELECT SUM(price) AS total_price
                FROM orders
                WHERE name = ANY($1);
            `;
            const res = await client.query(queryText, [items]);
            const totalPrice = res.rows[0].total_price || 0;
            client.release();
            return totalPrice.toString();
        }
        else{
            client.release();
            return "name_err";
        }
    }
    catch(err){
        client.release();
        console.log(err);
        return "false";
    }
}