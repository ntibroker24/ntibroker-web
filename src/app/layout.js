import './globals.css';

export const metadata = {
  title: "NTI Broker | ที่ปรึกษาประกันภัยที่คุณวางใจได้",
  description: "ซื้อประกันออนไลน์ง่ายๆ พร้อมรับคำปรึกษาจากมืออาชีพ ครบทุกความต้องการเรื่องประกันภัย",
  
  // ส่วนบังคับให้ Facebook ดึงรูปปกไปโชว์
  openGraph: {
    title: "NTI Broker | ที่ปรึกษาประกันภัยที่คุณวางใจได้",
    description: "เช็คราคาประกันออนไลน์ และอ่านบทความดีๆ เรื่องประกันภัยได้ที่นี่",
    url: "https://ntibroker.com",
    siteName: "NTI Broker",
    images: [
      {
        url: "https://ntibroker.com/cover.png", 
        width: 1200,
        height: 630,
        alt: "NTI Broker Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}