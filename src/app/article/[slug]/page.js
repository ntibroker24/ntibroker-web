import React from 'react';
import { ArrowLeft, Tag, Calendar, Facebook, MessageCircle } from 'lucide-react';

// 1. ฟังก์ชันดึงข้อมูลบทความจาก Sanity
async function getPost(slug) {
  const PROJECT_ID = "03ujtiwn";
  const DATASET = "production";
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0] {
    title, "slug": slug.current, "imageUrl": mainImage.asset->url, publishedAt, excerpt, body
  }`);
  const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;
  try {
    const res = await fetch(url, { next: { revalidate: 10 } }); 
    const data = await res.json();
    return data.result;
  } catch (err) {
    return null;
  }
}

// 2. ฟังก์ชันบอก Facebook ว่าหน้านี้คือรูปอะไร
export async function generateMetadata({ params }) {
  // แก้ไข: เพิ่ม await เพื่อรอให้ Next.js 15 อ่านพารามิเตอร์เสร็จก่อน
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return { title: 'ไม่พบบทความ | NTI Broker' };
  }

  const postUrl = `https://ntibroker.com/article/${post.slug}`;

  return {
    title: `${post.title} | NTI Broker`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      images: [
        {
          url: post.imageUrl || 'https://ntibroker.com/logo.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// 3. ฟังก์ชันแปลงข้อความ
const renderBodyContent = (body) => {
  if (!body || !Array.isArray(body)) return "<p>ไม่มีเนื้อหา</p>";
  return body.map(block => {
    if (block._type !== 'block' || !block.children) return '';
    const markDefs = (block.markDefs || []).reduce((acc, def) => {
      acc[def._key] = def;
      return acc;
    }, {});

    const text = block.children.map(child => {
      let t = child.text;
      if (child.marks && child.marks.length > 0) {
        let isLink = false;
        let href = '';
        child.marks.forEach(markKey => {
          if (markKey === 'strong') t = `<strong>${t}</strong>`;
          if (markKey === 'em') t = `<em>${t}</em>`;
          if (markKey === 'underline') t = `<u>${t}</u>`;
          if (markDefs[markKey] && markDefs[markKey]._type === 'link') {
            isLink = true;
            href = markDefs[markKey].href;
          }
        });
        if (isLink) {
          const rel = !href.startsWith('/') ? 'noreferrer noopener' : '';
          t = `<a href="${href}" target="_blank" rel="${rel}" class="text-blue-600 underline hover:text-blue-800 font-medium">${t}</a>`;
        }
      }
      return t;
    }).join('');

    if (block.style === 'h2') return `<h2 class="text-2xl font-bold mt-8 mb-4 text-[#0f204b]">${text}</h2>`;
    if (block.style === 'h3') return `<h3 class="text-xl font-bold mt-6 mb-3 text-[#0f204b]">${text}</h3>`;
    return `<p class="mb-4 text-slate-700 leading-relaxed">${text}</p>`;
  }).join('');
};

// 4. หน้าตาของบทความ
export default async function ArticlePage({ params }) {
  // แก้ไข: เพิ่ม await เพื่อรอให้ Next.js 15 อ่านพารามิเตอร์เสร็จก่อน
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold mb-4">ไม่พบบทความที่คุณค้นหา</h1>
        <a href="/" className="text-blue-600 hover:underline flex items-center gap-2"><ArrowLeft className="w-4 h-4"/> กลับหน้าแรก</a>
      </div>
    );
  }

  const shareUrl = `https://ntibroker.com/article/${post.slug}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const lineUrl = "https://line.me/R/ti/p/@ntibroker";

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <nav className="bg-[#0f204b] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-bold tracking-wider leading-tight">NTI Broker</span>
            <span className="text-xs font-light opacity-90">ที่ปรึกษาประกันภัย</span>
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <a href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /><span>กลับไปหน้าหลัก</span>
        </a>
        
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <Tag className="w-4 h-4" /> บทความน่ารู้
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> 
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'ไม่ระบุวันที่'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f204b] leading-tight mb-6">{post.title}</h1>
        </div>
        
        {post.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-md bg-slate-100">
            <img src={post.imageUrl} alt={post.title} className="w-full h-[300px] md:h-[450px] object-cover" />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: renderBodyContent(post.body) }} />
        
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-[#0f204b] mb-6">ชอบบทความนี้ หรือต้องการคำปรึกษา?</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={fbShareUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#1877F2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#166fe5] transition shadow-md hover:shadow-lg">
              <Facebook className="w-6 h-6" /> แชร์ไปที่ Facebook
            </a>
            <a href={lineUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#00B900] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#009900] transition shadow-md hover:shadow-lg">
              <MessageCircle className="w-6 h-6" /> ปรึกษาผ่าน LINE ฟรี
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}