const { FormError, FormHelper, FormField } = require('@rsmdc/rsmdc')
const appbar = require('@rsmdc/appbar/loader')
const appLayout = require('@rsmdc/app-layout/loader')
const button = require('@rsmdc/button/loader')
const checkbox = require('@rsmdc/checkbox/loader')
const chips = require('@rsmdc/chips/loader')
const dialog = require('@rsmdc/dialog/loader')
const drawer = require('@rsmdc/drawer/loader')
const list = require('@rsmdc/list/loader')
const menu = require('@rsmdc/menu/loader')
const radio = require('@rsmdc/radio/loader')
const select = require('@rsmdc/select/loader')
const textfield = require('@rsmdc/textfield/loader')
const rsswitch = require('@rsmdc/switch/loader')

appbar.defineCustomElements(window)
appLayout.defineCustomElements(window)
button.defineCustomElements(window)
checkbox.defineCustomElements(window)
chips.defineCustomElements(window)
dialog.defineCustomElements(window)
drawer.defineCustomElements(window)
list.defineCustomElements(window)
menu.defineCustomElements(window)
radio.defineCustomElements(window)
select.defineCustomElements(window)
textfield.defineCustomElements(window)
rsswitch.defineCustomElements(window)
window.customElements.define('rs-form-error', FormError)
window.customElements.define('rs-form-helper', FormHelper)
window.customElements.define('rs-form-field', FormField)