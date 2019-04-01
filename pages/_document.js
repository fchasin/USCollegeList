import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="HandheldFriendly" content="true" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
            integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/static/nprogress.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
          />
          <style>
            {` html {
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
            font-size: 10px;
            height: 100%;
            overflow: hidden;

          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;}
            body {
              -webkit-overflow-scrolling: touch;
              padding: 0;
              margin: 0;
              font-size: 1.5rem;
              background: white;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow: scroll;
              scroll-behavior: smooth;
              font-family: 'Lato', sans-serif;            
            }
            a {
              text-decoration: none;
              font-family: 'Lato', sans-serif; 
            }`}
          </style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
