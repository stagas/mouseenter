
/**
 * mouseenter
 */

var within = require('within')

module.exports = mouseenter

var listeners = []
var fns = []

function mouseenter (el, fn) {
  function listener (ev) {
    var inside = within(ev, ev.target, 'fromElement')
    if (inside) return
    if (fn) fn.call(this, ev)
  }
  listeners.push(listener)
  fns.push(fn)
  el.addEventListener('mouseover', listener)
}

mouseenter.bind = mouseenter

mouseenter.unbind = function (el, fn) {
  var idx = fns.indexOf(fn)
  if (!~idx) return
  fns.splice(idx, 1)
  el.removeEventListener('mouseover', listeners.splice(idx, 1)[0])
}
