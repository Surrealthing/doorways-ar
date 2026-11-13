#!/bin/zsh
# Rebuild assets/targets.mind + signatures.js after the card art changes.
# Needs: tools/cards-jpg/num-01..48.jpg already rendered (see README), Google Chrome.
cd "${0:A:h}/.."
python3 -m http.server 8765 --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader \
  --remote-debugging-port=9335 --user-data-dir=$(mktemp -d) http://127.0.0.1:8765/tools/prep.html >/dev/null 2>&1 & CH=$!
node tools/poll.mjs 9335 && node tools/collect.mjs 9335
kill $CH $SRV 2>/dev/null
node tools/confusion-test.mjs
