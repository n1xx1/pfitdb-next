function readPackage(pkg, context) {
  // Override the manifest of foo@1.x after downloading it from the registry
  if (pkg.name === "@contentlayer2/core") {
    // Replace bar@x.x.x with bar@2.0.0
    pkg.dependencies = {
      ...pkg.dependencies,
      "@mdx-js/esbuild": "^3.0.1",
    };
    context.log("@mdx-js/esbuild in dependencies of @contentlayer/core");
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
