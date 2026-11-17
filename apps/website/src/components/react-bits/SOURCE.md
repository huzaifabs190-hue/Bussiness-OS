# Supplied React Bits components

MagicBento, AnimatedList, SpotlightCard and PatternWaves were supplied in full by the user on November 16, 2026. They are vendored unchanged. PatternWaves uses ogl; MagicBento and AnimatedList use the existing Hugeicons packages. Application integration lives in NextExperience.tsx, Effects.tsx and black.css. Example file names and generic integration/security claims from the supplied demos are replaced by actual BusinessOS demo navigation and clearly labeled sample data.

SwarmCursor, PlasmaWave, ReflectiveCard, LaserFlow, ElectricBorder and GradientASCII were supplied in full by the user on November 15, 2026, attributed to React Bits (https://reactbits.dev). Their JSX and CSS are retained locally rather than fetched at runtime.

GlassSurface JSX/CSS and the upstream LICENSE.md were retrieved from https://github.com/DavidHDev/react-bits at commit cf2801031f07f53d4684e65b961bde7c2e2a6921 on November 16, 2026. The accompanying license permits use in applications/websites and restricts redistribution of the components themselves. Preserve LICENSE.md when distributing this application.

GlassSurface.tsx provides typed application defaults (-180 distortion, 0.5 displacement, 0.1 background opacity), including optional shape and backdrop props. GlassLayer provides in-view decorative backings while preserving existing semantic elements and keyboard focus. Large surfaces and reduced-motion devices use the vendor's frosted fallback; compact surfaces can refract. Shared controls use matching CSS frosting. Receipt paper remains plain for printing.

Integration lives outside these vendor sources: typed boundaries, lazy imports, in-view mounting, an effect error boundary, explicit motion preferences and reduced-motion handling. ReflectiveCard always uses webcam=false and no video URL. Its dependencies are @hugeicons/react and @hugeicons/core-free-icons.

The original JavaScript component internals are not TypeScript-checked. Our integration and application code remain TypeScript checked. Browser checks cover the integrated experience.

All seven JSX/CSS files were compared against the user's replacement attachments on November 16, 2026 and match. The visibility correction is in the application integration: reduced motion no longer unmounts every visual component, and the initial theme matches the supplied dark reference. No vendor source changes were necessary.
