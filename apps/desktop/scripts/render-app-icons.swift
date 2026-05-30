import AppKit
import Foundation

struct IconVariant {
  let fileName: String
  let pixelSize: Int
}

let variants: [IconVariant] = [
  .init(fileName: "icon_16x16.png", pixelSize: 16),
  .init(fileName: "icon_16x16@2x.png", pixelSize: 32),
  .init(fileName: "icon_32x32.png", pixelSize: 32),
  .init(fileName: "icon_32x32@2x.png", pixelSize: 64),
  .init(fileName: "icon_128x128.png", pixelSize: 128),
  .init(fileName: "icon_128x128@2x.png", pixelSize: 256),
  .init(fileName: "icon_256x256.png", pixelSize: 256),
  .init(fileName: "icon_256x256@2x.png", pixelSize: 512),
  .init(fileName: "icon_512x512.png", pixelSize: 512),
  .init(fileName: "icon_512x512@2x.png", pixelSize: 1024),
]

func fail(_ message: String) -> Never {
  fputs("error: \(message)\n", stderr)
  exit(1)
}

guard CommandLine.arguments.count >= 3 else {
  fail("usage: swift render-app-icons.swift <source-png> <iconset-output-dir>")
}

let sourceURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
let fileManager = FileManager.default

guard fileManager.fileExists(atPath: sourceURL.path) else {
  fail("source image not found at \(sourceURL.path)")
}

do {
  try fileManager.createDirectory(at: outputURL, withIntermediateDirectories: true)
} catch {
  fail("failed to create output directory: \(error.localizedDescription)")
}

guard let sourceImage = NSImage(contentsOf: sourceURL) else {
  fail("failed to load source image")
}

func makeBitmap(size: Int) -> NSBitmapImageRep {
  guard let bitmap = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: size,
    pixelsHigh: size,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
  ) else {
    fail("failed to allocate bitmap for \(size)x\(size)")
  }

  bitmap.size = NSSize(width: size, height: size)
  return bitmap
}

for variant in variants {
  let size = CGFloat(variant.pixelSize)
  let bitmap = makeBitmap(size: variant.pixelSize)

  NSGraphicsContext.saveGraphicsState()

  guard let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
    fail("failed to create graphics context for \(variant.fileName)")
  }

  NSGraphicsContext.current = context
  context.imageInterpolation = .high
  context.cgContext.setShouldAntialias(true)
  context.cgContext.clear(CGRect(x: 0, y: 0, width: size, height: size))

  let canvasRect = NSRect(x: 0, y: 0, width: size, height: size)
  let cardInset = max(1, size * 0.075)
  let cardRect = canvasRect.insetBy(dx: cardInset, dy: cardInset)
  let cardRadius = max(4, cardRect.width * 0.24)
  let imageInset = max(1, size * 0.018)
  let imageRect = cardRect.insetBy(dx: imageInset, dy: imageInset)

  let cardPath = NSBezierPath(roundedRect: cardRect, xRadius: cardRadius, yRadius: cardRadius)
  NSColor(calibratedRed: 0.988, green: 0.984, blue: 0.973, alpha: 1).setFill()
  cardPath.fill()

  NSColor(calibratedRed: 0.878, green: 0.859, blue: 0.831, alpha: 1).setStroke()
  cardPath.lineWidth = max(1, size * 0.006)
  cardPath.stroke()

  NSGraphicsContext.saveGraphicsState()
  cardPath.addClip()
  sourceImage.draw(in: imageRect, from: .zero, operation: .sourceOver, fraction: 1)
  NSGraphicsContext.restoreGraphicsState()

  NSGraphicsContext.restoreGraphicsState()

  guard let pngData = bitmap.representation(using: .png, properties: [:]) else {
    fail("failed to serialize \(variant.fileName)")
  }

  let destinationURL = outputURL.appendingPathComponent(variant.fileName)

  do {
    try pngData.write(to: destinationURL, options: .atomic)
  } catch {
    fail("failed to write \(destinationURL.path): \(error.localizedDescription)")
  }
}

print("Rendered \(variants.count) rounded app icon assets into \(outputURL.path)")
