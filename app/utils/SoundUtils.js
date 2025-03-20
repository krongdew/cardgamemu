// my-card-game\app\utils\SoundUtils.js
'use client';

/**
 * ยูทิลิตี้สำหรับจัดการเสียงในแอปพลิเคชัน
 * สามารถโหลดและเล่นเสียงต่างๆ ได้แบบมีการจัดการแคช
 */

// แคชสำหรับเก็บเสียงที่โหลดแล้ว
const soundCache = {};

/**
 * โหลดและเล่นเสียง โดยจะใช้เสียงจากแคชถ้ามีอยู่แล้ว
 * @param {string} url - URL ของไฟล์เสียง
 * @param {number} volume - ระดับความดัง (0.0 ถึง 1.0)
 * @param {boolean} loop - เล่นซ้ำหรือไม่
 * @returns {Promise<HTMLAudioElement>} - Promise ที่ resolve เมื่อเสียงเริ่มเล่น
 */
export const playSound = (url, volume = 0.5, loop = false) => {
  return new Promise((resolve, reject) => {
    try {
      // ตรวจสอบว่ามีเสียงในแคชหรือไม่
      if (!soundCache[url]) {
        soundCache[url] = new Audio(url);
      }
      
      const audio = soundCache[url];
      
      // ตั้งค่าพารามิเตอร์
      audio.volume = volume;
      audio.loop = loop;
      
      // รีเซ็ตเวลาเพื่อเล่นตั้งแต่ต้น
      audio.currentTime = 0;
      
      // เล่นเสียง
      const playPromise = audio.play();
      
      // จัดการกับ Promise ที่ return จาก play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          resolve(audio);
        }).catch(error => {
          console.error('เล่นเสียงไม่สำเร็จ:', error);
          reject(error);
        });
      } else {
        resolve(audio);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเล่นเสียง:', error);
      reject(error);
    }
  });
};

/**
 * หยุดเล่นเสียง
 * @param {string} url - URL ของไฟล์เสียงที่ต้องการหยุด
 */
export const stopSound = (url) => {
  if (soundCache[url]) {
    soundCache[url].pause();
    soundCache[url].currentTime = 0;
  }
};

/**
 * หยุดเสียงทั้งหมดที่กำลังเล่นอยู่
 */
export const stopAllSounds = () => {
  Object.values(soundCache).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
};

/**
 * พรีโหลดเสียงให้พร้อมใช้งาน
 * @param {string[]} urls - รายการ URL ของไฟล์เสียงที่ต้องการโหลด
 * @returns {Promise<void>} - Promise ที่ resolve เมื่อโหลดเสียงทั้งหมดเสร็จสิ้น
 */
export const preloadSounds = async (urls) => {
  const loadPromises = urls.map(url => {
    return new Promise((resolve) => {
      if (!soundCache[url]) {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
          soundCache[url] = audio;
          resolve();
        }, { once: true });
        audio.addEventListener('error', () => {
          console.warn(`ไม่สามารถโหลดไฟล์เสียง: ${url}`);
          resolve(); // resolve anyway to avoid hanging
        }, { once: true });
        audio.src = url;
        audio.load();
      } else {
        resolve();
      }
    });
  });
  
  await Promise.all(loadPromises);
};

// เสียงที่ใช้บ่อยในแอปพลิเคชัน
export const SOUNDS = {
  SPIN: '/sounds/spin.mp3',
  FINISH: '/sounds/finish.mp3',
  CLICK: '/sounds/click.mp3',
  SUCCESS: '/sounds/success.mp3',
  COUNTDOWN: '/sounds/countdown.mp3',
  TIMEOUT: '/sounds/timeout.mp3'
};