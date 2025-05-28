import { renderHome }            from './views/home.js';
import { renderPlaylist }        from './views/playlist.js';
import { renderAdminPlaylist }   from './views/adminPlaylist.js';
import { renderAdminIntervals }  from './views/adminIntervals.js';
import { renderProgramacao }     from './views/programacao.js';

const routes = {
  '#home':           renderHome,
  '#playlist':       renderPlaylist,
  '#adminPlaylist':  renderAdminPlaylist,
  '#adminIntervals': renderAdminIntervals,
  '#programacao':    renderProgramacao
};

export function router() {
  const path = window.location.hash || '#home';
  (routes[path] || renderHome)();
}
