import express from 'express';
import routerUsuario from './routes/routerUsuario.js';
import bodyParser from 'body-parser';

const app = express();
const port = 32;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routerUsuario);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
