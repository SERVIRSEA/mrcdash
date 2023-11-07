import { atom } from "jotai";

export const expandAtom = atom(false);
export const fullScreenAtom = atom(false);
export const reservoirAtom = atom('Battambang_1');
// export const apiKeyAtom = atom(process.env.API_KEY);
export const sideNavContentWidthAtom = atom('300px')
export const currentBasemapAtom = atom('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}')

export const statTabValueAtom = atom(0);
export const statTabContentRefsAtom = atom({});

// Drought Forecast Menu
export const cdiLayerVisibilityAtom = atom(true)
export const iswfLayerVisibilityAtom = atom(false)
export const spi1LayerVisibilityAtom = atom(false)

// Common layer control
export const lmbLayerVisibilityAtom = atom(true);
export const lmbRiverLayerVisibilityAtom = atom(true);
export const lmbSubProvLayerVisibilityAtom = atom(false);