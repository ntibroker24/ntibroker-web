import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'NTI Broker Studio',

  // ตรวจสอบให้แน่ใจว่า Project ID นี้ตรงกับในหน้า manage.sanity.io ของคุณ
  projectId: '03ujtiwn', 
  dataset: 'production',
  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'บทความ',
        fields: [
          { name: 'title', type: 'string', title: 'หัวข้อ' },
          { name: 'slug', type: 'slug', title: 'ลิ้งก์บทความ (Slug)', options: { source: 'title' } },
          { name: 'mainImage', type: 'image', title: 'รูปหน้าปก', options: { hotspot: true } },
          { name: 'publishedAt', type: 'datetime', title: 'วันที่เผยแพร่' },
          { name: 'excerpt', type: 'text', title: 'เนื้อหาย่อ' },
          { name: 'body', type: 'array', title: 'เนื้อหาหลัก', of: [{ type: 'block' }] }
        ]
      }
    ],
  },
})