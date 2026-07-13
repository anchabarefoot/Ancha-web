// Paleta de colores para placeholders de imágenes
const SWATCHES = {
  sand:   '#d4c4b0',
  taupe:  '#9a8878',
  ivory:  '#ede8e0',
  camel:  '#b8966a',
  slate:  '#8898a0',
  blush:  '#d4a898',
  khaki:  '#b0a888',
  dusk:   '#9888a8',
};

export const calzado = [
  { id: 'c1', name: 'Mule Toscana', category: 'calzado', sub: 'Mules', price: 89900, color1: SWATCHES.sand,  color2: SWATCHES.taupe,  sizes: [35,36,37,38,39,40], tag: 'Nuevo' },
  { id: 'c2', name: 'Sandalia Córdoba', category: 'calzado', sub: 'Sandalias', price: 74900, color1: SWATCHES.ivory, color2: SWATCHES.camel,  sizes: [35,36,37,38,39,40], tag: 'Más vendido' },
  { id: 'c3', name: 'Bota Pampa', category: 'calzado', sub: 'Botas', price: 149900, color1: SWATCHES.camel,  color2: '#3a2a1a',       sizes: [35,36,37,38,39,40], tag: null },
  { id: 'c4', name: 'Zueco Quebracho', category: 'calzado', sub: 'Zuecos', price: 64900, color1: SWATCHES.taupe,  color2: SWATCHES.sand,   sizes: [35,36,37,38,39,40], tag: 'Nuevo' },
  { id: 'c5', name: 'Mocasín Litoral', category: 'calzado', sub: 'Mocasines', price: 99900, color1: '#2a2a2a',    color2: SWATCHES.camel,  sizes: [35,36,37,38,39,40], tag: null },
  { id: 'c6', name: 'Ballerina Pampas', category: 'calzado', sub: 'Bailarinas', price: 59900, color1: SWATCHES.ivory, color2: SWATCHES.sand,   sizes: [35,36,37,38,39,40], tag: 'Más vendido' },
];

export const indumentaria = [
  { id: 'i1', name: 'Cardigan Lino', category: 'indumentaria', sub: 'Sweaters', price: 119900, color1: SWATCHES.khaki, color2: SWATCHES.ivory, sizes: ['XS','S','M','L','XL'], tag: 'Nuevo' },
  { id: 'i2', name: 'Camisa Overa', category: 'indumentaria', sub: 'Camisas', price: 89900, color1: '#f0e8d8', color2: SWATCHES.sand,  sizes: ['XS','S','M','L'], tag: null },
  { id: 'i3', name: 'Pantalón Recto', category: 'indumentaria', sub: 'Pantalones', price: 109900, color1: '#c8c0b0', color2: '#2a2822', sizes: ['XS','S','M','L','XL'], tag: 'Más vendido' },
  { id: 'i4', name: 'Vestido Pampa', category: 'indumentaria', sub: 'Vestidos', price: 139900, color1: SWATCHES.blush, color2: SWATCHES.dusk,  sizes: ['XS','S','M','L'], tag: 'Nuevo' },
  { id: 'i5', name: 'Top Tejido', category: 'indumentaria', sub: 'Tops', price: 69900, color1: SWATCHES.sand,  color2: '#d0b890', sizes: ['XS','S','M','L'], tag: null },
  { id: 'i6', name: 'Saco Quebracho', category: 'indumentaria', sub: 'Sacos', price: 159900, color1: SWATCHES.slate, color2: SWATCHES.khaki, sizes: ['XS','S','M','L','XL'], tag: null },
];

export const featured = [
  { ...calzado[0], heroColor: '#e8ddd0' },
  { ...indumentaria[3], heroColor: '#f0e4dc' },
  { ...calzado[2], heroColor: '#d8c8b0' },
];

export const formatPrice = p =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(p);
