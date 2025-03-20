import './globals.css';
import AntdProvider from './components/AntdProvider';

export const metadata = {
  title: 'ระบบสุ่มการ์ดเกม',
  description: 'ระบบสุ่มการ์ดสำหรับเล่นเกมพร้อมอนิเมชั่น',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}