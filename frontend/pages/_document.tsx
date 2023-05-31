import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script
					src="https://api-maps.yandex.ru/2.1/?apikey=3da7a90d-09cc-45a7-b16f-0503bd60338a&lang=ru_RU"
					type="text/javascript"
				></script>
				<link rel="icon" href="/favicon_long.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
