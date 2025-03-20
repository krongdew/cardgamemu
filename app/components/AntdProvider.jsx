'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import th_TH from 'antd/lib/locale/th_TH';

// ปิดการแจ้งเตือน
ConfigProvider.config({
  warning: false,
});

// กำหนดธีมสีแนว My Little Pony (โทนสีพาสเทลชมพู)
const theme = {
  token: {
    colorPrimary: '#EE8CCA', // ชมพูเข้ม (สีหลัก)
    colorSuccess: '#85D9AF', // เขียวพาสเทล
    colorWarning: '#F9C54C', // เหลืองพาสเทล
    colorError: '#FF6B8B', // แดงอมชมพู
    colorInfo: '#A388EE', // ม่วงพาสเทล
    
    // ปรับแต่งองค์ประกอบทั่วไป
    colorTextBase: '#7E5886', // สีข้อความทั่วไป (ม่วงเข้ม)
    colorBgBase: '#FFF9FC', // สีพื้นหลังอ่อนๆ
    colorBorder: '#F6C9E7', // สีขอบ
    colorLink: '#AB68CA', // สีลิงก์

    // ปรับแต่งรัศมีขอบและความละเอียด
    borderRadius: 12, // โค้งมากขึ้น
    wireframe: false,
  },
  components: {
    Card: {
      colorBgContainer: '#FFF5FB', // พื้นหลังการ์ดสีชมพูอ่อนมาก
      colorBorderSecondary: '#F9D2EC', // ขอบการ์ดสีชมพูอ่อน
      borderRadiusLG: 16, // การ์ดโค้งมากขึ้น
      boxShadowTertiary: '0 4px 12px rgba(238, 140, 202, 0.15)', // เงาสีชมพู
    },
    Button: {
      colorPrimary: '#EE8CCA', // ปุ่มหลักสีชมพู
      colorPrimaryHover: '#F9A8DC', // สีปุ่มหลักเมื่อ hover
      borderRadius: 20, // ปุ่มมนมากขึ้น
      controlHeightLG: 45, // ปุ่มขนาดใหญ่สูงมากขึ้น
    },
    Divider: {
      colorSplit: '#F9D2EC', // เส้นแบ่งสีชมพูอ่อน
    },
    Typography: {
      colorTextHeading: '#C15CAA', // สีของหัวข้อเป็นชมพูเข้ม
    },
    Statistic: {
      colorTextDescription: '#C15CAA', // สีคำอธิบายใน Statistic
      colorText: '#EE8CCA', // สีตัวเลขใน Statistic
    },
    Alert: {
      colorWarning: '#FBDAA0', // พื้นหลัง Alert แบบเตือนเป็นสีส้มพาสเทล
      colorWarningBorder: '#F9C54C', // ขอบ Alert แบบเตือน
      colorWarningText: '#946400', // ข้อความใน Alert แบบเตือน
    },
    Input: {
      colorBgContainer: '#FFF9FC', // พื้นหลัง input
      colorBorder: '#F9D2EC', // ขอบของ input
      activeBorderColor: '#EE8CCA', // สีขอบเมื่อ focus
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