# RichText source code generator

A HTML source code generator for Richtext's contents as Wordpress, OCC (Oracle Commerce Cloud), ATG, or any other kind odf CMS.

## Dependencies
Must have [Nodejs](https://nodejs.org/en/) installed.
You'll need to have **Node >= 6 to Node < 11** on your machine.

Must have **Gulp CLI** installed.
```
$ npm install -g gulp-cli
```
Must have **SASS** installed. 
```
$ npm install -g sass
```
**Windows users** 
Must have [Ruby](https://rubyinstaller.org/) installed.

# Install
Clone this repository:
SSH:
```
$ git clone git@github.com:paulajbastos/richtext-source-generator.git
```
HTTPS
```
$ git clone https://github.com/paulajbastos/richtext-source-generator.git
```

Create a new branch:
```
$ git checkout -b "you-branch-name"
```

Install dependencies:
```
$ npm install
```

Run:
```
$ gulp
```
Open:
http://localhost:3000

# Main Scaffolding

```
src
    js
        main.js
        template.js
    styles
        base
        components
        generic
        helpers
        libs
        objetcs
        pages
            page.scss
            template.scss
        settings
        tools
        main.scss
    index.html
```

## How to use
### HTML
- use **index.hml** to generate your html

### CSS
The project uses the [RSCSS](http://rscss.io/css-structure.html) methodology with ITCSS architecture (folders structure)
- use **styles/pages/template.scss** file to generate the **main.css**
```js
main.css will be automaticaly outputed in you html file
<!-- inline dist/styles/main.css -->
<style rel="stylesheet" type="text/css" src="styles/main.css" inline></style>
```
### JS
- use **js/main.js** file to generate the **script.js**
```js
script.js will be automaticaly outputed in you html file
<!-- inline src/js/script.js -->
<script type="text/javascript" src="js/script.js" inline></script>
```
### HTML Structure scaffolding

```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>OCC - RichText - Code Generator</title>

    <!-- Files that is already inside OCC  -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!-- ------  -->
  </head>
  <body>
    <!-- Here is the inline CSS generated file that will be outputed on dist/yourfile.html  -->
    <!-- inline dist/styles/main.css -->
    <style rel="stylesheet" type="text/css" src="styles/main.css" inline></style>
    
    <!-- Scoped CLASS NAME -->
    <div class="your-scoped-class-name">
    
        <!-- Your contents goes here 
        bla bla bla bla bla bla bla bla bla bla bla bla
        -->
     
        <!-- Here is the inline JS generated file that will be outputed on dist/yourfile.html  -->
        <!-- inline src/js/script.js -->
        <script type="text/javascript" src="js/script.js" inline></script>
        
    </div>
  </body>
</html>

```
## What you CAN'T use
- **jquery plugins**
- var **$namevariable** - cant't use variables with **$**
- regexp including the **$**
- dont't use your own **CSS resets**, it will **conflit** with the whole site's resets
# Grab Files

Your generated files will be outputed on **/dist** folder. Just copy what is inside de <body></body> and paste it inside RichText's source option.

## Authors

| [Paula Junqueira Bastos]|
|:---------------------:|
|  [Paula Junqueira Bastos](https://bitbucket.org/paulajbastos/)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
