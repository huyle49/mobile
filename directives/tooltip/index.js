// Refer source: https://github.com/primefaces/primevue/tree/2.x/src/components/tooltip
import { getNextZIndex } from '@/utils/zIndex'
import { DomUtil } from '@/utils/dom'
import uniqueId from '@/utils/uniqueId'
import './tooltip.css'

const FOCUS_IN_EVENT = 'focusin'
const FOCUS_OUT_EVENT = 'focusout'
const MOUSE_ENTER_EVENT = 'mouseenter'
const MOUSE_LEAVE_EVENT = 'mouseleave'
const CLICK_EVENT = 'click'

const TOOLTIP_ARROW_HEIGHT = 6
const TARGET_MARGIN = 8
const HIDDEN_AFTER_SECOND = 8
const TARGET_MARGIN_ARROW = TOOLTIP_ARROW_HEIGHT + TARGET_MARGIN

function bindEvents(el) {
  const modifiers = el.$_tooltipModifiers
  if (modifiers.focus) {
    el.addEventListener(FOCUS_IN_EVENT, onFocus)
    el.addEventListener(FOCUS_OUT_EVENT, onBlur)
  } else {
    el.addEventListener(MOUSE_ENTER_EVENT, onMouseEnter)
    el.addEventListener(MOUSE_LEAVE_EVENT, onMouseLeave)
    el.addEventListener(CLICK_EVENT, onClick)
  }
}

function unbindEvents(el) {
  const modifiers = el.$_tooltipModifiers

  if (modifiers.focus) {
    el.removeEventListener(FOCUS_IN_EVENT, onFocus)
    el.removeEventListener(FOCUS_OUT_EVENT, onBlur)
  } else {
    el.removeEventListener(MOUSE_ENTER_EVENT, onMouseEnter)
    el.removeEventListener(MOUSE_LEAVE_EVENT, onMouseLeave)
    el.removeEventListener(CLICK_EVENT, onClick)
  }
}

function onMouseEnter(event) {
  show(event.currentTarget)
}

function onMouseLeave(event) {
  hide(event.currentTarget)
}

function onFocus(event) {
  show(event.currentTarget)
}

function onBlur(event) {
  hide(event.currentTarget)
}

function onClick(event) {
  hide(event.currentTarget)
}

function show(el) {
  if (el.$_tooltipDisabled) return
  el.$_isShow = true
  const tooltipElement = create(el)
  align(el)
  tooltipElement.style.zIndex = getNextZIndex()
}

function hide(el) {
  el.$_isShow = false
  remove(el)
}

function getTooltipElement(el) {
  return document.getElementById(el.$_tooltipId)
}

function create(el) {
  const id = uniqueId() + '_tooltip'

  el.$_tooltipId = id

  const container = document.createElement('div')
  container.id = id

  const tooltipArrow = document.createElement('div')
  tooltipArrow.className = 'tooltip-arrow'
  container.appendChild(tooltipArrow)

  const tooltipText = document.createElement('div')
  tooltipText.className = 'tooltip-text'

  if (el.$_tooltipEscape) {
    tooltipText.innerHTML = el.$_tooltipValue
  } else {
    tooltipText.innerHTML = ''
    tooltipText.appendChild(document.createTextNode(el.$_tooltipValue))
  }

  container.appendChild(tooltipText)
  document.body.appendChild(container)

  container.style.display = 'inline-block'

  return container
}

function remove(el) {
  if (el) {
    const tooltipElement = getTooltipElement(el)
    if (tooltipElement && tooltipElement.parentElement) {
      document.body.removeChild(tooltipElement)
    }
    el.$_tooltipId = null
  }
}

function align(el) {
  const modifiers = el.$_tooltipModifiers

  if (modifiers.top) {
    alignTop(el)
  } else if (modifiers.left) {
    alignLeft(el)
  } else if (modifiers.bottom) {
    alignBottom(el)
  } else if (modifiers['top-start']) {
    alignTopStart(el)
  } else {
    alignRight(el)
  }
}

function getHostOffset(el) {
  const offset = el.getBoundingClientRect()
  const targetLeft = offset.left // + DomHandler.getWindowScrollLeft()
  const targetTop = offset.top // + DomHandler.getWindowScrollTop()

  return { left: targetLeft, top: targetTop }
}

