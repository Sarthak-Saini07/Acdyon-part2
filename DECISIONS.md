# Architecture & UX Design Decisions

## 1. CSS Strategy: Bespoke Vanilla CSS vs. Tailwind / CSS-in-JS

For this challenge, we chose a pure **Vanilla CSS** design system utilizing CSS Custom Properties (Variables) over utility frameworks like Tailwind CSS or styling libraries.

### Why Vanilla CSS?
- **Extreme Visual Control**: Custom components like the rising coffee-steam gradient animation and the retro terminal overlays require highly specific CSS keyframes and animations that are clumsy to express using Tailwind's utility classes.
- **Flawless Theme Switching**: By scoping CSS custom properties inside `:root` and `:root[data-theme='light']`, toggling modes is a matter of changing a single DOM attribute. Theme variables transition smoothly (backgrounds, text, borders) via a single rule in `global.css`.
- **Zero Build-Time Bloat**: No postcss dependencies, no configuration files, and zero runtime overhead.

---

## 2. Technical Trade-offs & "One Week" Scope

Under the constraints of this challenge, we focused on delivering high-fidelity interactive elements (simulated API ping actions, theme override HUD controllers, and copy commands) in a unified single-page layout.

### Made Trade-off
- **Simulated Metrics Engine**: The Interactive API Inspector uses a simulated backend latency generator instead of calling a live WebSocket. The metrics flicker and refresh, giving a responsive feedback loop, but are entirely client-side.

### What We Would Build in a Full Week
1. **Live Local Engine daemon**: Create a lightweight Node/Go CLI binary that runs locally, performs actual TCP network socket tests, and pipes real logs and diffs via WebSockets to the web inspector interface.
2. **Interactive Schema Modeler**: Add a visual schema builder in the "Raw Schema" tab, allowing users to drag and drop JSON types and visually test validations.
3. **Persisted HUD Configuration**: Allow users to save their design system variables (color shifts, grid configurations) as persistent configurations in local storage or import/export them as a JSON theme packet.

---

## 3. AI Disclosure & Verification Audit

### AI Usage
- Large Language Models were used to bootstrap the base React component structures (`Navbar`, `Hero`, `Features`, `ProductDemo`, `EasterEgg`, `Footer`), outline initial layout structures, and suggest harmonious color hex values matching the Coffee palette request.

### Manual Verification & Audit Actions
- **Event Loop & Trigger Isolation**: Audited the window keydown listener in `EasterEgg.jsx` to prevent key buffering memory leaks. Added cleanup handlers and buffered input size limits (max 6 characters) so search sequences do not consume memory.
- **Scrollbar and Overflow Containment**: Inspected mobile layout scaling (390px - 768px). Manually fixed potential flexbox wrap expansions and ensured `overflow-x: hidden` was applied at the body level to guarantee exactly `0px` horizontal overflow.
- **Dynamic Contrast & Typography Audits**: Audited font contrast in Light Mode (`data-theme='light'`). Readjusted text secondary colors to `#5c473c` and borders to `#e3d5c5` to ensure AAA contrast ratios against the oat milk background.
- **Build Compilation Check**: Ran production compilations locally to verify that all Lucide React imports compile and tree-shake successfully.
