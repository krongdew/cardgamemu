'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Row, Col, Typography, Space, Spin, Tag, Divider } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import styles from './CardRandomizer.module.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { Meta } = Card;

const CardRandomizer = () => {
  // สร้างชุดการ์ดตัวอย่างตามที่กำหนด
  const cardDeck = [
    { id: 1, name: 'บล็อคเครื่องมือ', type: 'แดง', effect: 'บล็อคเครื่องมือ', image: '/Images/blockequip.jpg' },
    { id: 2, name: 'ขโมยไอเดีย', type: 'แดง', effect: 'ขโมยไอเดีย 30 วิ', image: '/Images/stealidea.jpg' },
    { id: 3, name: 'เพิ่มเงื่อนไขพิเศษ', type: 'น้ำเงิน', effect: 'เพิ่มเงื่อนไขพิเศษ', image: '/Images/special.jpg' },
    { id: 4, name: 'สปีดบูท', type: 'เขียว', effect: 'สปีดบูททำงานไม่ถูกรบกวน 3 นาที', image: '/Images/speedboot.jpg' },
    { id: 5, name: 'หยุดทำงาน', type: 'แดง', effect: 'หยุดทำงาน 1 คน (10 วินาที)', image: '/Images/stopone.jpg' },
    { id: 6, name: 'อีกฝั่งหยุดทำงาน', type: 'เขียว', effect: 'ฝั่งตรงข้ามหยุดทำงาน 1 คน (10 วิ)', image: '/Images/enemystop.jpg' },
    { id: 7, name: 'หยุดทำงานทั้งคู่', type: 'แดง', effect: 'หยุดทำงานทั้งคู่ 10 วิ', image: '/Images/stopboth.jpg' },
    { id: 8, name: 'อีกฝั่งหยุดทำงานทั้งคู่', type: 'เขียว', effect: 'ฝั่งตรงข้ามหยุดทำงานทั้งคู่ 10 วิ', image: '/Images/enemystopboth.jpg' },
  ];

  const [selectedCards, setSelectedCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [numCards, setNumCards] = useState(3);
  
  // สถานะใหม่สำหรับการ์ดที่กำลังสับ
  const [shufflingCards, setShufflingCards] = useState([]);
  const [shuffleStep, setShuffleStep] = useState(0);

  // สุ่มการ์ดจากชุดการ์ด
  const shuffleCards = () => {
    setIsShuffling(true);
    setShowResult(false);
    
    // เริ่มอนิเมชั่นการสับไพ่
    startShufflingAnimation();
    
    // จำลองการสับไพ่ด้วยอนิเมชั่น
    setTimeout(() => {
      const shuffledDeck = [...cardDeck].sort(() => Math.random() - 0.5);
      const selected = shuffledDeck.slice(0, numCards);
      setSelectedCards(selected);
      setIsShuffling(false);
      setShowResult(true);
      setShufflingCards([]); // ล้างการ์ดที่กำลังสับเมื่อเสร็จสิ้น
    }, 3000); // เพิ่มเวลาเป็น 3 วินาทีเพื่อให้เห็นอนิเมชั่นชัดเจน
  };

  // ฟังก์ชั่นใหม่สำหรับอนิเมชั่นการสับไพ่
  const startShufflingAnimation = () => {
    // สร้างการ์ด 6 ใบสำหรับใช้ในอนิเมชั่น
    const tempCards = [...cardDeck]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .map(card => ({ ...card, key: Math.random() }));
    
    setShufflingCards(tempCards);
    
    // สร้างอนิเมชั่นการสับไพ่โดยสุ่มตำแหน่งการ์ดทุกๆ 300ms
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setShuffleStep(step);
      
      // สลับการ์ดสองใบแบบสุ่ม
      setShufflingCards(prev => {
        const newCards = [...prev];
        const idx1 = Math.floor(Math.random() * newCards.length);
        let idx2 = Math.floor(Math.random() * newCards.length);
        
        // ป้องกันการสลับกับตัวเอง
        while (idx2 === idx1) {
          idx2 = Math.floor(Math.random() * newCards.length);
        }
        
        // สลับการ์ด
        [newCards[idx1], newCards[idx2]] = [newCards[idx2], newCards[idx1]];
        
        return newCards.map(card => ({
          ...card,
          key: Math.random() // ทำให้ React รีเรนเดอร์การ์ดใหม่ทุกครั้ง
        }));
      });
      
      // หยุดอนิเมชั่นเมื่อถึงเวลาที่กำหนด
      if (step >= 8) {
        clearInterval(interval);
      }
    }, 300);
  };

  // สีแท็กตามประเภทการ์ด
  const getTagColor = (type) => {
    const colorMap = {
      'แดง': 'red',
      'เขียว': 'green',
      'น้ำเงิน': 'blue'
    };
    return colorMap[type] || 'default';
  };

  // สีพื้นหลังของการ์ดตามประเภท
  const getCardBackground = (type) => {
    const colorMap = {
      'แดง': '#ffebee', // พื้นหลังสีแดงอ่อน
      'เขียว': '#e8f5e9', // พื้นหลังสีเขียวอ่อน
      'น้ำเงิน': '#e3f2fd', // พื้นหลังสีน้ำเงินอ่อน
    };
    return colorMap[type] || 'white';
  };

  // สีข้อความตามประเภทการ์ด
  const getTextColor = (type) => {
    const colorMap = {
      'แดง': '#c62828', // ข้อความสีแดงเข้ม
      'เขียว': '#2e7d32', // ข้อความสีเขียวเข้ม
      'น้ำเงิน': '#1565c0', // ข้อความสีน้ำเงินเข้ม
    };
    return colorMap[type] || 'black';
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>ระบบสุ่มการ์ดเกม</Title>
      <Divider />
      
      <Space className={styles.controls}>
        <Text strong>จำนวนการ์ด:</Text>
        <Select 
          value={numCards}
          onChange={setNumCards}
          style={{ width: 120 }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Option key={num} value={num}>{num} ใบ</Option>
          ))}
        </Select>
        
        <Button
          type="primary"
          icon={<SwapOutlined />}
          onClick={shuffleCards}
          loading={isShuffling}
          size="large"
        >
          {isShuffling ? 'กำลังสุ่ม...' : 'สุ่มการ์ด'}
        </Button>
      </Space>

      <Divider />

      {/* แสดงอนิเมชั่นการสับไพ่ */}
      {isShuffling && (
        <div className={styles.shufflingContainer}>
          {shufflingCards.map((card, index) => (
            <div 
              key={card.key} 
              className={styles.shufflingCard}
              style={{
                zIndex: 10 - index,
                animationDelay: `${index * 0.1}s`,
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (5 + index * 2)}deg) 
                            translateX(${(index % 3 - 1) * 30}px)`
              }}
            >
              <Card
                hoverable
                cover={
                  <div style={{ 
                    height: '180px', 
                    position: 'relative',
                    backgroundColor: getCardBackground(card.type),
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      alt={card.name}
                      src={card.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/180/240';
                      }}
                    />
                  </div>
                }
                className={styles.gameCard}
                style={{ borderColor: getTagColor(card.type) }}
              >
                <Meta
                  title={<span style={{ color: getTextColor(card.type) }}>{card.name}</span>}
                  description={
                    <div>
                      <Tag color={getTagColor(card.type)} style={{ marginRight: 0, marginBottom: 4, fontWeight: 500 }}>
                        {card.type}
                      </Tag>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      )}

      <Row gutter={[16, 16]} className={styles.cardRow}>
        {showResult && !isShuffling && selectedCards.map((card, index) => (
          <Col key={card.id} xs={24} sm={12} md={8} lg={8} xl={6}>
            <div className={styles.cardWrapper} style={{ animationDelay: `${index * 0.2}s` }}>
              <Card
                hoverable
                cover={
                  <div style={{ 
                    height: '220px', 
                    position: 'relative',
                    backgroundColor: getCardBackground(card.type),
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      alt={card.name}
                      src={card.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/200/280';
                      }}
                    />
                  </div>
                }
                className={styles.gameCard}
                style={{ borderColor: getTagColor(card.type) }}
              >
                <Meta
                  title={<span style={{ color: getTextColor(card.type) }}>{card.name}</span>}
                  description={
                    <div>
                      <Tag color={getTagColor(card.type)} style={{ marginRight: 0, marginBottom: 4, fontWeight: 500 }}>
                        {card.type}
                      </Tag>
                      <div className={styles.effectText}>{card.effect}</div>
                    </div>
                  }
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardRandomizer;