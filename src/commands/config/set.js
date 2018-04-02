const fs = require("fs")
const _ = require("lodash")
const yaml = require("js-yaml")

const getClient = require("../../utils/getClient")
const { CONFIG_PATH } = require("./constants")

exports.command = "set"

exports.describe = "Sets the bridge config as per the YAML file"

exports.handler = async function () {
  const client = await getClient()

  const config = readConfig()
  await setConfig(client, config)
}

function readConfig() {
  try {
    return yaml.safeLoad(fs.readFileSync(CONFIG_PATH, "utf8"))
  } catch (err) {
    return {}
  }
}

async function setConfig(client, config) {
  const lights = await client.lights.getAll()
  for (let lightConfig of config.lights) {
    await setLight(client, lights, lightConfig)
  }

  const groups = await client.groups.getAll()
  for (let groupConfig of config.groups) {
    await setGroup(client, groups, groupConfig)
  }
}

async function setLight(client, lights, lightConfig) {
  const light = _.find(lights, { id: lightConfig.id })
  _.forEach(lightConfig, (value, key) => {
    if (key !== "id") {
      light[key] = value
    }
  })
  await client.lights.save(light)
}

async function setGroup(client, groups, groupConfig) {
  const group = _.find(groups, { id: groupConfig.id })
  _.forEach(groupConfig, (value, key) => {
    if (key !== "id") {
      group[key] = value
    }
  })
  await client.groups.save(group)
}
