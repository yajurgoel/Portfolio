In this download, omit `dist/` from the paths below: the site files are directly in this folder.

# Yajur Goel — engineering portfolio

Open `dist/index.html` in a browser, or serve the `dist` folder using any static web server. The Immensa story is at `dist/immensa.html`. There is no dependency installation or build step.

## Edit the Immensa story

- **Captions and stage titles:** edit `STORY.stages` at the top of `dist/assets/immensa.js`. Each object is one scroll stage. Its `description` is the accessible description of the visual.
- **Your photos:** put files in `dist/assets/`, then add `image: 'assets/your-photo.jpg'` and `imageAlt: 'A description of the image'` to the relevant stage object. A configured photo replaces that stage's SVG visual.
- **Example dimensions:** edit `STORY.dimensions` in millimeters. Values change the labels; they do not rescale the illustrative model.
- **Example tolerance:** edit `STORY.tolerance` in millimeters. The legend updates. The comparison uses smooth radial color fields and a continuous color legend. The illustration is conceptual; it does not compute actual mesh deviation. Replace the comparison visual with your measured result when available.
- **SVG geometry:** `#bolt-outline` and `#solid-bolt` in `immensa.html` define the part. The mesh, laser, and comparison layers share its coordinate system. If changing geometry, also adjust dimensions, thread geometry, and patch positions to fit.
- **Styling:** `dist/assets/immensa.css` uses the same paper, olive, and orange palette as the original portfolio.
- **Scroll timing:** `--stage-distance` controls distance per stage (100svh by default). Each stage occupies one viewport-length interval, except Rebuild, which uses three to show point selection, dimensioning, and a full revolve. `stageLengths` in the script and the track-height multiplier in the CSS must stay in sync. The scene is pinned using CSS `position: sticky`; a passive scroll listener updates SVG properties in requestAnimationFrame. No scroll interception or external animation library is used.

## Accessibility and behavior

Stage buttons support keyboard navigation. The page includes a skip link and a full-text workflow transcript. Reduced-motion users see completed stage states without laser sweeps or rotations. Scrolling backward restores the previous state. The illustration and example measurements are explicitly labeled as illustrative.

## Validation

Checked all eight stage states, backward transitions, desktop and mobile layouts (including 390×844 and 320×568), and browser console output. A local state harness also checked the normal- and reduced-motion paths. The live local preview uses port 4173. Publishing is pending because session approval policy blocked the source synchronization step.

The rebuild cursor and click timing are defined in `renderRebuild()`. The shaft is revolved first; the hex head and threads are added as finishing features.
