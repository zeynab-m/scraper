module.exports={

    dbName:'weather',
     host(dbName){
        // return `mongodb://root:example@localhost:27017/${dbName}`
        return `mongodb://root:example@mongodb:27017/${dbName}?authSource=admin`

     },
    url:'mongodb://root:example@mongodb',
    port:27017

}
