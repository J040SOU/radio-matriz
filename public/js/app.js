import { router } from './router.js';

// Dispara o roteador quando a página carrega ou a hash muda
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
