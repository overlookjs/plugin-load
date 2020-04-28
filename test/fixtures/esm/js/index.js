import {fileURLToPath} from 'url';
import Route from '@overlook/route';
import loadPlugin from '../../../../index.js'; // @overlook/plugin-load

const LoadRoute = Route.extend(loadPlugin);

const __filename = fileURLToPath(import.meta.url);

export default new LoadRoute({__filename});
