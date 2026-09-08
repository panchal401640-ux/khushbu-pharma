'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  actions?: string[];
  html?: string;
  timestamp?: number;
}

const THEME_PRESETS: Record<string, any> = {
  green: { primaryColor: '#1e6b3a', secondaryColor: '#2d8a50', accentColor: '#f59e0b' },
  blue: { primaryColor: '#1d4ed8', secondaryColor: '#2563eb', accentColor: '#f97316' },
  purple: { primaryColor: '#7c3aed', secondaryColor: '#8b5cf6', accentColor: '#06b6d4' },
  red: { primaryColor: '#dc2626', secondaryColor: '#ef4444', accentColor: '#fbbf24' },
  teal: { primaryColor: '#0d9488', secondaryColor: '#14b8a6', accentColor: '#f43f5e' },
  navy: { primaryColor: '#1e3a5f', secondaryColor: '#2563eb', accentColor: '#eab308' },
  orange: { primaryColor: '#ea580c', secondaryColor: '#f97316', accentColor: '#8b5cf6' },
  slate: { primaryColor: '#334155', secondaryColor: '#475569', accentColor: '#3b82f6' },
  pink: { primaryColor: '#db2777', secondaryColor: '#ec4899', accentColor: '#10b981' },
  amber: { primaryColor: '#d97706', secondaryColor: '#f59e0b', accentColor: '#6366f1' },
  indigo: { primaryColor: '#4f46e5', secondaryColor: '#6366f1', accentColor: '#f59e0b' },
  emerald: { primaryColor: '#059669', secondaryColor: '#10b981', accentColor: '#8b5cf6' },
};

function applyThemeToSite(t: Record<string, string>) {
  const styleId = 'kpm-dynamic-theme';
  let el = document.getElementById(styleId) as HTMLStyleElement;
  if (!el) { el = document.createElement('style'); el.id = styleId; document.head.appendChild(el); }
  el.textContent = `
    :root { --primary: ${t.primaryColor}; --primary-700: ${t.primaryColor}; --primary-800: ${t.secondaryColor}; --primary-600: ${t.primaryColor}; }
    body { background-color: ${t.bodyBg || '#f5f5f4'} !important; }
    .bg-primary-700, .bg-gradient-to-r.from-green-600.to-blue-600 { background: ${t.primaryColor} !important; }
    .bg-primary-800 { background-color: ${t.secondaryColor} !important; }
    .text-primary-700, .text-primary-600 { color: ${t.primaryColor} !important; }
    .border-primary-500 { border-color: ${t.primaryColor} !important; }
    .hover\\:bg-primary-800:hover { background-color: ${t.secondaryColor} !important; }
    .bg-primary-50 { background-color: ${t.primaryColor}0d !important; }
    .bg-primary-100 { background-color: ${t.primaryColor}1a !important; }
    .bg-industrial-900 { background-color: ${t.headerBg || '#171717'} !important; }
    footer.bg-industrial-900 { background-color: ${t.footerBg || '#171717'} !important; }
  `;
}

function logActivity(action: string) {
  try {
    const stored = localStorage.getItem('kpm_activity_log');
    const logs = stored ? JSON.parse(stored) : [];
    logs.unshift(`[${new Date().toLocaleString()}] ${action}`);
    if (logs.length > 100) logs.pop();
    localStorage.setItem('kpm_activity_log', JSON.stringify(logs));
  } catch {}
}

function getProducts(): Product[] {
  try { const s = localStorage.getItem('kpm_products'); if (s) return JSON.parse(s); } catch {}
  return defaultProducts;
}

function saveProducts(prods: Product[]) {
  localStorage.setItem('kpm_products', JSON.stringify(prods));
}

function getSettings(): any {
  try { const s = localStorage.getItem('kpm_settings'); if (s) return JSON.parse(s); } catch {}
  return {};
}

function saveSettings(s: any) {
  localStorage.setItem('kpm_settings', JSON.stringify(s));
}

function getPages(): any {
  try { const s = localStorage.getItem('kpm_pages'); if (s) return JSON.parse(s); } catch {}
  return {};
}

function savePages(p: any) {
  localStorage.setItem('kpm_pages', JSON.stringify(p));
}

function getTheme(): any {
  try { const s = localStorage.getItem('kpm_theme'); if (s) return JSON.parse(s); } catch {}
  return {};
}

function saveTheme(t: any) {
  localStorage.setItem('kpm_theme', JSON.stringify(t));
  applyThemeToSite(t);
}

function getGalleryImages(): string[] {
  try { const s = localStorage.getItem('kpm_gallery'); if (s) return JSON.parse(s); } catch {}
  return [];
}

function saveGalleryImages(imgs: string[]) {
  localStorage.setItem('kpm_gallery', JSON.stringify(imgs));
}

