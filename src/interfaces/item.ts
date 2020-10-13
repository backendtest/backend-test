import { Checkable } from "./checkable";
import { Describeable } from "./describeable";
import { Identifiable } from "./identifiable";

export interface Item extends Identifiable, Describeable, Checkable { }
