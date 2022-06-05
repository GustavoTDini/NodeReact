import app from './app';
import databse from './db';

(async  () =>{
    try{
        const port = parseInt(`${process.env.PORT}`)

        await databse.sync();
        console.log(`Running database ${process.env.DB_NAME}`);

        await app.listen(port);
        console.log(`Running on port ${port}`);  
    } catch(error){
        console.log(`${error}`)
    }

})();

