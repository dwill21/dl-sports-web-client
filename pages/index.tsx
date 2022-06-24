import Head from 'next/head'
import ArticleCard from 'components/article-card';

export default function Home() {
  return (
    <>
      <Head>
        <title>DL Sports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-full py-16 md:pt-28 md:px-10 flex flex-col md:flex-row gap-16 justify-center items-center">
        <ArticleCard className="w-screen md:w-[490px] h-[490px]" title="Lorem ipsum" size="lg"/>
        <div className="flex flex-col items-center">
          <h2 className="pb-6 text-3xl">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <ArticleCard key={i} className="w-48 h-48" title="Lorem ipsum" size="sm"/>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen h-[50px] mb-10 bg-grey-200 flex flow-row gap-10 justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-6 h-6 my-auto bg-grey-500"></div>
        ))}
      </div>
    </>
  )
}
