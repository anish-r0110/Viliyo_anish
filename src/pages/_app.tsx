import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import "normalize.css/normalize.css";
import { Layouts } from "@/layouts/Layouts";
import { AppPage, MyAppProps } from "@/layouts/types";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import Provider from "@/context";
import { Theme } from "@radix-ui/themes";
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight:[ '100', '300','400','700','900' ],
  display: 'swap',
  variable: '--font-lato',
});

function App({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: AppPage) => page);
  return (
    <Provider>
        <Theme accentColor="plum" radius="full" className={lato.variable}>
          <Layout>
            <Fragment>
              <Toaster position="top-center" />
              <Component {...pageProps} />
            </Fragment>
          </Layout>
        </Theme>
    </Provider>
  );
}

export default App;
