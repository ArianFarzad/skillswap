import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

log.setLevel('info');

prefix.reg(log);
prefix.apply(log, {
  template: '[%t] %l (%n):',
  timestampFormatter: () => new Date().toLocaleTimeString(),
});

const loggerInstance = log;
export default loggerInstance;
