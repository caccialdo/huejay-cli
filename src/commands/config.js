exports.command = "config <command>"

exports.describe = "Manage your bridge config via a YAML file"

exports.builder = function(yargs) {
  return yargs.commandDir("config")
}
