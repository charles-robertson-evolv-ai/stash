const modifyHead = require('./source/eleventy/_11ty/transforms.js').modifyHead;
const dateToFormat = require('./source/eleventy/_11ty/filters.js').dateToFormat;

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("dateToFormat", dateToFormat);

  eleventyConfig.addTransform('modifyHead', function(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html') && outputPath !== 'serve/index.html') {
      return modifyHead(content);
    } else {
      return content;
    }
  });

  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    server: './serve'
  })

  return {
    dir: {
      input: 'source/eleventy/pages',
      includes: '../_includes',
      output: 'serve'
    }
  }
};