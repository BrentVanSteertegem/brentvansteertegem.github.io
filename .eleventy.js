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

  return {
    ...eleventyConfig,
    dir: {
      input: 'src',
      output: 'build'
    },
   pathPrefix: 'Portfolio-Website'
  }
}