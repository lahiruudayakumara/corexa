export interface ScanTarget {
  rootPath: string;
  include: string[];
  exclude: string[];
}

export interface FileDiscoveryResult {
  files: string[];
  ignored: string[];
}

export function scanWorkspace(target: ScanTarget): FileDiscoveryResult {
  return {
    files: [`${target.rootPath}/src/index.ts`],
    ignored: target.exclude,
  };
}
