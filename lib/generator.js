var request = require('urllib-sync').request;
var ejs = require('ejs');
var path = require('path');


var log = require('hexo-log')({
    debug: false,
    silent: false
});

module.exports = function (locals) {
    var config = this.config;
    var site = ''
    if (config.instagram.proxy) {
        site = 'ins.zxc.science'
    } else {
        site = 'api.instagram.com'
    }
    var url = `https://${site}/v1/users/${config.instagram.user_id}/media/recent/?access_token=${config.instagram.token}`;
    var res = request(url, {
        dataType: 'json',
        timeout: 20000
    });
    var data = res.data.data;
    var tmp = {};
    data.forEach(function (post) {
        let timestamp = Number(post.created_time);
        let date = new Date(timestamp * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let time = year * 100 + month;
        let photo = `https://images.weserv.nl/?url=${post.images.low_resolution.url}`;
        let caption = post.caption;
        let link = `https://images.weserv.nl/?url=${post.images.standard_resolution.url}`;

        let one = {};
        one.photo = photo;
        one.caption = caption;
        one.link = link;
        one.time = timestamp;

        if (!tmp[time]) {
            tmp[time] = [];
        }
        tmp[time].push(one);
    })

    let ins = [];
    // sort by month and datetime
    for (let time in tmp) {
        let photos = tmp[time];
        photos.sort(function (a, b) {
            return b.time - a.time;
        });
        ins.push({
            time: time, photos: photos
        });
    }

    ins.sort(function (a, b) {
        return Number(b.time) - Number(a.time);
    });

    var content = ejs.renderFile(path.join(__dirname, '/templates/instagram.ejs'), {
            'quote': config.instagram.quote,
            'fancybox': config.instagram.fancybox,
            'ins_data': ins,
            'user_name': config.instagram.user_name,
        },
        function (err, result) {
            if (err) console.log(err);
            return result;
        });

    return {
        path: 'instagram/index.html',
        data: {title: config.instagram.title, content: content, comments: false, slug: 'instagram'},
        layout: ['page', 'post']
    };
};