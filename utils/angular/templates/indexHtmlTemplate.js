const indexHtmlText = (projectName) => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="google" content="notranslate" />
    <title>${projectName}</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <div class="container-fluid container-body">
      <app-root></app-root>
    </div>
  </body>
</html>`;
};

module.exports = indexHtmlText;
