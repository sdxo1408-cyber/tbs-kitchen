# Graph Report - .  (2026-05-05)

## Corpus Check
- Corpus is ~1,538 words - fits in a single context window. You may not need a graph.

## Summary
- 29 nodes · 24 edges · 9 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Bootstrap & Typography|App Bootstrap & Typography]]
- [[_COMMUNITY_Signup Page|Signup Page]]
- [[_COMMUNITY_Login Page|Login Page]]
- [[_COMMUNITY_App Router & Home|App Router & Home]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_NavBar|NavBar]]
- [[_COMMUNITY_Meal Card|Meal Card]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_React Entry Point|React Entry Point]]

## God Nodes (most connected - your core abstractions)
1. `React Application` - 4 edges
2. `src/main.jsx` - 3 edges
3. `Google Fonts CDN` - 3 edges
4. `Root Mount Point` - 2 edges
5. `TBS Kitchen (Page Title)` - 2 edges
6. `Instrument Serif Font` - 2 edges
7. `DM Sans Font` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "App Bootstrap & Typography"
Cohesion: 0.39
Nodes (7): DM Sans Font, Instrument Serif Font, Google Fonts CDN, src/main.jsx, React Application, Root Mount Point, TBS Kitchen (Page Title)

### Community 1 - "Signup Page"
Cohesion: 0.5
Nodes (0): 

### Community 2 - "Login Page"
Cohesion: 0.5
Nodes (0): 

### Community 3 - "App Router & Home"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Hero Section"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "NavBar"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Meal Card"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "React Entry Point"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Meal Card`** (2 nodes): `MealCard()`, `MealCard.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Entry Point`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `React Application` (e.g. with `src/main.jsx` and `Instrument Serif Font`) actually correct?**
  _`React Application` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `src/main.jsx` (e.g. with `Root Mount Point` and `React Application`) actually correct?**
  _`src/main.jsx` has 2 INFERRED edges - model-reasoned connections that need verification._