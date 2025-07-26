/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'warn',
      comment: 'This dependency is part of a circular relationship.',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      comment: "This is an orphan module - it's likely not used (anymore?).",
      severity: 'info',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$',
          '\\.d\\.ts$',
          '(^|/)tsconfig\\.json$',
          '(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$',
        ],
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      comment: 'A module depends on a node core module that has been deprecated.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['core'],
        path: [
          '^(v8\\/tools\\/codemap)$',
          '^(v8\\/tools\\/consarray)$',
          '^(v8\\/tools\\/csvparser)$',
          '^(v8\\/tools\\/logreader)$',
          '^(v8\\/tools\\/profile_view)$',
          '^(v8\\/tools\\/profile)$',
          '^(v8\\/tools\\/SourceMap)$',
          '^(v8\\/tools\\/splaytree)$',
          '^(v8\\/tools\\/tickprocessor-driver)$',
          '^(v8\\/tools\\/tickprocessor)$',
          '^(node-inspector\\/lib\\/_debugger)$',
          '^(node-inspector\\/lib\\/debugger)$',
        ],
      },
    },
    {
      name: 'not-to-deprecated',
      comment: 'This module uses a (version of an) npm module that has been deprecated.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['deprecated'],
      },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment:
        "This module depends on an npm package that isn't in the 'dependencies' section of your package.json.",
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
      },
    },
    {
      name: 'not-to-unresolvable',
      comment: 'This module depends on a module that cannot be found.',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'no-duplicate-dep-types',
      comment:
        "Likely this module depends on an external ('npm') package that occurs more than once in your package.json.",
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true,
        dependencyTypesNot: ['type-only'],
      },
    },
    {
      name: 'not-to-spec',
      comment: 'This module depends on a spec (test) file.',
      severity: 'error',
      from: {
        pathNot: '\\.spec\\.(js|mjs|cjs|ts)$',
      },
      to: {
        path: '\\.spec\\.(js|mjs|cjs|ts)$',
      },
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment:
        "This module depends on an npm package from the 'devDependencies' section of your package.json.",
      from: {
        path: '^(src)',
        pathNot: '\\.spec\\.(js|mjs|cjs|ts)$',
      },
      to: {
        dependencyTypes: ['npm-dev'],
      },
    },
    {
      name: 'optional-deps-used',
      severity: 'info',
      comment:
        "This module depends on an npm package from the 'optionalDependencies' section of your package.json.",
      from: {},
      to: {
        dependencyTypes: ['npm-optional'],
      },
    },
    {
      name: 'peer-deps-used',
      comment:
        "This module depends on an npm package from the 'peerDependencies' section of your package.json.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['npm-peer'],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro', '.d.ts'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
        theme: {
          graph: {
            splines: 'ortho',
          },
        },
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
