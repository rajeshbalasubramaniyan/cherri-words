import little from './littleLearners'
import explorers from './explorers'
import adventurers from './adventurers'
import champions from './champions'
import masters from './masters'

export const BANDS = [little, explorers, adventurers, champions, masters]

export const getBand = (id) => BANDS.find(b => b.id === id)
