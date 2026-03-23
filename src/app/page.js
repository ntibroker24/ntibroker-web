'use client';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Car, Flame, Home as HomeIcon, Store, Hammer, HardHat, Truck, Heart, 
  PiggyBank, Activity, ShieldAlert, ChevronRight, MessageCircle, Menu, 
  X, Umbrella, Plane, Calendar, ArrowLeft, Tag, BookOpen
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('home'); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [realPosts, setRealPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูลจาก Sanity
  useEffect(() => {
    const fetchSanityPosts = async () => {
      const PROJECT_ID = "03ujtiwn";
      const DATASET = "production";
      const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
        _id, title, "slug": slug.current, "imageUrl": mainImage.asset->url, publishedAt, excerpt, body
      }`);
      const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.result) setRealPosts(data.result);
      } catch (err) {
        console.error("ดึงข้อมูลไม่สำเร็จ:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSanityPosts();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [activeView, selectedArticle]);

  const renderBodyContent = (body) => {
    if (!body || !Array.isArray(body)) return "<p>ไม่มีเนื้อหา</p>";
    return body.map(block => {
      if (block._type !== 'block' || !block.children) return '';
      const text = block.children.map(child => {
        let t = child.text;
        if (child.marks && child.marks.includes('strong')) t = `<strong>${t}</strong>`;
        return t;
      }).join('');
      if (block.style === 'h2') return `<h2 class="text-2xl font-bold mt-8 mb-4">${text}</h2>`;
      if (block.style === 'h3') return `<h3 class="text-xl font-bold mt-6 mb-3">${text}</h3>`;
      return `<p class="mb-4">${text}</p>`;
    }).join('');
  };

  const directPartners = [
    { id: 'bki', name: 'กรุงเทพประกันภัย (BKI)', description: 'คุ้มครองอุ่นใจ บริการไวด้วยมาตรฐานระดับสากล', url: 'https://www.bangkokinsurance.com/product/catalog/partner?pn_id=T63&agn_code=31396&agn_seq=00&bbl_agn_code&bbl_bc&bbl_rm&intr&brn=12', color: 'bg-blue-800', icon: <ShieldCheck className="w-10 h-10 text-white" /> },
    { id: 'axa', name: 'แอกซ่าประกันภัย (AXA)', description: 'ผู้นำด้านประกันภัยระดับโลก มั่นใจทุกการเดินทางและการใช้ชีวิต', url: 'https://direct.axa.co.th/DirectAXA/Agent/7A686B7B947B7A6F', color: 'bg-blue-900', icon: <Umbrella className="w-10 h-10 text-white" /> },
    { id: 'roojai', name: 'รู้ใจประกันภัย (Roojai)', description: 'ประกันภัยออนไลน์ ซื้อง่าย ราคาดี ปรับแต่งได้ตามใจคุณ', url: 'https://portal.roojaipartners.com/product/#/product', color: 'bg-blue-600', icon: <Car className="w-10 h-10 text-white" /> },
    { id: 'sompo', name: 'ซมโปะประกันภัย (Sompo)', description: 'ประกันเดินทางท่องเที่ยวญี่ปุ่นและทั่วโลก (TravelJoy)', url: 'https://traveljoy.sompo.co.th/th?partner=nititat-tharaniyakorn', color: 'bg-red-600', icon: <Plane className="w-10 h-10 text-white" /> }
  ];

  const products = [
    { name: 'ประกันรถยนต์', icon: <Car className="w-8 h-8" /> },
    { name: 'ประกันรถมอเตอร์ไซต์', icon: <Truck className="w-8 h-8" /> },
    { name: 'ประกันอัคคีภัย', icon: <Flame className="w-8 h-8" /> },
    { name: 'ประกันบ้าน', icon: <HomeIcon className="w-8 h-8" /> },
    { name: 'ประกันร้านค้า/ธุรกิจ', icon: <Store className="w-8 h-8" /> },
    { name: 'ประกันตกแต่งภายใน', icon: <Hammer className="w-8 h-8" /> },
    { name: 'ประกันก่อสร้าง', icon: <HardHat className="w-8 h-8" /> },
    { name: 'ประกันขนส่ง', icon: <Truck className="w-8 h-8" /> },
    { name: 'ประกันชีวิต', icon: <Heart className="w-8 h-8" /> },
    { name: 'ประกันสะสมทรัพย์', icon: <PiggyBank className="w-8 h-8" /> },
    { name: 'ประกันอุบัติเหตุและสุขภาพ', icon: <Activity className="w-8 h-8" /> },
    { name: 'ประกันโรคร้ายแรง', icon: <ShieldAlert className="w-8 h-8" /> }
  ];

  const partnerLogos = [
    { name: 'รู้ใจ', src: '/Roojai.jpg' }, { name: 'ทิพย', src: '/tip.jpg' }, { name: 'กรุงเทพ', src: '/bki.jpg' },
    { name: 'แอกซ่า', src: '/axa.png' }, { name: 'เมืองไทย', src: '/MTI.png' }, { name: 'FWD', src: '/fwd.jpg' },
    { name: 'เออร์โก', src: '/Ergo.jpg' }, { name: 'เทเวศ', src: '/Deves.jpg' }, { name: 'อลิอันซ์', src: '/allianz.png' },
    { name: 'ฟอลคอน', src: '/Falcon.jpg' }, { name: 'ชับบ์', src: '/chubb.jpg' }, { name: 'โตเกียวมารีน', src: '/TMSTH.jpg' },
    { name: 'ไทยวิวัฒน์', src: '/TVI.jpg' }, { name: 'ธนชาต', src: '/TBroker.jpg' }, { name: 'ซมโปะ', src: '/sompo.jpg' }
  ];

  const lineUrl = "https://line.me/R/ti/p/@ntibroker";

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
    setActiveView('article');
  };

  const handleBackToHome = () => {
    setActiveView('home');
    setSelectedArticle(null);
  };

  const ArticleView = () => (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <button onClick={handleBackToHome} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /><span>กลับไปหน้าหลัก</span>
        </button>
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <Tag className="w-4 h-4" /> บทความน่ารู้
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> 
              {selectedArticle.publishedAt ? new Date(selectedArticle.publishedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'ไม่ระบุวันที่'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f204b] leading-tight mb-6">{selectedArticle.title}</h1>
        </div>
        {selectedArticle.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-md bg-slate-100">
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-[300px] md:h-[450px] object-cover" />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: renderBodyContent(selectedArticle.body) }} />
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#0f204b] mb-4">ต้องการคำปรึกษาเพิ่มเติม?</h3>
          <a href={lineUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#00B900] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#009900] transition shadow-lg">
            <MessageCircle className="w-6 h-6" />ปรึกษาผ่าน LINE ฟรี
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="bg-[#0f204b] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={handleBackToHome}>
              <div className="flex flex-col justify-center">
                <span className="text-2xl md:text-3xl font-bold tracking-wider leading-tight">NTI Broker</span>
                <span className="text-xs font-light opacity-90">ที่ปรึกษาประกันภัย</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={handleBackToHome} className="hover:text-blue-300 transition text-sm font-medium">หน้าแรก</button>
              <button onClick={() => {handleBackToHome(); setTimeout(()=>document.getElementById('buy-online')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-blue-300 transition text-sm font-medium">ซื้อออนไลน์</button>
              <button onClick={() => {handleBackToHome(); setTimeout(()=>document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-blue-300 transition text-sm font-medium">บริการของเรา</button>
              <button onClick={() => {handleBackToHome(); setTimeout(()=>document.getElementById('blog')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="hover:text-blue-300 transition text-sm font-medium">บทความ</button>
              <a href={lineUrl} target="_blank" rel="noreferrer" className="bg-[#00B900] hover:bg-[#009900] text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 transition shadow-md">
                <MessageCircle className="w-5 h-5" /><span>@ntibroker</span>
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a1532] border-t border-slate-700 px-2 pt-2 pb-4 space-y-1">
            <button onClick={() => {handleBackToHome(); setIsMenuOpen(false);}} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800">หน้าแรก</button>
            <button onClick={() => {handleBackToHome(); setIsMenuOpen(false); setTimeout(()=>document.getElementById('buy-online')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800">ซื้อออนไลน์</button>
            <button onClick={() => {handleBackToHome(); setIsMenuOpen(false); setTimeout(()=>document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800">บริการของเรา</button>
            <button onClick={() => {handleBackToHome(); setIsMenuOpen(false); setTimeout(()=>document.getElementById('blog')?.scrollIntoView({behavior: 'smooth'}), 100)}} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800">บทความ</button>
          </div>
        )}
      </nav>

      {activeView === 'article' && selectedArticle ? (
        <ArticleView />
      ) : (
        <>
          <section id="home" className="relative bg-[#0f204b] text-white py-16 lg:py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">ที่ปรึกษาประกันภัย <br/><span className="text-blue-400">ที่คุณวางใจได้</span></h1>
              <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl">ซื้อประกันออนไลน์ด้วยตนเองจากบริษัทชั้นนำ หรือรับคำปรึกษาจากทีมงานผู้เชี่ยวชาญ เพื่อให้ได้ความคุ้มครองที่ตอบโจทย์คุณที่สุด</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => document.getElementById('buy-online')?.scrollIntoView({behavior: 'smooth'})} className="bg-white text-[#0f204b] px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition shadow-lg">ซื้อประกันออนไลน์</button>
                <a href={lineUrl} target="_blank" rel="noreferrer" className="bg-[#00B900] text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-[#009900] transition shadow-lg flex justify-center items-center gap-2">
                  <MessageCircle className="w-6 h-6" />ปรึกษาผ่าน LINE
                </a>
              </div>
            </div>
          </section>

          <section className="py-10 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-sm font-semibold text-slate-400 tracking-wider mb-8 uppercase">พันธมิตรประกันภัยที่เราไว้วางใจ</p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                {partnerLogos.map((logo, idx) => (
                  <div key={idx} className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-3 hover:scale-105 transition-all">
                    <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="buy-online" className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f204b] mb-4">ซื้อประกันออนไลน์ด้วยตนเอง</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {directPartners.map((partner) => (
                  <div key={partner.id} className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                    <div className={`${partner.color} h-32 flex items-center justify-center p-6`}>{partner.icon}</div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{partner.name}</h3>
                      <p className="text-slate-600 mb-6 flex-grow text-sm">{partner.description}</p>
                      <a href={partner.url} target="_blank" rel="noreferrer" className="w-full inline-flex justify-center items-center gap-2 bg-[#0f204b] text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                        <span>เช็คราคา</span><ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f204b] mb-4">บริการประกันภัยของเรา</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <a key={index} href={lineUrl} target="_blank" rel="noreferrer" className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">{product.icon}</div>
                    <h3 className="text-slate-800 font-semibold mb-2">{product.name}</h3>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="blog" className="py-16 md:py-24 bg-slate-50 border-t">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f204b] mb-12 flex items-center gap-3"><BookOpen className="text-blue-500" /> บทความน่ารู้</h2>
              {isLoading ? <div className="text-center py-10">กำลังโหลดบทความ...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {realPosts.map((post) => (
                    <div key={post._id} onClick={() => handleReadArticle(post)} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full">
                      <div className="relative h-48 bg-slate-100">
                        {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                        <div className="text-blue-600 font-medium text-sm flex items-center gap-1">อ่านต่อ <ChevronRight className="w-4 h-4" /></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <footer className="bg-[#0a1532] text-slate-300 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white mb-4">NTI Broker</p>
          <p className="text-sm opacity-60 mb-8">โบรกเกอร์ที่ปรึกษาประกันภัยที่คุณวางใจได้</p>
          <div className="border-t border-slate-800 pt-8 text-xs">
            <p>&copy; {new Date().getFullYear()} NTI Broker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}