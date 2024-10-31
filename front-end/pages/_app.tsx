import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css"; //This makes css easier and they used it in lab3 so I just took it in for now

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
