import Head from "next/head";
import HomeContents from "./pageContents";

export default function Home() {
  return (
    <>      
      <Head>
        <title>Filippo&apos;s Portfolio</title>
        <meta property="og:title" content="Filippo&apos;s Portfolio" />
        <meta property="og:description" content="A website containing most of the info about me!" />
        <meta property="og:image" content="https://filippodude.cc/logo.jpg" />
        <meta property="og:url" content="https://filippodude.cc/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Filippo&apos;s Portfolio" />
      </Head>
      <HomeContents></HomeContents>
    </>
  );
}
