import Head from 'next/head';
import { GetStaticProps } from 'next';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps{
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
     <Head>
        <title>Home | ig.news</title>
      </Head>
      <h1>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Hey, welcome</span>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get acess to all the publications <br />
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
          </section>

          <img src="/images/avatar.svg" alt="girl coding"/>
        </main>
     </h1>
    </>
)
}
  //export const getServerSideProps: GetServerSideProps = async() => {
  
  // SSG
  export const getStaticProps: GetStaticProps = async() => {
    const price = await stripe.prices.retrieve('price_1IcSK5GcWaehsmJbVZRaJsLS', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('es-Es', {
      style: 'currency',
      currency: 'EUR',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    // Time static
    revalidate: 60 * 60 * 24, // 24 hours
  }
}