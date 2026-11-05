# Doorways AR

Scan the number side of a Doorways card → a holographic 3-D card lands on it, flips to the
emotion face, and a glass sheet shows the emotion, its base emotion and a journaling prompt.
No camera (or permission refused) → the deck grid, same card + sheet.

## Run locally
    cd ~/DoorwaysAR && python3 -m http.server 8765
Open http://localhost:8765 (camera works on localhost on a desktop). Add `?debug` to see
the colour-match scores.

**On a phone it must be HTTPS** (iPhone Safari won't open the camera otherwise). Any static
host works: Vercel, Netlify, GitHub Pages. No build step; upload the folder as is.
The tuck-box QR should point at that URL.

## How recognition works
All 48 number sides share the same white line art; only the gradient differs.
1. `assets/targets.mind`: one MindAR target made from the line art common to every card
   (`tools/mean-target.png`). It gives the card's position in 3-D.
2. `sig.js` + `signatures.js`: with that pose, the app samples the camera at 54 points on the
   card and matches the colours (Oklab, exposure-normalised) against each card's signature.
   Several agreeing frames lock the card.
`node tools/confusion-test.mjs` checks the 48 signatures stay apart under simulated lighting.

## Files
- `data.js`: the 48 cards: number, emotion, base emotion, card text, colours, prompts.
  **prompts[0]** is the deck's own prompt; **prompts[1–2]** are drafts. Edit freely.
- `assets/cards/num-NN.jpg`, `face-NN.jpg`: rendered from Doorways-Final.ai at trim.
- `assets/logo-doorways.svg`, `logo-were.svg`: the marks, lifted from the cover.

## When the card art changes
    F=~/Library/Mobile\ Documents/com~apple~CloudDocs/Projects/We\*re/Doorways/Doorways-Final.ai
    cd assets/cards && for k in $(seq 1 48); do n=$(printf %02d $k)
      pdftoppm -r 230 -x 27 -y 27 -W 724 -H 1087 -jpeg -jpegopt quality=86 -f $((2*k-1)) -l $((2*k-1)) -singlefile "$F" num-$n
      pdftoppm -r 230 -x 27 -y 27 -W 724 -H 1087 -jpeg -jpegopt quality=86 -f $((2*k)) -l $((2*k)) -singlefile "$F" face-$n; done
    cd ../.. && tools/build-targets.sh
