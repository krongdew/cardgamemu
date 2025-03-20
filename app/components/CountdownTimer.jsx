'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, InputNumber, Row, Col, Typography, Space, Divider, Statistic, Alert } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './CountdownTimer.module.css';

const { Title, Text } = Typography;
const { Countdown } = Statistic;

const CountdownTimer = () => {
  // สถานะสำหรับการตั้งค่า
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  
  // สถานะสำหรับการทำงาน
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [deadline, setDeadline] = useState(null);
  
  // สถานะสำหรับการแจ้งเตือน
  const [timeIsUp, setTimeIsUp] = useState(false);
  
  // ใช้ ref เพื่อเก็บค่าเวลาที่เหลือเมื่อกดหยุดชั่วคราว
  const remainingTimeRef = useRef(0);
  
  // คำนวณเวลาทั้งหมดเป็นมิลลิวินาที
  const calculateTotalTime = () => {
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  };

  // เริ่มนับเวลา
  const startTimer = () => {
    const totalTime = calculateTotalTime();
    if (totalTime <= 0) {
      return;
    }
    
    const now = Date.now();
    setDeadline(now + totalTime);
    setIsRunning(true);
    setIsPaused(false);
    setShowSettings(false);
    setTimeIsUp(false);
  };

  // หยุดนับเวลาชั่วคราว
  const pauseTimer = () => {
    setIsPaused(true);
    remainingTimeRef.current = deadline - Date.now();
  };

  // เริ่มนับเวลาต่อ
  const resumeTimer = () => {
    setDeadline(Date.now() + remainingTimeRef.current);
    setIsPaused(false);
  };

  // รีเซ็ตนาฬิกา
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setShowSettings(true);
    setTimeIsUp(false);
  };

  // แสดงการตั้งค่า
  const showSettingsPanel = () => {
    resetTimer();
  };

  // เมื่อนับเวลาเสร็จสิ้น
  const onFinish = () => {
    setTimeIsUp(true);
    setIsRunning(false);
  };

  return (
    <Card className={styles.timerCard}>
      <Title level={3} className={styles.timerTitle}>นาฬิกาจับเวลา</Title>
      <Divider />

      {timeIsUp && (
        <Alert
          message="หมดเวลา!"
          description="เวลาที่คุณตั้งได้หมดลงแล้ว"
          type="warning"
          showIcon
          closable
          className={styles.alertTimeUp}
        />
      )}

      {showSettings ? (
        <div className={styles.settingsContainer}>
          <Title level={4}>ตั้งค่าเวลา</Title>
          <Row gutter={[16, 16]} className={styles.inputRow}>
            <Col span={8}>
              <Text strong>ชั่วโมง</Text>
              <InputNumber
                min={0}
                max={23}
                value={hours}
                onChange={value => setHours(value || 0)}
                className={styles.timeInput}
              />
            </Col>
            <Col span={8}>
              <Text strong>นาที</Text>
              <InputNumber
                min={0}
                max={59}
                value={minutes}
                onChange={value => setMinutes(value || 0)}
                className={styles.timeInput}
              />
            </Col>
            <Col span={8}>
              <Text strong>วินาที</Text>
              <InputNumber
                min={0}
                max={59}
                value={seconds}
                onChange={value => setSeconds(value || 0)}
                className={styles.timeInput}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="large"
            onClick={startTimer}
            className={styles.startButton}
            disabled={calculateTotalTime() <= 0}
          >
            เริ่มนับเวลา
          </Button>
        </div>
      ) : (
        <div className={styles.countdownContainer}>
          {isPaused ? (
            <Title className={styles.pausedTime}>
              {Math.floor(remainingTimeRef.current / 3600000).toString().padStart(2, '0')}:
              {Math.floor((remainingTimeRef.current % 3600000) / 60000).toString().padStart(2, '0')}:
              {Math.floor((remainingTimeRef.current % 60000) / 1000).toString().padStart(2, '0')}
            </Title>
          ) : (
            <Countdown
              value={deadline}
              format="HH:mm:ss"
              onFinish={onFinish}
              className={styles.countdown}
            />
          )}
          <Space size="large" className={styles.controlButtons}>
            {isPaused ? (
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                size="large"
                onClick={resumeTimer}
              >
                ดำเนินการต่อ
              </Button>
            ) : (
              <Button
                type="default"
                icon={<PauseCircleOutlined />}
                size="large"
                onClick={pauseTimer}
              >
                หยุดชั่วคราว
              </Button>
            )}
            <Button
              type="default"
              icon={<ReloadOutlined />}
              size="large"
              onClick={resetTimer}
            >
              รีเซ็ต
            </Button>
            <Button
              type="dashed"
              icon={<SettingOutlined />}
              size="large"
              onClick={showSettingsPanel}
            >
              ตั้งค่า
            </Button>
          </Space>
        </div>
      )}
    </Card>
  );
};

export default CountdownTimer;