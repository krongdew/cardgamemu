'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Typography, Space, Divider, message } from 'antd';
import { RollbackOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './MissionRandomizer.module.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const MissionRandomizer = () => {
  // State สำหรับเก็บข้อความ
  const [missions, setMissions] = useState([]);
  const [currentMission, setCurrentMission] = useState('');
  const [randomizedMission, setRandomizedMission] = useState('');
  const [isRandomizing, setIsRandomizing] = useState(false);
  
  // Ref สำหรับเสียง
  const spinSoundRef = useRef(null);
  const finishSoundRef = useRef(null);

  // โหลดเสียง
  useEffect(() => {
    // โหลดเสียงการหมุน
    spinSoundRef.current = new Audio('/sounds/spin21.mp3');
    spinSoundRef.current.volume = 0.5;

    // โหลดเสียงเมื่อสุ่มเสร็จ
    finishSoundRef.current = new Audio('/sounds/finish.mp3');
    finishSoundRef.current.volume = 0.5;

    // ทำความสะอาด
    return () => {
      if (spinSoundRef.current) spinSoundRef.current.pause();
      if (finishSoundRef.current) finishSoundRef.current.pause();
    };
  }, []);

  // เล่นเสียง
  const playSpin = () => {
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play();
    }
  };

  const playFinish = () => {
    setTimeout(() => {
    if (finishSoundRef.current) {
      finishSoundRef.current.currentTime = 0;
      finishSoundRef.current.play();
    }
}, 500); // delay เล็กน้อยให้ UI อัพเดทก่อนเล่นเสียง
  };

  // เพิ่มภารกิจ
  const addMission = () => {
    if (currentMission.trim() !== '') {
      // ตรวจสอบความยาวก่อนเพิ่ม
      if (currentMission.trim().length > 200) {
        message.error('ภารกิจต้องมีความยาวไม่เกิน 200 ตัวอักษร');
        return;
      }
      
      // ตรวจสอบว่ามีภารกิจซ้ำหรือไม่
      if (missions.includes(currentMission.trim())) {
        message.warning('มีภารกิจนี้อยู่แล้ว');
        return;
      }

      setMissions([...missions, currentMission.trim()]);
      setCurrentMission('');
    }
  };

  // สุ่มภารกิจ
  const randomizeMission = () => {
    if (missions.length === 0) {
      message.warning('กรุณาเพิ่มภารกิจก่อน');
      return;
    }

    // เริ่มอนิเมชั่นสุ่ม
    setIsRandomizing(true);

    // เล่นเสียงสปิน
    playSpin();

    // สุ่มภารกิจหลังจาก delay เล็กน้อย
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * missions.length);
      setRandomizedMission(missions[randomIndex]);
      
      // เล่นเสียงเมื่อสุ่มเสร็จ
      playFinish();

      // หยุดอนิเมชั่น
      setTimeout(() => {
        setIsRandomizing(false);
      }, 1000);
    }, 1000);
  };

  // รีเซ็ตทั้งหมด
  const resetMissions = () => {
    setMissions([]);
    setRandomizedMission('');
    setCurrentMission('');
    setIsRandomizing(false);
  };

  // ลบภารกิจออก
  const removeMission = (index) => {
    const newMissions = missions.filter((_, i) => i !== index);
    setMissions(newMissions);
  };

  // จัดการ Enter ใน TextArea
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addMission();
    }
  };

  return (
    <Card className={styles.missionCard}>
      <Title level={3} className={styles.missionTitle}>สุ่มภารกิจ</Title>
      <Divider />

      {/* ซ่อนส่วนป้อนข้อความเมื่อกำลังสุ่มหรือมีภารกิจที่สุ่มแล้ว */}
      {!(isRandomizing || randomizedMission) && (
        <div className={styles.inputContainer}>
          <TextArea
            value={currentMission}
            onChange={(e) => {
              // จำกัดความยาวสูงสุด 200 ตัวอักษร
              if (e.target.value.length <= 200) {
                setCurrentMission(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="พิมพ์ภารกิจที่นี่... (สูงสุด 200 ตัวอักษร)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            className={styles.missionInput}
          />
          <div className={styles.missionCounter}>
            {currentMission.length}/200
          </div>
          <Space className={styles.inputControls}>
            <Button 
              type="primary" 
              icon={<SendOutlined />}
              onClick={addMission}
              disabled={currentMission.trim() === ''}
            >
              เพิ่มภารกิจ
            </Button>
            {missions.length > 0 && (
              <Button 
                type="primary" 
                icon={<RollbackOutlined />}
                onClick={randomizeMission}
                className={styles.randomizeButton}
              >
                สุ่มภารกิจ
              </Button>
            )}
          </Space>

          {missions.length > 0 && (
            <div className={styles.missionList}>
              <Title level={4}>ภารกิจทั้งหมด</Title>
              {missions.map((mission, index) => (
                <div key={index} className={styles.missionItem}>
                  <Text ellipsis>{mission}</Text>
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />}
                    onClick={() => removeMission(index)}
                    size="small"
                    className={styles.deleteButton}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ส่วนแสดงภารกิจที่สุ่มได้ */}
      {(isRandomizing || randomizedMission) && (
        <div className={`${styles.randomizedContainer} ${isRandomizing ? styles.spinning : ''}`}>
          <div className={styles.randomMissionDisplay}>
            {isRandomizing ? (
              <Title level={2} className={styles.randomMissionText}>
                กำลังสุ่ม...
              </Title>
            ) : (
              <Title level={2} className={styles.randomMissionText}>
                {randomizedMission}
              </Title>
            )}
          </div>
          {!isRandomizing && (
            <Button 
              type="primary" 
              onClick={() => {
                setRandomizedMission('');
              }}
              className={styles.backButton}
            >
              ล้างภารกิจ
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default MissionRandomizer;