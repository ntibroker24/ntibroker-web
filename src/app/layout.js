import './globals.css'

export const metadata = {
  title: 'NTI Broker | ที่ปรึกษาประกันภัย',
  description: 'โบรกเกอร์ที่ปรึกษาประกันภัยที่คุณวางใจได้ ซื้อประกันออนไลน์ด้วยตนเองจากบริษัทชั้นนำ',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
