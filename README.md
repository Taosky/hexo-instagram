# hexo-instagram

Generate an instagram photo page in Hexo.

(API limit 20 photos.)


[Demo](https://mou.science/instagram/)


## Install

````bash
$ npm install hexo-instagram --save
````

## Config

To get your user id and access token, see [this](https://elfsight.com/blog/2016/05/how-to-get-instagram-access-token/).

```` yaml
instagram:
  user_name: Taoskycn
  user_id: 2403711***
  token: 2403711***.adda5d5.d9b5cd383b4****************d72a0
  title: Photos
  quote: 'From<a href="https://www.instagram.com/taoskycn/" target="_blank">Instagram</a>'
  proxy: false
  fancybox: true
````
- **user_name**: Instagram username like `taoskycn` in `www.instagram.com/taoskycn/`.
- **title**: Page title.
- **quote**: At the beginning of the page (support html syntax).
- **proxy**: Enable it if you can not access `api.instagram.com`.
- **fancybox**: Load fancybox to view photos. If conflicts with your hexo theme, just disable it.


## Use

Instagram page will be generated when `hexo g` and `hexo s`.

You may need to add the link `http://yourblog.com/instagram/` to the theme menu. 

## 中国用户

设置`proxy`为`true`，或是想办法让node番茄。