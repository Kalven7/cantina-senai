import express from 'express';
import user from './user.routes.js';
import produto from './produto.routes.js';
import pedidos from './pedidos.routes.js';
import login from './login.routes.js';

const router = express.Router();

router.use('/user', user);
router.use('/produto', produto);
router.use('/pedidos', pedidos);
router.use('/login', login);

export default router;