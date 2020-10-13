import { api } from "../src/api/api";
import express from "express";
import { PersistentStorageMode } from "./enums/persistentStorageMode";

const app = express();
const port = 8080;
const persistentStorageMode = PersistentStorageMode.None;

switch (persistentStorageMode) {
  case PersistentStorageMode.None:
    console.log(`Persistent storage is disabled`);
    break;
  case PersistentStorageMode.MongoDB:
    console.log(`Persistent storage is set to MongoDB`);
    break;
  case PersistentStorageMode.PostgreSQL:
    console.log(`Persistent storage is set to PostgreSQL`);
    break;
}

app.use("/", api);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
