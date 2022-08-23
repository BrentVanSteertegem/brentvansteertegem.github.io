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

  return {
    ...eleventyConfig,
    dir: {
      input: 'src',
      output: 'build'
    },
  }
}