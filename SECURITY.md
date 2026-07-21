# Security Policy

## Scope

This repository (`akash-cloudtech/k8s-rizz`) is the public showcase/marketing
website for **K8s Rizz Check** — a static site with no backend, no build
step, and no user data collection. It also mirrors release binaries for the
K8s Rizz Check CLI as public GitHub Releases assets.

This policy covers both:
- The website itself (this repo's HTML/CSS/JS and GitHub Pages/Actions config).
- The K8s Rizz Check binaries distributed from this repo's [Releases](../../releases),
  even though the application's source lives in a separate private repository.

## Supported Versions

The website has no versioned releases of its own — `main` is continuously
deployed and always represents the current live site, so there is nothing to
select a "supported version" from. For the K8s Rizz Check CLI, only the
[latest release](../../releases/latest) is supported.

## Reporting a Vulnerability

Please report security issues privately using
[GitHub Security Advisories](../../security/advisories/new) on this repo
(Security tab → "Report a vulnerability") rather than opening a public issue.
This applies whether the issue is in the website or in a K8s Rizz Check
binary distributed from here.

We'll acknowledge new reports as soon as we can and follow up with next steps
once the issue has been triaged.
