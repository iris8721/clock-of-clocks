# Clock of Clocks

A recreation of the ["A Million Times"](https://www.humanssince1982.com/a-million-times) kinetic art installation by Humans since 1982: a digital clock where each digit is a 4×6 grid of tiny analog clocks whose hands rotate to trace the glyph.

Vanilla HTML/CSS/JS — no dependencies, no build step, ~265 lines.

## Run

Open `index.html` in a browser, or serve the directory statically (e.g. GitHub Pages, `python3 -m http.server`).

## How it works

- Each digit glyph is authored as a 4×6 array of box-drawing characters (`┌ ─ ┐ | └ ┘ ?`) — a readable ASCII sketch of the digit.
- `charToAngles` maps each character to an `[hour, minute]` hand-angle pair in degrees. A corner like `┌` becomes hands at 90° and 180°; `?` is a filler cell with both hands parked at 225°.
- `createClock` builds a `.clock` div with two `.hand` children; rotation is a pure CSS `transform: rotate(...)`.
- Every second, `updateDisplay` reads `HH:MM:SS` and rewrites the hand transforms for all 144 clocks. The `transition: transform 1s ease-in-out` on `.hand` produces the signature sweeping animation for free.

## Design notes

- Glyph-as-text encoding keeps the digit definitions legible and editable — the shape of each numeral is visible directly in the source.
- Hands are never removed or re-created; only transforms change, so the per-second update is cheap despite 288 animated hands.
- Colon separators are static styled divs, not clock grids.

## Known limitations

- Fixed 40px clock size; the layout doesn't scale to small viewports.
- Hands always take the shortest CSS transition path, so they can rotate "backwards" between digits — the original installation choreographs direction.
- Colons don't blink.

## License

MIT — see [LICENSE](LICENSE). "A Million Times" is a work by Humans since 1982; this is an unofficial homage.
