import Head from "next/head";

const PageMeta: React.FC = () => {
    return (
        <Head>
            <title>Lenderr</title>
            <meta name="description" content="The lenderr website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/Lenderr.png" />
        </Head>
    );
}

export default PageMeta;