var assign = require('object-assign');

hexo.config.instagram = assign({
    per_page: hexo.config.per_page,
}, hexo.config.instagram);

hexo.extend.generator.register('instagram', require('./lib/generator'));