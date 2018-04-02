const fs = require("fs")
const _ = require("lodash")
const yaml = require("js-yaml")

const getClient = require("../../utils/getClient")

const { CONFIG_PATH } = require("./constants")

const LIGHT_PROPS = [
  "id",
  "name",
]

const GROUPS_PROPS = [
  "id",
  "name",
  "type",
  "class",
  "lightIds",
  "brightness",
  "colorTemp",
  "on",
]

exports.command = "get"

exports.describe = "Reads the Bridge config and writes it to a file"

exports.handler = async function () {
  const client = await getClient()
  const config = await getConfig(client)

  writeConfig(config)
}

async function getConfig(client) {
  const lights = await client.lights.getAll()
  const groups = await client.groups.getAll()

  const config = {
    lights: lights.map(light => _.pick(light, LIGHT_PROPS)),
    groups: groups.map(light => _.pick(light, GROUPS_PROPS)),
  }

  return JSON.parse(JSON.stringify(config))
}

function writeConfig(config) {
  fs.writeFileSync(CONFIG_PATH, yaml.safeDump(config), "utf8")
}
