const _ = require("lodash")
const huejay = require("huejay")

const { BRIDGE_ID, USERNAME } = require("../constants")

module.exports = async function getClient() {
  const bridges = await huejay.discover()
  const bridge = _.find(bridges, { id: BRIDGE_ID })

  return new huejay.Client({ host: bridge.ip, username: USERNAME })
}
