import { atom } from "jotai";

export const ffgsDate = atom('2023-10-23');
export const ffgsHrs = atom('06');
export const ffgs06HrsDataCache = atom({});
export const ffgs12HrsDataCache = atom({});
export const ffgs24HrsDataCache = atom({});
export const ffgsEventDataCache = atom({});
export const ffgsParamSelection = atom('FFG06'); // 'FFG06'
export const ffgsLayerVisibility = atom(true);