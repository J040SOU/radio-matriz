import { renderHome }          from './views/home.js';
import { renderAdminPlaylist } from './views/adminPlaylist.js';
import { renderAdminIntervals }from './views/adminIntervals.js';
import { renderProgramacao }   from './views/programacao.js';

const routes = {
  '#home':           renderHome,
  '#adminPlaylist':  renderAdminPlaylist,
  '#adminIntervals': renderAdminIntervals,
  '#programacao':    renderProgramacao
};

export function router() {
  const view = routes[window.location.hash] || renderHome;
  view();
}
