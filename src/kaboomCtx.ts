import kaboom from "kaboom";
import { scale } from "./constants";

export const k = kaboom({
    width: 275 * scale,
    height: 150 * scale,
    letterbox: true,
    scale,
    global: false,
});