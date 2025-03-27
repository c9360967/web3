
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { Web3Provider } from "./@config/provider";
import { Header } from './common/header'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })   //加载google的inter字体

export const metadata = {
  title: "Web3 App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Web3Provider>
          <AntdRegistry>
            <Header />
            {children}
          </AntdRegistry>

        </Web3Provider>

      </body>
    </html>
  );
}
