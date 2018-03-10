'use strict'

//*** STATE */
const state = {
  contacts: []
}

//*** SELECTORS */
const VIEW_CONTAINER = 'data'
const DATA_HOLDER = "data-holder"
const ROWS = 'li.row'

//*** QUERIES */
const app = document.getElementById(VIEW_CONTAINER)
const holder = document.getElementById(DATA_HOLDER)
const rows = document.querySelectorAll(ROWS)

//*** DATA STORAGE FUNCS */
const setView = (viewToSet) => {
  view = viewToSet
}

//*** STATE FUNCTS */
const setState = (key, value) => {
  state[key] = value
}

const getState = () => state

//*** DOM MANIPULATION */
const createDomElem = (elemType, properties, text, ...children) => {
  const newElem = document.createElement(elemType)
  if (text){
    const textNode = document.createTextNode(text)
    newElem.appendChild(textNode)
  }
  if (properties){
    Object.keys(properties).forEach(prop => {
      if (prop === 'onsuccess') { // setting non-standard attibute
        newElem.setAttribute('data-onsuccess', 'onSignIn')
      }
      newElem[prop] = properties[prop]
    })
  }
  if (children.length > 0){
    appendChildrenHelper(newElem, ...children)
  }
  return newElem;
}

const removeDomElem = (parent, child) => {
  parent.removeChild(child)
}

const appendChildrenHelper = (parent, ...children) => {
  for (let i = 0; i < children.length; i++){
    parent.appendChild(children[i])
  }
}

//*** ELEMENTS */
const div = (...args) => createDomElem('div', ...args)
const p = (...args) => createDomElem('p', ...args)
const li = (...args) => createDomElem('li', ...args)
const ul = (...args) => createDomElem('ul', ...args)
