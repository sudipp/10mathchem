# 10mathchem

Self-learning websites for 10th-grade math and chemistry, built from class
notes and worksheets and served on the home network.

| Folder | What it is |
|--------|------------|
| [chemistry-self-learning](chemistry-self-learning/) | Chemistry site: lessons, periodic table, worksheet help (VSEPR, covalent and Type I ionic naming) |
| [math-self-learning](math-self-learning/) | Math site organized by unit (Unit 4: Polynomial Functions), lessons, narrated videos, homework help |
| [math-videos](math-videos/) | Tooling that renders the narrated lesson videos |
| [site-host](site-host/) | Node server that serves both sites on port 8080 |
| [Chemistry](Chemistry/), [math](math/) | Source class notes and worksheets (PDF) |

## Run locally

```powershell
cd chemistry-self-learning; npm install; npm run build; cd ..
cd math-self-learning; npm install; npm run build; cd ..
node site-host/server.mjs
```

Then open `http://localhost:8080/` (or `http://<computer-name>.local:8080/`
from another device on the same Wi-Fi). On Windows you can also run
`site-host/Start Self Learning Sites.bat`.
