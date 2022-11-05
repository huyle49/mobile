export class DomUtil {
  static getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth

      if (margin) {
        const style = getComputedStyle(el)
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      }

      return width
    } else {
      return 0
    }
  }

  static getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight

      if (margin) {
        const style = getComputedStyle(el)
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      }

      return height
    } else {
      return 0
    }
  }
}
