export interface Describeable {
  getDescription: () => string;
  setDescription: (description: string) => void;
}
