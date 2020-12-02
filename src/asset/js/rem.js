(function (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return false
    docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'
  }
  if (!doc.addEventListener) return false
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