function processCommand(input: string): { response: string; actions?: string[] } {
  const msg = input.toLowerCase().trim();

  // ==================== THEME COMMANDS ====================
  for (const [name, colors] of Object.entries(THEME_PRESETS)) {
    if (msg.includes(name) && (msg.includes('apply') || msg.includes('change') || msg.includes('use') || msg.includes('lagao') || msg.includes('karo') || msg.includes('banao'))) {
      const fullTheme = { ...colors, headerBg: '#171717', footerBg: '#171717', bodyBg: '#f5f5f4', textColor: '#1c1917', headingFont: 'Inter, sans-serif', bodyFont: 'Inter, sans-serif', borderRadius: '8px' };
      saveTheme(fullTheme);
      logActivity(`Theme changed to ${name}`);
      return { response: `✅ **${name.charAt(0).toUpperCase() + name.slice(1)} theme lagaya gaya!**\n\nColors change ho gaye. Website refresh karo aur dekho kitna sundar lag raha hai!` };
    }
  }

  if (msg.includes('dark mode') || msg.includes('dark theme')) {
    const theme = getTheme();
    saveTheme({ ...theme, headerBg: '#0f172a', footerBg: '#0f172a', bodyBg: '#1e293b', textColor: '#f1f5f9' });
    logActivity('Dark mode enabled');
    return { response: '✅ **Dark mode enable ho gaya!** Website ab dark theme pe hai.' };
  }

  if (msg.includes('light mode') || msg.includes('light theme') || msg.includes('white theme')) {
    const theme = getTheme();
    saveTheme({ ...theme, headerBg: '#171717', footerBg: '#171717', bodyBg: '#f5f5f4', textColor: '#1c1917' });
    logActivity('Light mode enabled');
    return { response: '✅ **Light mode enable ho gaya!**' };
  }

  if (msg.includes('font') && (msg.includes('change') || msg.includes('badal') || msg.includes('lagao'))) {
    const fonts: Record<string, string> = { 'poppins': "'Poppins', sans-serif", 'roboto': "'Roboto', sans-serif", 'montserrat': "'Montserrat', sans-serif", 'open sans': "'Open Sans', sans-serif", 'inter': 'Inter, sans-serif', 'lato': "'Lato', sans-serif", 'nunito': "'Nunito', sans-serif" };
    for (const [name, value] of Object.entries(fonts)) {
      if (msg.includes(name)) {
        const theme = getTheme();
        saveTheme({ ...theme, headingFont: value, bodyFont: value });
        logActivity(`Font changed to ${name}`);
        return { response: `✅ **Font "${name}" lagaya gaya!** Website pe ab ye font dikhega.` };
      }
    }
    return { response: 'Available fonts: `poppins`, `roboto`, `montserrat`, `open sans`, `inter`, `lato`, `nunito`\n\nExample: **"font poppins lagao"**' };
  }

  if (msg.includes('border radius') || msg.includes('rounded') || msg.includes('sharp')) {
    const theme = getTheme();
    if (msg.includes('sharp') || msg.includes('zero') || msg.includes('square')) {
      saveTheme({ ...theme, borderRadius: '0px' });
      return { response: '✅ **Border radius 0 kar diya** — ab sab sharp/square hoga.' };
    }
    if (msg.includes('very round') || msg.includes('pill')) {
      saveTheme({ ...theme, borderRadius: '24px' });
      return { response: '✅ **Border radius 24px** — ab sab bahut round hoga.' };
    }
    return { response: 'Border radius change karne ke liye bolo:\n- **"border radius sharp karo"** (0px)\n- **"border radius round karo"** (24px)' };
  }

  // ==================== COMPANY INFO COMMANDS ====================
  if (msg.includes('company name') && (msg.includes('change') || msg.includes('badal') || msg.includes('update') || msg.includes('set') || msg.includes('karo'))) {
    const newName = msg.replace(/.*company name.*(?:change|badal|update|set|karo)\s*/i, '').trim();
    if (newName) {
      const settings = getSettings();
      settings.name = newName;
      saveSettings(settings);
      logActivity(`Company name changed to: ${newName}`);
      return { response: `✅ **Company name "${newName}" kar diya!** Header aur footer mein ab ye dikhega.` };
    }
    return { response: 'Company name change karne ke liye bolo:\n**"company name KHUSHBU PHARMA karo"**' };
  }

  if (msg.includes('phone') && (msg.includes('change') || msg.includes('badal') || msg.includes('update') || msg.includes('set'))) {
    const phoneMatch = msg.match(/(\d{10})/);
    if (phoneMatch) {
      const settings = getSettings();
      settings.phone = phoneMatch[1];
      saveSettings(settings);
      logActivity(`Phone changed to: ${phoneMatch[1]}`);
      return { response: `✅ **Phone number "${phoneMatch[1]}" kar diya!**` };
    }
    return { response: 'Phone change karne ke liye bolo:\n**"phone 9876543210 karo"**' };
  }

  if (msg.includes('email') && (msg.includes('change') || msg.includes('badal') || msg.includes('set'))) {
    const emailMatch = msg.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      const settings = getSettings();
      settings.email = emailMatch[0];
      saveSettings(settings);
      logActivity(`Email changed to: ${emailMatch[0]}`);
      return { response: `✅ **Email "${emailMatch[0]}" kar diya!**` };
    }
    return { response: 'Email change karne ke liye bolo:\n**"email example@gmail.com karo"**' };
  }

  if (msg.includes('whatsapp') && (msg.includes('change') || msg.includes('badal') || msg.includes('set'))) {
    const phoneMatch = msg.match(/(\d{10,12})/);
    if (phoneMatch) {
      const settings = getSettings();
      settings.whatsapp = phoneMatch[1];
      saveSettings(settings);
      logActivity(`WhatsApp changed to: ${phoneMatch[1]}`);
      return { response: `✅ **WhatsApp number "${phoneMatch[1]}" kar diya!**` };
    }
    return { response: 'WhatsApp change karne ke liye bolo:\n**"whatsapp 9876543210 karo"**' };
  }

  if (msg.includes('address') && (msg.includes('change') || msg.includes('badal') || msg.includes('set') || msg.includes('update'))) {
    const addressMatch = msg.match(/address\s+(?:change|badal|set|update|karo)\s+(.+)/i);
    if (addressMatch) {
      const settings = getSettings();
      settings.address = addressMatch[1].trim();
      saveSettings(settings);
      logActivity('Address changed');
      return { response: '✅ **Address update kar diya!**' };
    }
    return { response: 'Address change karne ke liye bolo:\n**"address [naya address] karo"**' };
  }

  if (msg.includes('gst') && (msg.includes('change') || msg.includes('badal') || msg.includes('set'))) {
    const gstMatch = msg.match(/([0-9A-Z]{15})/i);
    if (gstMatch) {
      const settings = getSettings();
      settings.gst = gstMatch[1];
      saveSettings(settings);
      logActivity(`GST changed to: ${gstMatch[1]}`);
      return { response: `✅ **GST number "${gstMatch[1]}" kar diya!**` };
    }
    return { response: 'GST change karne ke liye bolo:\n**"GST 24CBPP7842P1ZY karo"**' };
  }

  if (msg.includes('business hour') || msg.includes('timing') || msg.includes('time')) {
    const settings = getSettings();
    return { response: `**Current business hours:**\n- Weekdays: ${settings.weekdays || '9:00 AM - 6:00 PM'}\n- Saturday: ${settings.saturday || '9:00 AM - 2:00 PM'}\n- Sunday: ${settings.sunday || 'Closed'}\n\nChange karne ke liye bolo:\n**"timing weekdays 9am to 7pm karo"**` };
  }

  // ==================== PHOTO / IMAGE COMMANDS ====================
  if (msg.includes('photo') && (msg.includes('add') || msg.includes('upload') || msg.includes('jod') || msg.includes('lagao'))) {
    return { response: `📸 **Photo add karne ke liye:**\n\n**Option 1 — Product Photo:**\n1. Products page pe jao\n2. Product Edit karo\n3. Photo upload karo (click ya drag)\n\n**Option 2 — Gallery Photo:**\n1. Photo Editor mein jao\n2. Photo upload karo\n3. Edit karo (crop, filter, text)\n4. Download karo aur Gallery mein upload karo\n\n**Option 3 — Logo:**\n1. Site Settings mein jao\n2. Logo upload karo\n\nKaunsa photo add karna hai?`, actions: ['Opening photo editor'] };
  }

  if (msg.includes('photo') && (msg.includes('edit') || msg.includes('sudhar') || msg.includes('badlav'))) {
    return { response: '📸 **Photo Editor khol raha hoon** — wahan:\n\n• 12 Filters (Vintage, Sepia, B&W, etc.)\n• Crop (Custom, 16:9, 4:3, 1:1)\n• Text Overlay (fonts, colors, position)\n• Resize\n• Brightness, Contrast, Saturation adjust\n• Undo/Redo\n• Download', actions: ['Opening photo editor'] };
  }

  if (msg.includes('photo') && (msg.includes('delete') || msg.includes('remove') || msg.includes('hatao'))) {
    return { response: '📸 **Photo delete karne ke liye:**\n\n1. Products page pe jao\n2. Product Edit karo\n3. Photo pe X button dabao\n4. Save karo\n\nYa Gallery mein se delete karo.', actions: ['Opening products page'] };
  }

  if (msg.includes('gallery') && (msg.includes('add') || msg.includes('photo') || msg.includes('upload'))) {
    return { response: '📸 **Gallery mein photo add karna:**\n\nAbhi gallery localStorage pe store hoti hai. Photo Editor mein photo edit karo, download karo, phir Gallery section mein manually upload karo.\n\n**Photo Editor khol raha hoon...**', actions: ['Opening photo editor'] };
  }

  if (msg.includes('gallery') && (msg.includes('delete') || msg.includes('remove'))) {
    const images = getGalleryImages();
    if (images.length === 0) {
      return { response: '📸 **Gallery mein abhi koi photo nahi hai.**\n\nPhotos add karne ke liye Photo Editor mein upload karo, edit karo, aur download karo.' };
    }
    return { response: `📸 **Gallery mein ${images.length} photos hain.**\n\nDelete karne ke liye:\n1. Gallery page pe jao\n2. Photo pe delete button dabao\n\nYa mujhe bolo "delete gallery photo 1" (number batao)` };
  }

  if (msg.includes('product') && (msg.includes('photo') || msg.includes('image') || msg.includes('picture') || msg.includes('tasveer'))) {
    return { response: '📸 **Product photo add/edit karna:**\n\n1. Products page pe jao\n2. Product select karo → Edit pe click karo\n3. Photo section mein:\n   - **Add:** + button ya drag & drop\n   - **Edit:** Crop ya filter laga sakte ho\n   - **Delete:** X button\n4. Save karo\n\n**Products page khol raha hoon...**', actions: ['Opening products page'] };
  }

  if (msg.includes('logo') && (msg.includes('add') || msg.includes('upload') || msg.includes('change') || msg.includes('badal'))) {
    return { response: '🏢 **Logo upload karna:**\n\n1. Site Settings pe jao\n2. Company Logo section mein\n3. "Upload Logo" button dabao\n4. Apni logo file select karo\n5. Save All Settings dabao\n\n**Site Settings khol raha hoon...**', actions: ['Opening settings'] };
  }

  if (msg.includes('filter') || msg.includes('vintage') || msg.includes('sepia') || msg.includes('grayscale')) {
    return { response: '📸 **Photo filters available hain Photo Editor mein:**\n\n• Original, Grayscale, Sepia, Vintage\n• Warm, Cool, Dramatic, High Contrast\n• Bright, Dark, Vintage Film\n\n**Photo Editor khol raha hoon...**', actions: ['Opening photo editor'] };
  }

  if (msg.includes('crop') || msg.includes('resize')) {
    return { response: '📸 **Photo crop/resize Photo Editor mein kar sakte ho:**\n\nCrop options: Free, 16:9, 4:3, 3:2, 1:1, 9:16\nResize: Width x Height custom\n\n**Photo Editor khol raha hoon...**', actions: ['Opening photo editor'] };
  }

  // ==================== PRODUCT COMMANDS ====================
  if (msg.includes('product') && (msg.includes('list') || msg.includes('show') || msg.includes('view') || msg.includes('all') || msg.includes('dikhao'))) {
    const products = getProducts();
    const cats = [...new Set(products.map(p => p.category))];
    let list = `📦 **Aapke ${products.length} products hain:**\n\n`;
    for (const cat of cats) {
      const catProds = products.filter(p => p.category === cat);
      list += `**${cat}** (${catProds.length})\n`;
      catProds.forEach(p => list += `  • ${p.name}\n`);
      list += '\n';
    }
    return { response: list };
  }

  if (msg.includes('add product') || msg.includes('new product') || msg.includes('naya product') || msg.includes('product jod')) {
    return { response: '➕ **Naya product add karne ke liye:**\n\n1. Products page pe jao\n2. "Add Product" button dabao\n3. Photo upload karo (multiple allowed)\n4. Naam, description, specs, features dalo\n5. SEO section mein title aur description likho\n6. Save karo\n\n**Products page khol raha hoon...**', actions: ['Opening products page'] };
  }

  const deleteMatch = msg.match(/(?:delete|remove|hatao|hatayo|hata)\s+(?:product\s+)?(.+)/);
  if (deleteMatch) {
    const name = deleteMatch[1].trim();
    const products = getProducts();
    const found = products.find(p => p.name.toLowerCase().includes(name));
    if (found) {
      const updated = products.filter(p => p.id !== found.id);
      saveProducts(updated);
      logActivity(`Deleted product: ${found.name}`);
      return { response: `🗑️ **"${found.name}" delete ho gaya!** Ab website pe ye product nahi dikhega.` };
    }
    return { response: `"${name}" product nahi mila.\n\n**Products:** ${products.slice(0, 10).map(p => p.name).join(', ')}` };
  }

  if (msg.includes('product') && (msg.includes('name') || msg.includes('rename') || msg.includes('naam'))) {
    const products = getProducts();
    const renameMatch = msg.match(/(?:product\s+)?(?:name|rename|naam)\s+(.+?)\s+(?:to|se|ko|as|karo)\s+(.+)/i);
    if (renameMatch) {
      const oldName = renameMatch[1].trim();
      const newName = renameMatch[2].trim();
      const found = products.find(p => p.name.toLowerCase().includes(oldName));
      if (found) {
        const updated = products.map(p => p.id === found.id ? { ...p, name: newName } : p);
        saveProducts(updated);
        logActivity(`Product renamed: ${found.name} → ${newName}`);
        return { response: `✅ **Product naam "${found.name}" se "${newName}" change ho gaya!**` };
      }
      return { response: `"${oldName}" product nahi mila.` };
    }
    return { response: 'Product rename karne ke liye bolo:\n**"product name [purana naam] se [naya naam] karo"**' };
  }

  if (msg.includes('product') && (msg.includes('description') || msg.includes('detail'))) {
    return { response: 'Product description edit karne ke liye:\n\n1. Products page pe jao\n2. Edit pe click karo\n3. Description section mein changes karo\n4. Save karo\n\n**Products page khol raha hoon...**', actions: ['Opening products page'] };
  }

  // ==================== PAGE CONTENT COMMANDS ====================
  if (msg.includes('hero') && (msg.includes('change') || msg.includes('badal') || msg.includes('title'))) {
    const heroMatch = msg.match(/(?:title|heading|hero)\s+(?:change|badal|set|karo)\s+(.+)/i);
    if (heroMatch) {
      const pages = getPages();
      if (!pages.home) pages.home = {};
      if (!pages.home.hero) pages.home.hero = {};
      pages.home.hero.title = heroMatch[1].trim();
      savePages(pages);
      logActivity('Homepage hero title changed');
      return { response: `✅ **Hero title "${heroMatch[1].trim()}" kar diya!**` };
    }
    return { response: 'Hero title change karne ke liye bolo:\n**"hero title [naya title] karo"**\n\nYa Page Editor mein jaake edit karo.', actions: ['Opening page editor'] };
  }

  if (msg.includes('hero') && (msg.includes('subtitle') || msg.includes('subtitle'))) {
    const subMatch = msg.match(/(?:subtitle|subtitle)\s+(?:change|badal|set|karo)\s+(.+)/i);
    if (subMatch) {
      const pages = getPages();
      if (!pages.home) pages.home = {};
      if (!pages.home.hero) pages.home.hero = {};
      pages.home.hero.subtitle = subMatch[1].trim();
      savePages(pages);
      logActivity('Homepage hero subtitle changed');
      return { response: `✅ **Hero subtitle change ho gaya!**` };
    }
    return { response: 'Hero subtitle change karne ke liye bolo:\n**"hero subtitle [naya subtitle] karo"**' };
  }

  if (msg.includes('homepage') && (msg.includes('edit') || msg.includes('change') || msg.includes('update'))) {
    return { response: '📄 **Homepage edit karne ke liye Page Editor khol raha hoon.**\n\nYahan hero title, subtitle, CTA buttons sab change kar sakte ho.', actions: ['Opening page editor'] };
  }

  if (msg.includes('about') && (msg.includes('edit') || msg.includes('change') || msg.includes('update'))) {
    return { response: '📄 **About page edit karne ke liye Page Editor khol raha hoon.**', actions: ['Opening page editor'] };
  }

  if (msg.includes('contact') && (msg.includes('edit') || msg.includes('change'))) {
    return { response: '📄 **Contact page edit karne ke liye Page Editor khol raha hoon.**', actions: ['Opening page editor'] };
  }

  if (msg.includes('footer') && (msg.includes('edit') || msg.includes('change') || msg.includes('text'))) {
    return { response: 'Footer text change karne ke liye **Site Settings** mein jao.\n\nCompany name, phone, email, address sab wahan se change ho jayega.', actions: ['Opening settings'] };
  }

  if (msg.includes('header') && (msg.includes('edit') || msg.includes('change'))) {
    return { response: 'Header change karne ke liye:\n\n• **Logo**: Site Settings mein upload karo\n• **Colors**: Theme & Colors page pe\n• **Navigation**: Page Editor mein\n\nKaunsa change karna hai?' };
  }

  // ==================== NAVIGATION COMMANDS ====================
  if (msg.includes('open') || msg.includes('kholo') || msg.includes('jao') || msg.includes('go to')) {
    if (msg.includes('product')) return { response: '📦 Products page khol raha hoon...', actions: ['Opening products page'] };
    if (msg.includes('setting') || msg.includes('company')) return { response: '⚙️ Site Settings khol raha hoon...', actions: ['Opening settings'] };
    if (msg.includes('theme') || msg.includes('color')) return { response: '🎨 Theme page khol raha hoon...', actions: ['Opening theme page'] };
    if (msg.includes('page') || msg.includes('editor')) return { response: '📄 Page Editor khol raha hoon...', actions: ['Opening page editor'] };
    if (msg.includes('enquir') || msg.includes('lead')) return { response: '📧 Enquiries khol raha hoon...', actions: ['Opening enquiries'] };
    if (msg.includes('ai') || msg.includes('assistant')) return { response: '🤖 AI Assistant already open hai! 😄' };
    if (msg.includes('photo') || msg.includes('editor')) return { response: '📸 Photo Editor khol raha hoon...', actions: ['Opening photo editor'] };
    if (msg.includes('dashboard') || msg.includes('home')) return { response: '📊 Dashboard khol raha hoon...', actions: ['Opening dashboard'] };
    if (msg.includes('website') || msg.includes('site')) return { response: '🌐 Website khol raha hoon...', actions: ['Opening website'] };
  }

  // ==================== ANALYTICS COMMANDS ====================
  if (msg.includes('analytics') || msg.includes('stats') || msg.includes('data') || msg.includes('report') || msg.includes('kitne') || msg.includes('summary')) {
    const products = getProducts();
    let enquiries: any[] = [];
    try { const s = localStorage.getItem('kpm_enquiries'); if (s) enquiries = JSON.parse(s); } catch {}
    const categories = [...new Set(products.map(p => p.category))];
    const settings = getSettings();
    const logo = localStorage.getItem('kpm_logo');
    return {
      response: `📊 **Website Analytics:**\n\n**🏢 Company:** ${settings.name || siteConfig.name}\n**📞 Phone:** ${settings.phone || '9328030074'}\n**📧 Email:** ${settings.email || 'khushbupharma.sales@gmail.com'}\n**📸 Logo:** ${logo ? '✅ Uploaded' : '❌ Not uploaded'}\n\n**📦 Products:** ${products.length} total\n${categories.map(c => `  • ${c}: ${products.filter(p => p.category === c).length}`).join('\n')}\n\n**📧 Enquiries:** ${enquiries.length} total\n  • New: ${enquiries.filter(e => e.status === 'new').length}\n  • Contacted: ${enquiries.filter(e => e.status === 'contacted').length}\n  • Quoted: ${enquiries.filter(e => e.status === 'quoted').length}\n  • Closed: ${enquiries.filter(e => e.status === 'closed').length}\n\n**🎨 Theme:** Active\n**📄 Pages:** Customizable`
    };
  }

  // ==================== ENQUIRY COMMANDS ====================
  if (msg.includes('enquir') || msg.includes('lead') || msg.includes('customer')) {
    return { response: '📧 **Enquiries khol raha hoon...**', actions: ['Opening enquiries'] };
  }

  // ==================== MACHINERY KNOWLEDGE ====================
  const machinerySpecs: Record<string, string> = {
    'fbd': '🔹 **Fluid Bed Dryer (FBD)**\nDrying of granules, powders, pellets.\n• Capacity: 5kg to 500kg\n• Contact: SS 316L\n• Body: SS 304\n• Features: Uniform drying, temp control, GMP\n• Application: Tablet, capsule, injectable',
    'rmg': '🔹 **Rapid Mixing Granulator (RMG)**\nHigh-shear wet granulation.\n• Capacity: 10L to 600L\n• Contact: SS 316L\n• Impeller: Variable speed\n• Features: Uniform granules, easy cleaning, GMP',
    'fluid bed dryer': '🔹 **Fluid Bed Dryer (FBD)**\nDrying of granules, powders, pellets.\n• Capacity: 5kg to 500kg\n• Contact: SS 316L\n• Body: SS 304\n• Features: Uniform drying, temp control, GMP',
    'rapid mixing granulator': '🔹 **Rapid Mixing Granulator (RMG)**\nHigh-shear wet granulation.\n• Capacity: 10L to 600L\n• Contact: SS 316L\n• Impeller: Variable speed\n• Features: Uniform granules, easy cleaning, GMP',
    'auto coater': '🔹 **Auto Coater**\nFully automatic tablet coating.\n• Controls: PLC with HMI\n• Contact: SS 316L\n• Coating: Film, sugar, enteric\n• Features: Programmable recipes, spray control',
    'tablet coater': '🔹 **Auto Coater**\nFully automatic tablet coating.\n• Controls: PLC with HMI\n• Contact: SS 316L\n• Coating: Film, sugar, enteric\n• Features: Programmable recipes, spray control',
    'ointment plant': '🔹 **Ointment Plant**\nComplete ointment/cream manufacturing.\n• Components: Vessel + Homogenizer + Vacuum\n• Contact: SS 316L\n• Features: Anchor agitator, jacketed heating',
    'liquid plant': '🔹 **Liquid Manufacturing Plant**\nSyrup, suspension, solution manufacturing.\n• Components: Vessel + Filter + Pump\n• Contact: SS 316L\n• Features: CIP, high-speed mixer',
    'liquid manufacturing': '🔹 **Liquid Manufacturing Plant**\nSyrup, suspension, solution manufacturing.\n• Components: Vessel + Filter + Pump\n• Contact: SS 316L\n• Features: CIP, high-speed mixer',
    'sugar tank': '🔹 **Sugar Melting Tank**\nSugar dissolution for syrup manufacturing.\n• Heating: Jacketed (steam/hot water)\n• Agitation: High-speed propeller\n• Features: Temp control',
    'sugar melting': '🔹 **Sugar Melting Tank**\nSugar dissolution for syrup manufacturing.\n• Heating: Jacketed (steam/hot water)\n• Agitation: High-speed propeller\n• Features: Temp control',
    'autoclave': '🔹 **Autoclave**\nSteam sterilization.\n• Temp: Up to 134°C\n• Pressure: Up to 2.2 kg/cm²\n• Cycles: Gravity, Pre-vacuum, Liquid\n• Features: PLC, safety interlocks, GMP',
    'ibc': '🔹 **Lifting Chamber with IBC Bin**\nDust-free powder transfer.\n• Lifting: Hydraulic\n• Contact: SS 316L\n• Features: IBC bin, safety interlocks',
    'lifting chamber': '🔹 **Lifting Chamber with IBC Bin**\nDust-free powder transfer.\n• Lifting: Hydraulic\n• Contact: SS 316L\n• Features: IBC bin, safety interlocks',
    'v blender': '🔹 **V Blender**\nV-shaped tumbling blender.\n• Capacity: 50L to 5000L\n• Contact: SS 316\n• Features: Uniform mixing, gentle action',
    'v-type': '🔹 **V Blender**\nV-shaped tumbling blender.\n• Capacity: 50L to 5000L\n• Contact: SS 316\n• Features: Uniform mixing, gentle action',
    'coating pan': '🔹 **Coating Pan**\nTablet coating.\n• Size: 12" to 60"\n• Contact: SS 316\n• Features: Variable speed, spray gun',
    'hot air': '🔹 **Coating Pan with Hot Air**\nCoating + integrated drying.\n• Features: Hot air blower, temp control\n• Coating: Sugar, film, color',
    'octagonal': '🔹 **Octagonal Blender**\nGentle powder blending.\n• Capacity: 50L to 5000L\n• Contact: SS 316\n• Features: Low shear, VFD control',
    'octacone': '🔹 **Octacone Blender**\nHybrid octagonal-conical.\n• Contact: SS 316\n• Features: Easy discharge, uniform mixing',
    'double cone': '🔹 **Double Cone Blender**\nGentle tumbling blender.\n• Capacity: 50L to 5000L\n• Contact: SS 316\n• Features: Minimal degradation',
    'ribbon': '🔹 **Ribbon Blender**\nDouble helical ribbon agitator.\n• Capacity: 50L to 5000L\n• Contact: SS 316\n• Features: Powders + pastes, bottom discharge',
    'rcvd': '🔹 **Rotocone Vacuum Dryer**\nVacuum drying.\n• Capacity: 10L to 500L\n• Contact: SS 316\n• Features: Internal screw, jacketed heating',
    'rotocone': '🔹 **Rotocone Vacuum Dryer**\nVacuum drying.\n• Capacity: 10L to 500L\n• Contact: SS 316\n• Features: Internal screw, jacketed heating',
    'tray dryer': '🔹 **Tray Dryer**\nBatch convection dryer.\n• Heating: Electric/Steam\n• Trays: SS/Aluminum\n• Features: Forced air, temp control',
    'vacuum tray': '🔹 **Vacuum Tray Dryer**\nLow-temp vacuum drying.\n• Contact: SS 316\n• Features: Prevents oxidation, uniform drying',
    'vibro sifter': '🔹 **Vibro Sifter**\nScreening and grading.\n• Diameter: 12" to 48"\n• Decks: Single/Multi\n• Features: Various mesh, dust-free',
    'multi mill': '🔹 **Multi Mill**\nGrinding + mixing.\n• Contact: SS 316\n• Features: Swinging beaters, various screens',
    'filter press': '🔹 **Filter Press**\nSolid-liquid separation.\n• Pressure: Up to 15 kg/cm²\n• Contact: SS 316/PP\n• Features: Hydraulic closing, GMP',
    'zero hold up': '🔹 **Zero Hold Up Filter**\nZero product retention filtration.\n• Contact: SS 316\n• Features: Complete filtration, GMP',
    'mass mixer': '🔹 **Mass Mixer**\nHigh-shear viscous mixing.\n• Contact: SS 316\n• Features: Tilting discharge, GMP',
  };

  for (const [key, specs] of Object.entries(machinerySpecs)) {
    if (msg.includes(key)) {
      return { response: specs };
    }
  }

  if (msg.includes('spec') || msg.includes('detail') || msg.includes('kya hai') || msg.includes('batao')) {
    return { response: `**Available machines:**\n\nFBD, RMG, Auto Coater, Ointment Plant, Liquid Plant, Autoclave, V Blender, Ribbon Blender, Vibro Sifter, Multi Mill, Filter Press, RCVD, Tray Dryer, Sugar Tank, IBC Bin, Octagonal Blender, Octacone Blender, Double Cone, Mass Mixer, Zero Hold Up Filter\n\nExample: **"FBD specs"** ya **"autoclave detail"**` };
  }

  // ==================== FAQ COMMANDS ====================
  if (msg.includes('faq') || msg.includes('question')) {
    return { response: '❓ **FAQ manage karne ke liye:**\n\n1. Products page pe jao\n2. Kisi product ko Edit karo\n3. FAQ section mein questions aur answers dalo\n4. Save karo\n\n**Products page khol raha hoon...**', actions: ['Opening products page'] };
  }

  // ==================== SEO COMMANDS ====================
  if (msg.includes('seo') || msg.includes('google') || msg.includes('ranking')) {
    return { response: '📝 **SEO Tips:**\n\n1. Har product mein SEO title aur description dalo\n2. Descriptive product names use karo\n3. Photos mein alt text likho\n4. Description 150-160 chars rakho\n5. Keywords: "pharmaceutical", "GMP", "SS 316", capacity sizes\n\n**Products page pe har product mein SEO section hai.**' };
  }

  // ==================== WHAT CAN YOU DO ====================
  if (msg.includes('help') || msg.includes('kya kar') || msg.includes('madad') || msg === '?') {
    return { response: `🤖 **Main poora website control kar sakta hoon!**\n\n**🎨 Theme & Colors:**\n- "apply blue/green/purple/red/teal/orange/slate theme"\n- "dark mode on karo" / "light mode on karo"\n- "font poppins/roboto/montserrat lagao"\n- "border radius sharp/round karo"\n\n**🏢 Company Info:**\n- "company name [name] karo"\n- "phone [number] karo"\n- "email [email] karo"\n- "whatsapp [number] karo"\n- "GST [number] karo"\n- "address [address] karo"\n\n**📸 Photos & Images:**\n- "photo add karo" / "photo upload karo"\n- "photo edit karo" / "photo delete karo"\n- "logo upload karo"\n- "gallery photo add karo"\n- "product photo add karo"\n- "filter lagao" / "crop karo" / "resize karo"\n\n**📦 Products:**\n- "show products" — sab dikhao\n- "add product" — naya jodo\n- "delete [name]" — hatao\n- "product name [purana] se [naya] karo" — rename\n- "product description [product] change karo"\n\n**📄 Pages & Content:**\n- "hero title [naya title] karo"\n- "hero subtitle [subtitle] karo"\n- "homepage edit karo"\n- "about page edit karo"\n- "open page editor"\n\n**🔧 Machinery Specs:**\n- "FBD specs" / "RMG specs"\n- "auto coater specs" / "ointment plant specs"\n- "autoclave specs" / "V blender specs"\n- "liquid plant specs" / "sugar tank specs"\n- "vibro sifter specs" / "multi mill specs"\n\n**📊 Data:**\n- "analytics" / "kitne products hain"\n- "enquiries dikhao"\n\n**📄 Navigation:**\n- "open products/settings/theme/photo editor"\n- "website kholo"\n\n**🌐 Hindi mein bhi bol sakte ho!**` };
  }

  // ==================== GENERAL CONVERSATION ====================
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('hey') || msg.includes('hii')) {
    return { response: `Namaste! 🙏\n\nMain aapka AI Website Assistant hoon. Main poora website control kar sakta hoon — theme, products, photos, company info, pages, sab kuch!\n\n**"help"** bolo sab commands dekhne ke liye.` };
  }

  if (msg.includes('thank') || msg.includes('dhanyavad') || msg.includes('shukriya')) {
    return { response: `Aapka swagat hai! 🙏\n\nAur kuch change karna ho to bas bolo.` };
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('kimat')) {
    return { response: '💰 **Price ke liye:**\n\n1. Products page pe product select karo\n2. "Get Quote" button dabao\n3. Ya Contact page pe enquiry bhejo\n\nPrice capacity, MOC, configuration ke hisaab se hota hai.' };
  }

  // ==================== LAYOUT / DESIGN COMMANDS ====================
  if (msg.includes('layout') || msg.includes('design') || msg.includes('look') || msg.includes('dikhne') || msg.includes('sundar')) {
    return { response: '🎨 **Website layout improve karna:**\n\n1. **Theme:** "apply blue theme" ya "apply green theme"\n2. **Font:** "font poppins lagao"\n3. **Logo:** Site Settings mein upload karo\n4. **Photos:** Photo Editor mein edit karo\n5. **Colors:** Theme & Colors page pe customize karo\n\nKaunsa change karna hai?' };
  }

  // ==================== UNKNOWN ====================
  return { response: `Samajh nahi aaya: **"${input}"**\n\n**"help"** bolo sab commands dekhne ke liye.\n\nExample:\n- "apply blue theme"\n- "company name KHUSHBU PHARMA karo"\n- "show products"\n- "photo add karo"\n- "FBD specs"\n- "open settings"\n- "logo upload karo"\n- "hero title change karo"` };
}

