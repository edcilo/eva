import configurations from "./config";
import configInterface from "./types";

function getValue(path: Array<string>, hashtag: configInterface): any {
  const module: string | undefined = path.shift();

  if (module === undefined) {
    return null;
  }

  const config: configInterface = hashtag[module];

  if (config === undefined) {
    return null;
  }

  if (path.length === 0) {
    return config;
  }

  return getValue(path, config);
}

export default function(tree: string, separator = "."): any {
  const path: Array<string> = tree.split(separator);

  return getValue(path, configurations);
}
