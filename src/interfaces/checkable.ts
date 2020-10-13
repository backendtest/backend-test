export interface Checkable {
  isChecked: () => boolean;
  check: () => void;
  unCheck: () => void;
}
