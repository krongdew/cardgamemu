//my-card-game\app\components\AntdProvider.jsx
'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import th_TH from 'antd/lib/locale/th_TH';

// ปิดการแจ้งเตือน
ConfigProvider.config({
  warning: false,
});

// กำหนดธีมสีแนวแฮรี่พอตเตอร์แบบเข้ม
const theme = {
  token: {
    colorPrimary: '#8E0E00', // แดงกริฟฟินดอร์เข้ม (สีหลัก)
    colorSuccess: '#0D5C3A', // เขียวสลิธีริน เข้มขึ้น
    colorWarning: '#FFD700', // ทองกริฟฟินดอร์ 
    colorError: '#B30000', // แดงเลือด เข้มขึ้น
    colorInfo: '#183A7A', // น้ำเงินเรเวนคลอ เข้มขึ้น
    
    // ปรับแต่งองค์ประกอบทั่วไป
    colorTextBase: '#E0DBCF', // สีข้อความทั่วไป - สว่าง
    colorBgBase: '#1A1E26', // สีพื้นหลังเข้ม 
    colorBorder: '#704214', // สีขอบไม้เข้ม
    colorLink: '#FFD700', // สีลิงก์ - ทอง
    
    // ปรับแต่งรัศมีขอบและความละเอียด
    borderRadius: 8, // ลดความโค้งให้คลาสสิกมากขึ้น
    wireframe: false,
  },
  components: {
    Card: {
      colorBgContainer: '#1A1E26', // พื้นหลังการ์ดสีเข้ม
      colorBorderSecondary: '#704214', // ขอบการ์ดสีน้ำตาลไม้
      borderRadiusLG: 8, // การ์ดโค้งน้อยลงให้ดูคลาสสิก
      boxShadowTertiary: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 10px rgba(211, 166, 37, 0.1)', // เงาสีทองและดำ
    },
    Button: {
      colorPrimary: '#8E0E00', // ปุ่มหลักสีแดงกริฟฟินดอร์เข้ม
      colorPrimaryHover: '#B30000', // สีปุ่มหลักเมื่อ hover
      borderRadius: 6, // ปุ่มโค้งน้อยลง
      controlHeightLG: 42, // ปุ่มขนาดเหมาะสม
    },
    Divider: {
      colorSplit: '#704214', // เส้นแบ่งสีน้ำตาลไม้
    },
    Typography: {
      colorTextHeading: '#D3A625', // สีของหัวข้อเป็นทอง
    },
    Statistic: {
      colorTextDescription: '#E0DBCF', // สีคำอธิบายใน Statistic
      colorText: '#D3A625', // สีตัวเลขใน Statistic เป็นทอง
    },
    Alert: {
      colorWarning: '#3C2A14', // พื้นหลัง Alert แบบเตือนเป็นสีน้ำตาลเข้ม
      colorWarningBorder: '#D3A625', // ขอบ Alert แบบเตือน
      colorWarningText: '#FFD700', // ข้อความใน Alert แบบเตือน เป็นทอง
    },
    Input: {
      colorBgContainer: '#232830', // พื้นหลัง input เข้ม
      colorBorder: '#704214', // ขอบของ input
      activeBorderColor: '#D3A625', // สีขอบเมื่อ focus
    },
    Select: {
      colorBgContainer: '#232830', // พื้นหลัง select เข้ม
      colorBorder: '#704214', // ขอบของ select
      colorPrimaryActive: '#D3A625', // สี active
    },
    Tooltip: {
      colorBgDefault: '#0F1419', // พื้นหลัง tooltip เข้มมาก
      colorTextLightSolid: '#E0DBCF', // ข้อความใน tooltip
    },
    Modal: {
      colorBgElevated: '#1A1E26', // พื้นหลัง modal เข้ม
    },
    Dropdown: {
      colorBgElevated: '#1A1E26', // พื้นหลัง dropdown เข้ม
    },
  },
};

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider 
      theme={theme}
      locale={th_TH}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}