export default {
  server: 'https://wt-a0a68818c7b34a465e865e888dc419c9-0.run.webtask.io/webtasksso',
  tokenTimeToLive: 20000, // 10m * 60s * 1000ms
  tokenName: 'tkn',
  productionTip: false,
  logger: {
    // required ['debug', 'info', 'warn', 'error', 'fatal']
    logLevel: 'debug',
    // optional: defaults to false if not specified
    stringifyArguments: true,
    // optional: defaults to false if not specified
    showLogLevel: true,
    // optional: defaults to false if not specified
    showMethodName: true,
    // optional: defaults to '|' if not specified
    separator: '|',
    // optional: defaults to false if not specified
    showConsoleColors: true,
  },
};