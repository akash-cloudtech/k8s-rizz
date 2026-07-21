# k8s-rizz

This repo is the public showcase/marketing website for **K8s Rizz Check** — a
local Kubernetes cluster observability dashboard. It's a static site only:
no backend, no build step, no framework.

The application's source code lives in a separate, private repository. This
repo exists solely to host [k8srizz.com](https://k8srizz.com) and to mirror
released binaries as public [GitHub Releases](../../releases) assets so the
download buttons on the site have something stable to point at.

## Structure

```
index.html                                             page markup
assets/css/style.css                                   styles (dark/light theme via CSS custom properties)
assets/js/main.js                                       theme toggle, hero typing animation, demo video setup, FAQ accordion, OS-aware download highlighting
assets/screenshots/k8s-rizz-check-demo-noaudio.mp4      looping demo video for the "see it in action" section
assets/screenshots/demo-namespaces.png, demo-tree.png   unused leftovers from an earlier screenshot-carousel version of the demo section
install.sh                                              OS/arch-detecting installer, served at k8srizz.com/install.sh for the curl one-liner on the site
favicon.png                                             site favicon
CNAME                                                   custom domain for GitHub Pages (k8srizz.com)
```

## Running locally

No build step — just serve the directory root and open it:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Pages are published automatically by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`, using GitHub's native Pages deployment (Actions ->
`actions/deploy-pages`), not the legacy branch-based Pages source.

The custom domain is configured via the `CNAME` file at the repo root, which
GitHub Pages picks up automatically on deploy.
