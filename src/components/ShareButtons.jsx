'use client';
import React, { useState, useEffect } from 'react';
import { Facebook, MessageCircle, Link as LinkIcon, Check, Share2, Send, Twitter, Instagram, AtSign } from 'lucide-react';

export default function ShareButtons({ shareUrl, title, lineUrl }) {
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // เช็คว่าผู้ใช้เปิดบนมือถือหรือแท็บเล็ตหรือไม่
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  // ลิงก์แชร์สำหรับแพลตฟอร์มต่างๆ ที่รองรับ Web Intent
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const threadsShareUrl = `https://threads.net/intent/post?text=${encodeURIComponent(title + " " + shareUrl)}`;

  // ฟังก์ชันเปิดเมนูแชร์ของเครื่อง (โชว์เฉพาะมือถือ)
  const handleNativeShare = async (e) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: title,
        url: shareUrl,
      });
    } catch (err) {
      console.log('ผู้ใช้ยกเลิกการแชร์ หรือแอปไม่รองรับ');
    }
  };

  // ฟังก์ชันคัดลอกลิงก์ทั่วไป
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ฟังก์ชันพิเศษสำหรับ Instagram (คัดลอกลิงก์พร้อมแสดงข้อความแนะนำ)
  const handleIgShare = (e) => {
    e.preventDefault();
    copyToClipboard();
    setIgCopied(true);
    setTimeout(() => setIgCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      
      {/* แถวที่ 1: โซเชียลหลัก (Facebook & LINE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a 
          href={fbShareUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex justify-center items-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#166fe5] transition shadow-sm"
        >
          <Facebook className="w-5 h-5" /> แชร์ Facebook
        </a>
        
        <a 
          href={lineShareUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex justify-center items-center gap-2 bg-[#00B900] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#009900] transition shadow-sm"
        >
          <Send className="w-5 h-5" /> ส่งต่อใน LINE
        </a>
      </div>

      {/* แถวที่ 2: โซเชียลสายคอนเทนต์ (X & Threads) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a 
          href={xShareUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex justify-center items-center gap-2 bg-black text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-sm"
        >
          <Twitter className="w-5 h-5" /> แชร์บน X
        </a>
        
        <a 
          href={threadsShareUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex justify-center items-center gap-2 bg-zinc-900 text-white px-4 py-3 rounded-xl font-bold hover:bg-zinc-800 transition shadow-sm"
        >
          <AtSign className="w-5 h-5" /> ลง Threads
        </a>
      </div>

      {/* แถวที่ 3: โซเชียลสายรูปภาพ (Instagram - ก๊อปปี้ลิงก์อัจฉริยะ) */}
      <button 
        onClick={handleIgShare}
        className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-sm w-full relative overflow-hidden"
      >
        {igCopied ? (
          <span className="flex items-center gap-2 animate-pulse">
            <Check className="w-5 h-5" /> คัดลอกแล้ว! นำไปแปะในสตอรี่ IG ได้เลย
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Instagram className="w-5 h-5" /> แชร์ลง Instagram (สตอรี่/Bio)
          </span>
        )}
      </button>

      {/* แถวที่ 4: คัดลอกลิงก์ และ แชร์ของเครื่อง (Native) */}
      <div className="flex gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 flex justify-center items-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-4 py-3 rounded-xl font-bold hover:bg-slate-200 transition shadow-sm"
        >
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <LinkIcon className="w-5 h-5" />} 
          {copied ? 'คัดลอกสำเร็จ!' : 'คัดลอกลิงก์บทความ'}
        </button>

        {isMobile && navigator.share && (
          <button 
            onClick={handleNativeShare}
            className="flex justify-center items-center bg-slate-800 text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-700 transition shadow-sm w-16"
            title="แชร์ผ่านแอปอื่นในเครื่อง"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* แถวที่ 5: ปุ่มปรึกษาแอดมิน (Call to Action ปิดการขาย) */}
      <div className="mt-2 pt-4 border-t border-slate-200">
        <a 
          href={lineUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="w-full flex justify-center items-center gap-2 bg-[#0f204b] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition shadow-md"
        >
          <MessageCircle className="w-6 h-6" /> ปรึกษาแอดมิน NTI Broker ฟรี
        </a>
      </div>
      
    </div>
  );
}