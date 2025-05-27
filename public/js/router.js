import { renderHome } from './views/home.js';
import { renderPlaylist } from './views/playlist.js';

const routes = {
  '#home': renderHome,
  '#playlist': renderPlaylist
};

export function router() {
  const path = window.location.hash || '#home';
  const view = routes[path] || renderHome;
  view();
}
