import { Environment } from './src/services/environment';
import { Util } from './src/services/util';

Environment.config().then(Util.noop);
