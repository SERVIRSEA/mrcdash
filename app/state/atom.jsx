import { atom } from "jotai";

export const expandAtom = atom(false);
export const fullScreenAtom = atom(false);
export const expandContentAtom = atom(false);

// export const apiKeyAtom = atom(process.env.API_KEY);
export const sideNavContentWidthAtom = atom('300px')
export const currentBasemapAtom = atom('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}')

export const statTabValueAtom = atom(2);
export const statTabContentRefsAtom = atom({});

// Drought Forecast Menu
export const cdiLayerVisibilityAtom = atom(false)
export const iswfLayerVisibilityAtom = atom(false)
export const spi1LayerVisibilityAtom = atom(false)

// Common layer control
export const lmbLayerVisibilityAtom = atom(true);
export const lmbRiverLayerVisibilityAtom = atom(true);
export const lmbSubProvLayerVisibilityAtom = atom(false);
export const subProvinceDataAtom = atom(null);

// Legend control atom
export const activeMenuAtom = atom(0);

// Reservoir
export const reservoirAtom = atom('Lam_Pao');
export const reservoirVisibilityAtom = atom(false);
export const infoDataAtom = atom({});
export const inflowDataAtom = atom({});
export const outflowDataAtom = atom({});
export const reservoirDataAtom = atom(null);