export default ({ body, title }) => {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="assets/stylesheet/base.css">
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
      <script src="assets/bundle.js"></script>
    </html>
  `
}