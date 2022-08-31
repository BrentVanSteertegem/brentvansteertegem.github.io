const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets/styles': 'assets/styles'
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/scripts': 'assets/scripts'
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images': 'assets/images'
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // sort technologies on order
  eleventyConfig.addCollection("technologies", (collectionApi) => {
    return collectionApi.getFilteredByTag("technologies").sort((a, b) => a.data.order - b.data.order);
  });

  return {
    ...eleventyConfig,
    dir: {
      input: 'src',
      output: 'build'
    }
  }
}