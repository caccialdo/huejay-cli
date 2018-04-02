const yargs = require("yargs")

yargs
  .version("1.0.0")
  .commandDir("commands")
  .help()
  .argv
