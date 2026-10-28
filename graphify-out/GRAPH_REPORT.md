# Graph Report - developer-portfolio  (2026-10-29)

## Corpus Check
- 58 files · ~20,539 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .css 13, .woff2 12, .woff 10)

## Summary
- 285 nodes · 574 edges · 33 communities (15 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e56d417a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ContainerBlock
- ref_react
- index.js
- cmsportfolio/package.json
- dependencies
- package.json
- next
- ContainerBlock.js
- paths
- _app.js
- schema.js
- tailwindcss
- clsx
- overrides
- scripts
- spotify.js
- engines
- README.md
- tsconfig.json
- eslint-config-next@^16.0.1
- @fortawesome/free-brands-svg-icons@^6.3.0
- @fortawesome/free-regular-svg-icons@^6.3.0
- @fortawesome/react-fontawesome@^0.2.0
- postcss@^8.5.8
- react-dom@^19.2.0
- react-scroll@^1.8.6
- @sanity/block-content-to-react
- @sendgrid/mail@^8.1.6
- @tailwindcss/aspect-ratio@^0.4.0

## God Nodes (most connected - your core abstractions)
1. `Section()` - 27 edges
2. `ContainerBlock()` - 23 edges
3. `next` - 19 edges
4. `PageHeader()` - 17 edges
5. `MediaCard()` - 12 edges
6. `userData` - 12 edges
7. `paths` - 9 edges
8. `@sanity/image-url` - 9 edges
9. `Home()` - 8 edges
10. `FavouriteTrips()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `About()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/about.js → components/ContainerBlock.js
- `experience()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/experience.js → components/ContainerBlock.js
- `Home()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/index.js → components/ContainerBlock.js
- `Home()` --calls--> `ContactCta()`  [EXTRACTED]
  pages/index.js → components/frontpage/ContactCta.js
- `Home()` --calls--> `Services`  [EXTRACTED]
  pages/index.js → components/frontpage/Services.js

## Import Cycles
- None detected.

## Communities (33 total, 18 thin omitted)

### Community 0 - "ContainerBlock"
Cohesion: 0.09
Nodes (28): Contact(), ContainerBlock(), Carousel(), Chevron(), pad(), PageHeader(), client, @sanity/client@^2.21.7 (+20 more)

### Community 1 - "ref_react"
Cohesion: 0.15
Nodes (20): AboutEducation(), AboutExperience(), AboutWork(), Row(), AboutMeHeader(), facts, CodeStack(), groups (+12 more)

### Community 2 - "index.js"
Cohesion: 0.13
Nodes (23): FavouritePosts(), builder, FavouriteTrips(), formatDate(), cellStyle(), Hero(), OsloClock(), formatDate() (+15 more)

### Community 3 - "cmsportfolio/package.json"
Cohesion: 0.08
Nodes (28): author, dependencies, prop-types@^15.7, react@18.3.1, react-dom@18.3.1, sanity@4.22.0, @sanity/vision@4.22.0, styled-components@^6.1.15 (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, axios@^1.13.6, emailjs-com@^3.2.0, @fortawesome/fontawesome-svg-core@^6.3.0, @fortawesome/free-solid-svg-icons@^6.3.0, next@16.1.6, react-photoswipe-gallery@^4.0.0, @sanity/cli@^2.21.7 (+10 more)

### Community 5 - "package.json"
Cohesion: 0.14
Nodes (14): autoprefixer@^10.4.27, @headlessui/react@^2.2.9, moment@^2.29.1, react@^19.2.0, devDependencies, cross-env@^10.0.0, react, name (+6 more)

### Community 6 - "next"
Cohesion: 0.23
Nodes (8): ArrowButton, ArrowIcon(), FavouriteProjects(), defer(), Image(), isMobileConnection(), config, next

### Community 7 - "ContainerBlock.js"
Cohesion: 0.28
Nodes (9): Footer(), socials, GithubIcon(), MoonIcon(), NAV_ITEMS, Navbar(), SunIcon(), fetcher() (+1 more)

### Community 8 - "paths"
Cohesion: 0.17
Nodes (11): compilerOptions, baseUrl, paths, @components/*, @constants/*, @data/*, @hooks/*, @layouts/* (+3 more)

### Community 9 - "_app.js"
Cohesion: 0.18
Nodes (8): next-themes@^0.4.6, photoswipe@^5.4.4, @vercel/analytics@^1.3.2, @vercel/speed-insights@^1.2.0, next-themes, photoswipe, @vercel/analytics, @vercel/speed-insights

### Community 12 - "tailwindcss"
Cohesion: 0.40
Nodes (4): tailwindcss@^2.2.7, tailwindcss, colors, olivePalette

### Community 14 - "overrides"
Cohesion: 0.50
Nodes (4): overrides, @headlessui/react, next-themes, @vercel/analytics

### Community 15 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, start

### Community 16 - "spotify.js"
Cohesion: 0.83
Nodes (3): getAccessToken(), handler(), notPlaying()

### Community 17 - "engines"
Cohesion: 0.67
Nodes (3): engines, node, npm

## Knowledge Gaps
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `ContainerBlock`, `ref_react`, `index.js`, `dependencies`, `package.json`, `ContainerBlock.js`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Should `ContainerBlock` be split into smaller, more focused modules?**
  _Cohesion score 0.09408033826638477 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `ContainerBlock`, `index.js`, `package.json`, `_app.js`, `tailwindcss`, `clsx`, `eslint-config-next@^16.0.1`, `@fortawesome/free-brands-svg-icons@^6.3.0`, `@fortawesome/free-regular-svg-icons@^6.3.0`, `@fortawesome/react-fontawesome@^0.2.0`, `postcss@^8.5.8`, `react-dom@^19.2.0`, `react-scroll@^1.8.6`, `@sanity/block-content-to-react`, `@sendgrid/mail@^8.1.6`, `@tailwindcss/aspect-ratio@^0.4.0`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13118279569892474 - nodes in this community are weakly interconnected._
- **Why does `@sanity/image-url` connect `ContainerBlock` to `index.js`, `package.json`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `cmsportfolio/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08374384236453201 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._