'use client';
import React, { useState, useEffect } from 'react';
import { Facebook, MessageCircle, Link as LinkIcon, Check, Share2 } from 'lucide-react';

export default function ShareButtons({ shareUrl, title, lineUrl }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // ตรวจสอบว่ามือถือ/เบราว์เซอร์รองรับการแชร์แบบ Native หรือไม่
  useEffect(() => {
    if (navigator.share) {
      setCanNativeShare(true);
    }
  }, []);

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  // ฟังก์ชันแชร์แบบ Native (แก้ปัญหาแอป Facebook บั๊กใน iPhone)
  const handleNativeShare = async (e) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: title,
        url: shareUrl,
      });
    } catch (err) {
      console.log('ผู้ใช้ยกเลิกการแชร์ หรือเกิดข้อผิดพลาด:', err);
    }
  };

  // ฟังก์ชันคัดลอกลิงก์
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* ถ้าเป็นมือถือ ให้ใช้ปุ่ม Native Share / ถ้าเป็นคอมพิวเตอร์ ใช้ปุ่ม Facebook ปกติ */}
      {canNativeShare ? (
        <button 
          onClick={handleNativeShare}
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#1877F2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#166fe5] transition shadow-md hover:shadow-lg"
        >
          <Share2 className="w-6 h-6" /> แชร์บทความนี้
        </button>
      ) : (
        <a 
          href={fbShareUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#1877F2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#166fe5] transition shadow-md hover:shadow-lg"
        >
          <Facebook className="w-6 h-6" /> แชร์ไปที่ Facebook
        </a>
      )}
      
      <a 
        href={lineUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#00B900] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#009900] transition shadow-md hover:shadow-lg"
      >
        <MessageCircle className="w-6 h-6" /> ปรึกษาผ่าน LINE ฟรี
      </a>

      <button 
        onClick={handleCopy}
        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition shadow-sm"
      >
        {copied ? <Check className="w-6 h-6 text-green-600" /> : <LinkIcon className="w-6 h-6" />} 
        {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
      </button>
    </div>
  );
}