import Head from 'next/head';
import Script from 'next/script';

const CustomHead = () => (
  <>
    <Head>
      <title>Guaranteed Gambles</title>
      <meta name="description" content="The best site for finding arbitrage trades." />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TZMY2GXYE9" strategy="afterInteractive"></Script>
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-TZMY2GXYE9');
      `}
    </Script>
  </>
);

export default CustomHead;
