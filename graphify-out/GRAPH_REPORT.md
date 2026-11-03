# Graph Report - developer-portfolio  (2026-11-03)

## Corpus Check
- 60 files · ~22,727 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 55 file(s) not represented in the graph (top: .css 13, .woff2 12, .woff 10)

## Summary
- 319 nodes · 660 edges · 35 communities (16 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `920ef20b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ContainerBlock
- ref_react
- Hero.js
- cmsportfolio/package.json
- dependencies
- package.json
- next
- startSwarm
- paths
- _app.js
- schema.js
- getLatestRepos.js
- tailwindcss
- clsx
- overrides
- scripts
- spotify.js
- engines
- README.md
- tsconfig.json
- autoprefixer@^10.4.27
- emailjs-com
- @fortawesome/free-regular-svg-icons@^6.3.0
- @fortawesome/react-fontawesome@^0.2.0
- @fortawesome/fontawesome-svg-core@^6.3.0
- react-dom@^19.2.0
- moment@^2.29.1
- @sanity/block-content-to-react
- @sendgrid/mail@^8.1.6
- react@^19.2.0
- @sanity/cli@^2.21.7
- sweetalert2

## God Nodes (most connected - your core abstractions)
1. `Section()` - 27 edges
2. `ContainerBlock()` - 23 edges
3. `startSwarm()` - 20 edges
4. `next` - 20 edges
5. `PageHeader()` - 17 edges
6. `buildText()` - 12 edges
7. `MediaCard()` - 12 edges
8. `userData` - 12 edges
9. `drag()` - 10 edges
10. `run()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `About()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/about.js → components/ContainerBlock.js
- `experience()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/experience.js → components/ContainerBlock.js
- `Project()` --calls--> `ContainerBlock()`  [EXTRACTED]
  pages/trips/[slug].js → components/ContainerBlock.js
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  pages/index.js → components/frontpage/Hero.js
- `About()` --calls--> `PageHeader()`  [EXTRACTED]
  pages/about.js → components/grid/PageHeader.js

## Import Cycles
- None detected.

## Communities (35 total, 19 thin omitted)

### Community 0 - "ContainerBlock"
Cohesion: 0.09
Nodes (39): Contact(), details, ContainerBlock(), ContactCta(), FavouritePosts(), builder, FavouriteTrips(), formatDate() (+31 more)

### Community 1 - "ref_react"
Cohesion: 0.10
Nodes (24): AboutEducation(), AboutExperience(), AboutWork(), Row(), AboutMeHeader(), facts, CodeStack(), groups (+16 more)

### Community 2 - "Hero.js"
Cohesion: 0.36
Nodes (7): cellStyle(), Hero(), OsloClock(), fetcher(), PlayingNow(), react-icons@^4.3.1, react-icons

### Community 3 - "cmsportfolio/package.json"
Cohesion: 0.08
Nodes (28): author, dependencies, prop-types@^15.7, react@18.3.1, react-dom@18.3.1, sanity@4.22.0, @sanity/vision@4.22.0, styled-components@^6.1.15 (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, eslint-config-next@^16.0.1, @fortawesome/free-brands-svg-icons@^6.3.0, react-photoswipe-gallery@^4.0.0, react-scroll@^1.8.6, @sanity/client@^2.21.7, @sanity/image-url@^1.0.1, swr@^2.3.6 (+8 more)

### Community 5 - "package.json"
Cohesion: 0.17
Nodes (12): @fortawesome/free-solid-svg-icons@^6.3.0, @headlessui/react@^2.2.9, postcss@^8.5.8, devDependencies, cross-env@^10.0.0, name, private, version (+4 more)

### Community 6 - "next"
Cohesion: 0.12
Nodes (14): ArrowButton, ArrowIcon(), FavouriteProjects(), Carousel(), Chevron(), pad(), defer(), Image() (+6 more)

### Community 7 - "startSwarm"
Cohesion: 0.17
Nodes (30): alpha(), clamp(), collectTasks(), CREW, easeInOut(), easeOut(), hasOwnText(), hasPaint() (+22 more)

### Community 8 - "paths"
Cohesion: 0.17
Nodes (11): compilerOptions, baseUrl, paths, @components/*, @constants/*, @data/*, @hooks/*, @layouts/* (+3 more)

### Community 9 - "_app.js"
Cohesion: 0.18
Nodes (8): next-themes@^0.4.6, photoswipe@^5.4.4, @vercel/analytics@^1.3.2, @vercel/speed-insights@^1.2.0, next-themes, photoswipe, @vercel/analytics, @vercel/speed-insights

### Community 11 - "getLatestRepos.js"
Cohesion: 0.33
Nodes (5): getLatestRepos(), axios@^1.13.6, getStaticProps(), pickRepo(), axios

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
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `ContainerBlock`, `ref_react`, `Hero.js`, `package.json`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Should `ContainerBlock` be split into smaller, more focused modules?**
  _Cohesion score 0.0912568306010929 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `Hero.js`, `package.json`, `next`, `_app.js`, `getLatestRepos.js`, `tailwindcss`, `clsx`, `autoprefixer@^10.4.27`, `emailjs-com`, `@fortawesome/free-regular-svg-icons@^6.3.0`, `@fortawesome/react-fontawesome@^0.2.0`, `@fortawesome/fontawesome-svg-core@^6.3.0`, `react-dom@^19.2.0`, `moment@^2.29.1`, `@sanity/block-content-to-react`, `@sendgrid/mail@^8.1.6`, `react@^19.2.0`, `@sanity/cli@^2.21.7`, `sweetalert2`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `ref_react` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `startSwarm()` connect `startSwarm` to `ContainerBlock`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `cmsportfolio/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08374384236453201 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._