export interface CorexaPluginManifest {
  id: string;
  name: string;
  version: string;
  entrypoint: string;
  permissions: string[];
  contributes: {
    commands?: string[];
    panels?: string[];
    agents?: string[];
  };
}
