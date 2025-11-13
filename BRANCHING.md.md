## Branching strategy

This document describes how branches are named and used in this repository. The goal is to keep history readable and make it obvious what kind of work a branch represents.

## Long-lived branches

**main:** The primary branch. Represents the current "live" version of the site. All feature and content work should eventually be merged into `main`.

**upstream/v4:** The Quartz upstream branch (remote only). Used as a source of updates from `jackyzha0/quartz`. Never push directly to `upstream`.

## Short-lived branches

Short-lived branches are created from `main` for focused pieces of work, then merged back into `main` and deleted.

Branch names follow this general pattern:

prefix/area-or-scope-what-you-did

Examples:

- content/games-index-refresh
- style/dark-theme-tweaks
- config/update-quartz-layout

## Prefixes

**content/:** Changes to site content and structure. This includes Markdown pages, copy updates, new sections, or reorganization inside `content/`.

Examples:

- content/games-index-refresh
- content/film-tv-landing-copy-pass
- content/digital-garden-nav-cleanup

**style/:** Visual and layout changes. This includes CSS/SCSS, typography, color palette adjustments, and layout tweaks.

Examples:

- style/dark-theme-tweaks
- style/nav-hover-states
- style/cards-spacing-adjustment

**config/:** Configuration and infrastructure changes. This includes Quartz configuration, layout configuration, build scripts, and deployment settings.

Examples:

- config/update-quartz-layout
- config/github-actions-setup
- config/netlify-build-tweak

Additional prefixes can be introduced if needed, but should follow the same pattern.

## Naming guidelines

**Case:** Use lowercase.

**Separators:** Use hyphens `-` between words. Do not use spaces.

**Length:** Aim for 3–6 words after the prefix. Be descriptive but not verbose.

**Pattern:** Prefer an area-verb-object style for clarity.

Examples:

- games-index-refresh
- nav-hover-improvements
- digital-garden-tag-cleanup

Combined with prefixes:

- content/games-index-refresh
- style/nav-hover-improvements
- content/digital-garden-tag-cleanup

## Standard workflow

This is the typical flow for making a change.

1. Start from main

    cd /Users/mabbs/Documents/obsidian/moesfrontmatters  
    git checkout main  
    git pull origin main  

2. Create a branch for the work

    git checkout -b content/games-index-refresh  

3. Make edits to files (for example, content/Games/index.md).

4. Stage and commit changes

    git status  
    git add .  
    git commit -m "Refresh Games index content"  

5. Push the branch

    git push -u origin content/games-index-refresh  

6. Merge into main

    Option A: open a Pull Request on GitHub from content/games-index-refresh into main, then merge.

    Option B (local merge):

        git checkout main  
        git pull origin main  
        git merge content/games-index-refresh  
        git push origin main  

7. Clean up the branch

    After merging, the branch can be deleted locally and on the remote if desired.

    git branch -d content/games-index-refresh  
    git push origin --delete content/games-index-refresh  

## Updating from Quartz upstream

To pull changes from Quartz while keeping this branching strategy:

    git checkout main  
    git fetch upstream  
    git merge upstream/v4  
    git push origin main  

Any follow-up adjustments (for example, fixing conflicts or adapting to breaking changes) should be done on a short-lived branch, using the same naming conventions, and then merged back into main.
