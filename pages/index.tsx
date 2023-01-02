import Head from 'next/head';
import { Header } from '../components';


export default function Home() {
  return (
    <>
      <Head>
        <title>KDramaLike</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto'>
        <Header/>
      </main>
    </>
  );

}