const siteConfig = {
  name: 'KHUSHBU PHARMA MACHINERY',
};

export default function AdminAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Namaste! 🙏 Main aapka AI Website Assistant hoon.\n\nMujhe bolo aur main website change kar dunga:\n\n• **"apply blue theme"** → Colors change\n• **"company name KHUSHBU PHARMA karo"** → Company name\n• **"phone 9876543210 karo"** → Phone change\n• **"show products"** → Products dikhao\n• **"photo add karo"** → Photo upload\n• **"FBD specs"** → Machine details\n• **"hero title naya title karo"** → Homepage\n\n**"help"** bolo sab commands dekhne ke liye!`,
      timestamp: Date.now(),
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: Date.now() }]);
    setIsTyping(true);

    setTimeout(() => {
      const { response, actions } = processCommand(text);

      if (actions) {
        for (const action of actions) {
          if (action === 'Opening products page') {
            window.location.href = '/admin/products';
          } else if (action === 'Opening settings') {
            window.location.href = '/admin/settings';
          } else if (action === 'Opening theme page') {
            window.location.href = '/admin/theme';
          } else if (action === 'Opening page editor') {
            window.location.href = '/admin/pages';
          } else if (action === 'Opening enquiries') {
            window.location.href = '/admin/enquiries';
          } else if (action === 'Opening photo editor') {
            window.location.href = '/admin/photo-editor';
          } else if (action === 'Opening dashboard') {
            window.location.href = '/admin';
          } else if (action === 'Opening website') {
            window.open('/', '_blank');
          }
        }
      }

      logActivity(`AI: ${text.substring(0, 50)}`);
      setMessages(prev => [...prev, { role: 'assistant', content: response, actions, timestamp: Date.now() }]);
      setIsTyping(false);
    }, 200 + Math.random() * 300);
  }, [input, isTyping]);

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Voice input aapke browser mein support nahi karta. Chrome use karo.' }]);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  };

  const quickActions = [
    { label: '🎨 Blue Theme', cmd: 'apply blue theme' },
    { label: '🟢 Green Theme', cmd: 'apply green theme' },
    { label: '🟣 Purple Theme', cmd: 'apply purple theme' },
    { label: '🔴 Red Theme', cmd: 'apply red theme' },
    { label: '🌙 Dark Mode', cmd: 'dark mode on karo' },
    { label: '☀️ Light Mode', cmd: 'light mode on karo' },
    { label: '📦 Show Products', cmd: 'show products' },
    { label: '📸 Add Photo', cmd: 'photo add karo' },
    { label: '🖼️ Photo Edit', cmd: 'photo edit karo' },
    { label: '🏢 Upload Logo', cmd: 'logo upload karo' },
    { label: '📊 Analytics', cmd: 'analytics' },
    { label: '🔧 FBD Specs', cmd: 'FBD specs' },
    { label: '🤖 Auto Coater', cmd: 'auto coater specs' },
    { label: '🏭 Autoclave', cmd: 'autoclave specs' },
    { label: '⚙️ Open Settings', cmd: 'open settings' },
    { label: '❓ Help', cmd: 'help' },
  ];

  const categories = [
    {
      title: '📸 Photos & Images',
      items: ['photo add karo', 'photo edit karo', 'logo upload karo', 'gallery photo add karo', 'product photo add karo', 'filter lagao', 'crop karo'],
    },
    {
      title: '🎨 Theme & Design',
      items: ['apply blue theme', 'apply green theme', 'apply purple theme', 'dark mode on karo', 'font poppins lagao', 'border radius sharp karo'],
    },
    {
      title: '📦 Products',
      items: ['show products', 'add product', 'delete product', 'product name change karo'],
    },
    {
      title: '🔧 Machine Specs',
      items: ['FBD specs', 'RMG specs', 'auto coater specs', 'ointment plant specs', 'autoclave specs', 'V blender specs', 'liquid plant specs'],
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 6rem)' }}>
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-t-2xl px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-black shadow-lg">AI</div>
            <div>
              <h2 className="font-bold text-white text-lg">Website Control AI</h2>
              <p className="text-xs text-green-100 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300 inline-block animate-pulse" />
                Main poora website control kar sakta hoon
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSidebar(!showSidebar)} className="px-4 py-2 rounded-xl text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all">
              {showSidebar ? '✕ Close' : '📋 Commands'}
            </button>
            <button onClick={startVoice} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              {isListening ? '🔴 Listening...' : '🎤 Voice'}
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50 border-x border-gray-200">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white rounded-br-sm bg-gradient-to-r from-green-600 to-green-700 shadow-md' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}>
                    {msg.content}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        {msg.actions.map((a, j) => (
                          <span key={j} className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full mr-1">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0 bg-white border-t border-gray-100">
              {quickActions.map((a, i) => (
                <button key={i} onClick={() => setInput(a.cmd)} className="flex-shrink-0 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-green-50 hover:text-green-700 transition-colors font-medium">
                  {a.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Bolo ya type karo... (e.g., 'apply blue theme', 'photo add karo', 'FBD specs')"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                autoFocus
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-40 shadow-lg shadow-green-200">
                {isTyping ? '...' : 'Send'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
              <h3 className="font-bold text-gray-800 mb-4">📋 Quick Commands</h3>
              {categories.map((cat, ci) => (
                <div key={ci} className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{cat.title}</h4>
                  <div className="space-y-1">
                    {cat.items.map((item, ii) => (
                      <button key={ii} onClick={() => setInput(item)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
