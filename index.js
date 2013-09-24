
/**
 * mouseenter
 */

var within = require('within')
var events = require('event')

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
  events.bind(el, 'mouseover', listener)
}

mouseenter.bind = mouseenter

mouseenter.unbind = function (el, fn) {
  var idx = fns.indexOf(fn)
  if (!~idx) return
  fns.splice(idx, 1)
  events.unbind(el, 'mouseover', listeners.splice(idx, 1)[0])
}
