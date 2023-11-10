import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
		<Html lang="en" className="h-full dark">
			<Head>
				<meta
					name="keywords"
					content="React Nextjs, React Developer, Vercel"
				/>
				<meta name="author" content="Mónica P. Arroyo" />
				<meta
					name="description"
					content="A simple contact list app built with Next.js"
				/>
				<meta name="theme-color" content="#006FEE" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="ContactApp - A simple contact list app built with Next.js"
				/>
				<meta
					property="og:description"
					content="A simple contact list app built with Next.js"
				/>
				<meta property="og:site_name" content="ContactApp" />
				<meta
					property="og:url"
					content="https://mpa-contactapp.vercel.app/"
				/>
				<meta
					property="og:image"
					content="https://mpa-contactapp.vercel.app/logo.png"
				/>

				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
  );
}
