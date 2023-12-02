import { Anchor } from '../../services/rocks'

export const getAnchorName = (anchor: Anchor) => {
  switch (anchor) {
    case 'none': 
      return 'bez stanowiska';
    case 'chain_anchor':
      return 'stanowisko zjazdowe';
    case 'two_rings':
      return 'ringi zjazdowe';
    case 'rescue_ring':
      return 'ring ratowniczy';
    default:
      return 'brak info o stanowisku';
  }
}