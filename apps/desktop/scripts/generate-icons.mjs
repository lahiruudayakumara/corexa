import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const sourcePng = join(rootDir, "resources/brand/corexa-mark.png");
const iconsDir = join(rootDir, "resources/icons");
const iconsetDir = join(iconsDir, "corexa.iconset");
const icnsPath = join(iconsDir, "corexa.icns");
const icoPath = join(iconsDir, "corexa.ico");
const desktopPngPath = join(iconsDir, "corexa-app-icon.png");
const icnsTiffPath = join(iconsDir, "corexa-multi.tiff");
const swiftModuleCacheDir = join(rootDir, ".swift-module-cache");
const swiftScriptPath = join(__dirname, "render-app-icons.swift");

function runOrThrow(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status ?? "unknown"}`,
    );
  }
}

function buildIco(outputPath, images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;

  images.forEach((image, index) => {
    const entryOffset = 6 + index * 16;
    header.writeUInt8(image.width >= 256 ? 0 : image.width, entryOffset);
    header.writeUInt8(image.height >= 256 ? 0 : image.height, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(image.data.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += image.data.length;
  });

  writeFileSync(outputPath, Buffer.concat([header, ...images.map((image) => image.data)]));
}

mkdirSync(iconsDir, { recursive: true });
mkdirSync(swiftModuleCacheDir, { recursive: true });
rmSync(iconsetDir, { recursive: true, force: true });
mkdirSync(iconsetDir, { recursive: true });

runOrThrow("swift", [
  "-module-cache-path",
  swiftModuleCacheDir,
  swiftScriptPath,
  sourcePng,
  iconsetDir,
]);

const iconsetPngPath = join(iconsetDir, "icon_512x512@2x.png");
copyFileSync(iconsetPngPath, desktopPngPath);

if (existsSync(icnsPath)) {
  rmSync(icnsPath, { force: true });
}

runOrThrow("tiffutil", [
  "-cat",
  join(iconsetDir, "icon_16x16.png"),
  join(iconsetDir, "icon_32x32.png"),
  join(iconsetDir, "icon_128x128.png"),
  join(iconsetDir, "icon_256x256.png"),
  join(iconsetDir, "icon_512x512.png"),
  join(iconsetDir, "icon_512x512@2x.png"),
  "-out",
  icnsTiffPath,
]);
runOrThrow("tiff2icns", [icnsTiffPath, icnsPath]);
rmSync(icnsTiffPath, { force: true });

const icoSources = [
  { fileName: "icon_16x16.png", width: 16, height: 16 },
  { fileName: "icon_32x32.png", width: 32, height: 32 },
  { fileName: "icon_32x32@2x.png", width: 64, height: 64 },
  { fileName: "icon_128x128.png", width: 128, height: 128 },
  { fileName: "icon_256x256.png", width: 256, height: 256 },
].map((entry) => ({
  ...entry,
  data: readFileSync(join(iconsetDir, entry.fileName)),
}));

buildIco(icoPath, icoSources);

console.log(`Updated Corexa desktop icon assets:
- ${desktopPngPath}
- ${icoPath}
- ${icnsPath}
- ${iconsetDir}`);
