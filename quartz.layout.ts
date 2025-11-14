import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import type { Options } from "./quartz/components/Explorer"

// ---------- Custom Explorer Sort (self-contained; no external closures) ----------

interface MyFileNode {
  isFolder: boolean;
  children: MyFileNode[];
  data: {
    slug: string;
    title: string;
    tags: string[];
    links: string[];
    content: string;
  } | null;
  displayName: string;
  // add any other props you use
}

const customExplorerSort: Options["sortFn"] = (a, b) => {
  // define everything inside so .toString() serialization works client-side
  const preferred = ["case studies", "games", "marketing", "film & tv", "digital garden"]
  const priority = new Map(preferred.map((n, i) => [n, i]))

  // keep folders before files (docs default)
  if (a.isFolder !== b.isFolder) return b.isFolder ? -1 : 1

  // preferred order among folders
  if (a.isFolder && b.isFolder) {
    const ap = priority.get(a.displayName.toLowerCase()) ?? Infinity
    const bp = priority.get(b.displayName.toLowerCase()) ?? Infinity
    if (ap !== bp) return ap - bp
  }

  // fallback: natural alpha (also used for files)
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/inquisitivebadger/",
      "LinkedIn": "{LINKEDIN}",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "link",   // ⟵ stays on page; no redirect
      folderDefaultState: "collapsed",
      useSavedState: true,
      sortFn: customExplorerSort,
      mapFn: (node: MyFileNode) => {
 if (node.isFolder && node.displayName === "Digital Garden") {
    }
    return node;
  },
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph()
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: customExplorerSort,
    }),
  ],
  right: [],
}
