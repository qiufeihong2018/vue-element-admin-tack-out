# vue-element-template

> a vue+element back-stage management template back-stage management  menagement 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## directory
```angular2
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── api
│   │   ├── login.js
│   │   └── table.js
│   ├── App.vue
│   ├── assets
│   │   └── 404_images
│   │       ├── 404_cloud.png
│   │       └── 404.png
│   ├── common
│   │   ├── fonts
│   │   │   ├── xalert-icon.eot
│   │   │   ├── xalert-icon.svg
│   │   │   ├── xalert-icon.ttf
│   │   │   └── xalert-icon.woff
│   │   ├── image
│   │   │   ├── log&brand.jpg
│   │   │   └── log.jpg
│   │   ├── js
│   │   └── stylus
│   │       ├── base.styl
│   │       ├── element-ui.styl
│   │       ├── icon.styl
│   │       ├── index.styl
│   │       ├── mixin.styl
│   │       ├── reset.styl
│   │       ├── sidebar.styl
│   │       └── variable.styl
│   ├── components
│   │   ├── breadcrumb
│   │   │   └── index.vue
│   │   ├── Breadcrumb
│   │   │   └── index.vue
│   │   ├── Hamburger
│   │   │   └── index.vue
│   │   ├── langSelect
│   │   │   └── index.vue
│   │   ├── logout
│   │   │   └── logout.vue
│   │   ├── screenfull
│   │   │   └── index.vue
│   │   └── SvgIcon
│   │       └── index.vue
│   ├── icons
│   │   ├── index.js
│   │   ├── svg
│   │   │   ├── example.svg
│   │   │   ├── eye.svg
│   │   │   ├── form.svg
│   │   │   ├── link.svg
│   │   │   ├── nested.svg
│   │   │   ├── password.svg
│   │   │   ├── table.svg
│   │   │   ├── tree.svg
│   │   │   └── user.svg
│   │   └── svgo.yml
│   ├── layouts
│   │   └── layout
│   │       ├── components
│   │       │   ├── AppMain.vue
│   │       │   ├── index.js
│   │       │   ├── Navbar.vue
│   │       │   └── Sidebar
│   │       │       ├── index.vue
│   │       │       ├── Item.vue
│   │       │       ├── Link.vue
│   │       │       └── SidebarItem.vue
│   │       ├── Layout.vue
│   │       └── mixin
│   │           └── ResizeHandler.js
│   ├── main.js
│   ├── pages
│   │   ├── checkbox
│   │   │   └── index.vue
│   │   ├── error-page
│   │   │   └── 404.vue
│   │   ├── login
│   │   │   ├── index.vue
│   │   │   └── media
│   │   │       ├── login-bg.jpg
│   │   │       └── login-logo.png
│   │   └── Management
│   │       └── hall.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       ├── app.js
│   │       └── user.js
│   └── utils
│       ├── auth.js
│       ├── index.js
│       ├── request.js
│       └── validate.js
├── static
└── test
    ├── e2e
    │   ├── custom-assertions
    │   │   └── elementCount.js
    │   ├── nightwatch.conf.js
    │   ├── runner.js
    │   └── specs
    │       └── test.js
    └── unit
        ├── jest.conf.js
        ├── setup.js
        └── specs
            └── HelloWorld.spec.js



```
