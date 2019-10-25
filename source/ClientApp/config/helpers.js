const path = require('path')

const ROOT = path.resolve(__dirname, '..')

const SUBSITENAME = ''

function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

function subsite(arg) {
    if (arg[0] != '/') {
        arg = '/' + arg;
    }
    return SUBSITENAME.concat(arg);
}

exports.root = root
exports.subsite = subsite