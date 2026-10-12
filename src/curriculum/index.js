import little from './littleLearners'
import explorers from './explorers'
import adventurers from './adventurers'
import champions from './champions'
import masters from './masters'
import detectives from './detectives'

export const BANDS = [little, explorers, adventurers, champions, masters, detectives]

export const getBand = (id) => BANDS.find(b => b.id === id)
