// Moves the printed number on each number side to the centre of its wave shape.
// Only the digit pixels move: they are lifted off as a darkness mask, the old ones are
// painted out with white (they sit on the white shape), and the mask is laid back down
// at the shape's centre. usage: swift tools/centre-numbers.swift <orig dir> <out dir> <offsets "id dx dy">
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
let a = CommandLine.arguments
let src = a[1], dst = a[2]
let R0 = (x: 330, y: 957, w: 66, h: 25)                       // the digits, px from the top-left of 724×1087
for line in try! String(contentsOfFile: a[3], encoding: .utf8).split(separator: "\n") {
    let f = line.split(separator: " "); let id = Int(f[0])!
    let dx0 = Double(f[1])!, dy0 = Double(f[2])!                  // measured at 724 px wide
    let name = String(format: "num-%02d.jpg", id)
    guard let isrc = CGImageSourceCreateWithURL(URL(fileURLWithPath: "\(src)/\(name)") as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(isrc, 0, nil) else { continue }
    let W = img.width, H = img.height
    let k = Double(W) / 724                                        // the same layout at any render size
    let dx = Int((dx0 * k).rounded()), dy = Int((dy0 * k).rounded())
    let R = (x: Int(Double(R0.x) * k), y: Int(Double(R0.y) * k), w: Int(Double(R0.w) * k), h: Int(Double(R0.h) * k))
    let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4,
                        space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: W, height: H))
    if abs(dx0) > 1 || abs(dy0) > 1 {
        let p = ctx.data!.bindMemory(to: UInt8.self, capacity: W * H * 4)
        let at = { (x: Int, y: Int) in (y * W + x) * 4 }                  // bitmap rows run top-down here
        // darkness of each digit pixel: 0 = paper white, 1 = full ink (neutral pixels only)
        var ink = [Double](repeating: 0, count: R.w * R.h)
        for j in 0..<R.h { for i in 0..<R.w {
            let k = at(R.x + i, R.y + j); let r = Double(p[k]), g = Double(p[k+1]), b = Double(p[k+2])
            let sat = max(r, g, b) - min(r, g, b), lum = (r + g + b) / 3
            if sat < 40 && lum < 235 { ink[j * R.w + i] = (235 - lum) / 235 }
        }}
        for j in 0..<R.h { for i in 0..<R.w where ink[j * R.w + i] > 0 {      // paint the old digits out
            let k = at(R.x + i, R.y + j); p[k] = 255; p[k+1] = 255; p[k+2] = 255 } }
        for j in 0..<R.h { for i in 0..<R.w {                                // and lay them down centred
            let m = ink[j * R.w + i]; if m <= 0 { continue }
            let k = at(R.x + i + dx, R.y + j + dy)
            for c in 0..<3 { p[k+c] = UInt8(Double(p[k+c]) * (1 - m) + 22 * m) } } }
    }
    let out = CGImageDestinationCreateWithURL(URL(fileURLWithPath: "\(dst)/\(name)") as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(out, ctx.makeImage()!, [kCGImageDestinationLossyCompressionQuality: 0.92] as CFDictionary)
    CGImageDestinationFinalize(out)
}
print("done")