function alignRight(el) {
  preAlign(el, 'right')
  const tooltipElement = getTooltipElement(el)
  const hostOffset = getHostOffset(el)
  const left = hostOffset.left + DomUtil.getOuterWidth(el) + TARGET_MARGIN_ARROW
  const top =
    hostOffset.top +
    (DomUtil.getOuterHeight(el) - DomUtil.getOuterHeight(tooltipElement)) / 2
  tooltipElement.style.left = left + 'px'
  tooltipElement.style.top = top + 'px'
}

function alignLeft(el) {
  preAlign(el, 'left')
  const tooltipElement = getTooltipElement(el)
  const hostOffset = getHostOffset(el)
  const left =
    hostOffset.left -
    DomUtil.getOuterWidth(tooltipElement) -
    TARGET_MARGIN_ARROW
  const top =
    hostOffset.top +
    (DomUtil.getOuterHeight(el) - DomUtil.getOuterHeight(tooltipElement)) / 2
  tooltipElement.style.left = left + 'px'
  tooltipElement.style.top = top + 'px'
}

function alignTop(el) {
  preAlign(el, 'top')
  const tooltipElement = getTooltipElement(el)
  const hostOffset = getHostOffset(el)
  const left =
    hostOffset.left +
    (DomUtil.getOuterWidth(el) - DomUtil.getOuterWidth(tooltipElement)) / 2
  const top =
    hostOffset.top -
    DomUtil.getOuterHeight(tooltipElement) -
    TARGET_MARGIN_ARROW
  tooltipElement.style.left = left + 'px'
  tooltipElement.style.top = top + 'px'
}

function alignBottom(el) {
  preAlign(el, 'bottom')
  const tooltipElement = getTooltipElement(el)
  const hostOffset = getHostOffset(el)
  const left =
    hostOffset.left +
    (DomUtil.getOuterWidth(el) - DomUtil.getOuterWidth(tooltipElement)) / 2
  const top = hostOffset.top + DomUtil.getOuterHeight(el) + TARGET_MARGIN_ARROW
  tooltipElement.style.left = left + 'px'
  tooltipElement.style.top = top + 'px'
}

function alignTopStart(el) {
  preAlign(el, 'top-start')
  const tooltipElement = getTooltipElement(el)
  const hostOffset = getHostOffset(el)
  const left = hostOffset.left
  const top =
    hostOffset.top -
    DomUtil.getOuterHeight(tooltipElement) -
    TARGET_MARGIN_ARROW
  tooltipElement.style.left = left + 'px'
  tooltipElement.style.top = top + 'px'
}

function preAlign(el, position) {
  const tooltipElement = getTooltipElement(el)
  const modifiers = el.$_tooltipModifiers
  const smallCls = modifiers.small ? '-small' : ''

  tooltipElement.style.left = -999 + 'px'
  tooltipElement.style.top = -999 + 'px'
  tooltipElement.className = `app-tooltip -${position} ${smallCls}`
  setTimeout(function () {
    tooltipElement.className = 'app-tooltip -hidden'
  }, HIDDEN_AFTER_SECOND * 1000)
}

function getModifiers(options) {
  // modifiers
  if (options.modifiers && Object.keys(options.modifiers).length) {
    return options.modifiers
  }

  // arg
  if (options.arg && typeof options.arg === 'object') {
    return Object.entries(options.arg).reduce((acc, [key, val]) => {
      if (key === 'event' || key === 'position') acc[val] = true
      return acc
    }, {})
  }

  return {}
}

function bindTooltipOptions(el, options) {
  const { value } = options

  el.$_tooltipModifiers = getModifiers(options)

  if (typeof value === 'string') {
    el.$_tooltipValue = options.value
    el.$_tooltipDisabled = false
    el.$_tooltipEscape = false
  } else {
    el.$_tooltipValue = value.value
    el.$_tooltipDisabled = value.disabled || value.disabled || false
    el.$_tooltipEscape = value.escape || false
  }
}

const Tooltip = {
  bind(el, options) {
    bindTooltipOptions(el, options)
    bindEvents(el)
  },

  unbind(el) {
    remove(el)
    unbindEvents(el)
  },

  update(el, options) {
    const { value, oldValue } = options

    if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
      bindTooltipOptions(el, options)
      if (el.$_isShow) {
        hide(el)
        show(el)
      }
    }
  },
}

export default Tooltip
