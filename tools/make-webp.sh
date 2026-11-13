#!/bin/sh
# The site serves WebP; the JPEG masters stay local in tools/cards-jpg (not published).
# Number sides keep a higher quality so the printed grain in the gradients survives.
# usage: tools/make-webp.sh      Needs: cwebp (brew install webp)
cd "$(dirname "$0")/.." || exit 1
for f in tools/cards-jpg/*.jpg; do
  n=$(basename "$f" .jpg)
  case $n in num-*) q=88;; face-*) q=82;; *) q=80;; esac
  cwebp -quiet -q $q -m 6 -sharp_yuv "$f" -o "assets/cards/$n.webp"
done
