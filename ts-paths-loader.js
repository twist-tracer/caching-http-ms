import {register} from "node:module";
import {pathToFileURL} from "node:url";

register("ts-paths-esm-loader", pathToFileURL("./"));
