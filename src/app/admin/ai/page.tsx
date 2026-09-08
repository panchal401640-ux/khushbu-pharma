'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  actions?: string[];
  timestamp?: number;
}

interface AIContext {
  products: Product[];
  enquiries: any[];
  theme: any;
  settings: any;
  pages: any;
  activityLog: string[];
}

const MACHINERY_KNOWLEDGE: Record<string, string[]> = {
  'dryer': ['Fluid Bed Dryer', 'Tray Dryer', 'Vacuum Tray Dryer', 'Rotocone Vacuum Dryer'],
  'blender': ['Octagonal Blender', 'Octacone Blender', 'Double Cone Blender', 'Ribbon Blender'],
  'granulator': ['Rapid Mixing Granulator', 'High Shear Granulator'],
  'mixer': ['Mass Mixer', 'Multi Mill'],
  'coating': ['Coating Pan', 'Film Coating', 'Sugar Coating'],
  'vessel': ['Storage Vessel', 'Manufacturing Vessel', 'Mixing Vessel', 'Reaction Vessel'],
  'filter': ['Zero Hold Up Filter', 'Filter Press', 'Vibro Sifter'],
  'mill': ['Multi Mill', 'Hammer Mill', 'Cone Mill'],
  'sieve': ['Vibro Sifter', 'Gyratory Sifter', 'Rotary Screen'],
};

const MACHINERY_SPECS: Record<string, string> = {
  'fbd': 'Fluid Bed Dryer: Used for drying granules, powders, pellets. Works on fluidization principle. Available in 5kg to 500kg capacity. Contact parts SS 316, body SS 304.',
  'rmg': 'Rapid Mixing Granulator: Wet granulation equipment. High-shear mixing for uniform granule formation. 10L to 600L working volume. SS 316 contact parts.',
  'octagonal': 'Octagonal Blender: Gentle blending of powders and granules. 50L to 5000L capacity. Slow rotation ensures minimal attrition. SS 304/316 construction.',
  'rcvd': 'Rotocone Vacuum Dyer: Vacuum drying with gentle handling. Suitable for heat-sensitive materials. 10L to 500L capacity. Jacketed for heating.',
  'coating pan': 'Pharmaceutical Coating Pan: Film, sugar, and enteric coating of tablets. 12" to 60" diameter. SS 316 contact parts with spray system.',
  'vibro sifter': 'Vibro Sifter: Screening, grading, and sifting. 12" to 48" diameter. Single to multi-deck. GMP compliant design.',
  'ribbon blender': 'Ribbon Blender: Efficient blending of dry powders, granules, pastes. 50L to 5000L. Double ribbon agitator for uniform mixing.',
  'multi mill': 'Multi Mill: Size reduction, grinding, mixing in single operation. Swinging beaters with scrapper. SS 316 contact parts.',
};

const THEME_PRESETS: Record<string, any> = {
  'green': { primaryColor: '#1e6b3a', secondaryColor: '#2d8a50', accentColor: '#f59e0b' },
  'blue': { primaryColor: '#1d4ed8', secondaryColor: '#2563eb', accentColor: '#f97316' },
  'purple': { primaryColor: '#7c3aed', secondaryColor: '#8b5cf6', accentColor: '#06b6d4' },
  'red': { primaryColor: '#dc2626', secondaryColor: '#ef4444', accentColor: '#fbbf24' },
  'teal': { primaryColor: '#0d9488', secondaryColor: '#14b8a6', accentColor: '#f43f5e' },
  'navy': { primaryColor: '#1e3a5f', secondaryColor: '#2563eb', accentColor: '#eab308' },
  'orange': { primaryColor: '#ea580c', secondaryColor: '#f97316', accentColor: '#8b5cf6' },
  'slate': { primaryColor: '#334155', secondaryColor: '#475569', accentColor: '#3b82f6' },
};

const HINDI_COMMANDS: Record<string, string> = {
  'theme badlo': 'change theme',
  'color badlo': 'change theme',
  'product dikhao': 'show products',
  'product jodo': 'add product',
  'product hatao': 'delete product',
  'enquiry dikhao': 'show enquiries',
  'setting kholo': 'open settings',
  'page edit karo': 'edit page',
  'banner badlo': 'change banner',
  'photo edit karo': 'edit photo',
  'kya kar sakte ho': 'what can you do',
  'madad': 'help',
  'help karo': 'help',
};

function getAIContext(): AIContext {
  let products = defaultProducts;
  let enquiries: any[] = [];
  let theme = {};
  let settings = {};
  let pages = {};
  let activityLog: string[] = [];

  try {
    const stored = localStorage.getItem('kpm_products');
    if (stored) products = JSON.parse(stored);
  } catch {}
  try {
    const stored = localStorage.getItem('kpm_enquiries');
    if (stored) enquiries = JSON.parse(stored);
  } catch {}
  try {
    const stored = localStorage.getItem('kpm_theme');
    if (stored) theme = JSON.parse(stored);
  } catch {}
  try {
    const stored = localStorage.getItem('kpm_settings');
    if (stored) settings = JSON.parse(stored);
  } catch {}
  try {
    const stored = localStorage.getItem('kpm_pages');
    if (stored) pages = JSON.parse(stored);
  } catch {}
  try {
    const stored = localStorage.getItem('kpm_activity_log');
    if (stored) activityLog = JSON.parse(stored);
  } catch {}

  return { products, enquiries, theme, settings, pages, activityLog };
}

function logActivity(action: string) {
  try {
    const stored = localStorage.getItem('kpm_activity_log');
    const logs = stored ? JSON.parse(stored) : [];
    logs.unshift(`[${new Date().toLocaleString()}] ${action}`);
    if (logs.length > 50) logs.pop();
    localStorage.setItem('kpm_activity_log', JSON.stringify(logs));
  } catch {}
}

function applyThemeToSite(t: Record<string, string>) {
  const styleId = 'kpm-dynamic-theme';
  let el = document.getElementById(styleId) as HTMLStyleElement;
  if (!el) { el = document.createElement('style'); el.id = styleId; document.head.appendChild(el); }
  el.textContent = `
    :root { --primary: ${t.primaryColor}; --primary-700: ${t.primaryColor}; --primary-800: ${t.secondaryColor}; --primary-600: ${t.primaryColor}; }
    .bg-primary-700 { background-color: ${t.primaryColor} !important; }
    .bg-primary-800 { background-color: ${t.secondaryColor} !important; }
    .bg-primary-600 { background-color: ${t.primaryColor} !important; }
    .text-primary-700 { color: ${t.primaryColor} !important; }
    .text-primary-600 { color: ${t.primaryColor} !important; }
    .border-primary-500 { border-color: ${t.primaryColor} !important; }
    .hover\\:bg-primary-800:hover { background-color: ${t.secondaryColor} !important; }
    .bg-primary-50 { background-color: ${t.primaryColor}0d !important; }
    .bg-primary-100 { background-color: ${t.primaryColor}1a !important; }
    .bg-industrial-900 { background-color: ${t.headerBg || '#171717'} !important; }
    footer.bg-industrial-900 { background-color: ${t.footerBg || '#171717'} !important; }
  `;
}

function processCommand(input: string, context: AIContext): { response: string; actions?: string[] } {
  const msg = input.toLowerCase().trim();

  // Hindi command translation
  let translated = msg;
  for (const [hindi, english] of Object.entries(HINDI_COMMANDS)) {
    if (msg.includes(hindi)) { translated = english; break; }
  }

  // === THEME COMMANDS ===
  for (const [name, colors] of Object.entries(THEME_PRESETS)) {
    if (translated.includes(name) || msg.includes(name)) {
      if (translated.includes('apply') || translated.includes('change') || translated.includes('use') || msg.includes('lagao') || msg.includes('karo')) {
        return {
          response: `${name.charAt(0).toUpperCase() + name.slice(1)} theme lagaya ja raha hai! Site ke colors change ho gaye.`,
          actions: [`Applied ${name} theme`],
        };
      }
    }
  }

  if (translated.includes('theme') || translated.includes('color') || translated.includes('colour')) {
    const available = Object.keys(THEME_PRESETS).join(', ');
    return {
      response: `Theme change karne ke liye bolo:\n\n"${available}" mein se koi bhi color bolo.\n\nExample: "apply blue theme" ya "green theme lagao"\n\nYa Theme & Colors page pe jao for full control.`,
    };
  }

  // === PRODUCT COMMANDS ===
  if (translated.includes('add product') || translated.includes('new product') || translated.includes('create product') || msg.includes('product jodo') || msg.includes('naya product')) {
    return {
      response: `Products page khol raha hoon - wahan "Add Product" button dabao.\n\nSteps:\n1. Product ki photo upload karo\n2. Naam, description likho\n3. Specifications dalo\n4. Features add karo\n5. Save karo`,
      actions: ['Opening products page'],
    };
  }

  const deleteMatch = msg.match(/delete (?:product |the )?(.+)/);
  if (deleteMatch || translated.includes('delete product') || translated.includes('remove product') || msg.includes('product hatao')) {
    const name = deleteMatch ? deleteMatch[1].trim() : '';
    if (name) {
      const found = context.products.find(p => p.name.toLowerCase().includes(name));
      if (found) {
        return {
          response: `"${found.name}" mila! Delete kar raha hoon...`,
          actions: [`Delete product: ${found.name}`],
        };
      } else {
        const similar = context.products.filter(p => p.name.toLowerCase().includes(name.split(' ')[0])).map(p => p.name);
        if (similar.length > 0) {
          return { response: `"${name}" nahi mila. Kya ye chahte ho?\n\n${similar.map(s => `- ${s}`).join('\n')}` };
        }
        return { response: `"${name}" naam ka product nahi mila.\n\nAvailable products:\n${context.products.slice(0, 8).map(p => `- ${p.name}`).join('\n')}` };
      }
    }
    return {
      response: `Delete karne ke liye product ka naam bolo:\n"delete fluid bed dryer"\n\nYa Products page pe jao aur Delete button dabao.`,
    };
  }

  if (translated.includes('product') && (translated.includes('list') || translated.includes('show') || translated.includes('view') || translated.includes('all') || msg.includes('dikhao'))) {
    const list = context.products.map((p, i) => `${i + 1}. ${p.name} (${p.category})`).join('\n');
    return {
      response: `Aapke ${context.products.length} products hain:\n\n${list}\n\nProducts page khol dun?`,
      actions: ['Showed product list'],
    };
  }

  // === MACHINERY KNOWLEDGE ===
  for (const [keyword, specs] of Object.entries(MACHINERY_SPECS)) {
    if (msg.includes(keyword)) {
      return { response: specs };
    }
  }

  for (const [category, products] of Object.entries(MACHINERY_KNOWLEDGE)) {
    if (msg.includes(category)) {
      return {
        response: `${category.charAt(0).toUpperCase() + category.slice(1)} category mein ye products hain:\n\n${products.map(p => `- ${p}`).join('\n')}\n\nKisi specific ke baare mein jaanna ho to naam bolo.`,
      };
    }
  }

  if (msg.includes('specification') || msg.includes('specs') || msg.includes('spec') || msg.includes('kya hai') || msg.includes('detail')) {
    return {
      response: `Kisi product ki specifications jaanna ho to uska naam bolo.\n\nExample:\n- "FBD specs" ya "fluid bed dryer specifications"\n- "RMG specs" ya "rapid mixing granulator detail"\n- "blender specs"\n\nMachinery ke baare mein bhi pooch sakte ho.`,
    };
  }

  // === ENQUIRY COMMANDS ===
  if (translated.includes('enquir') || translated.includes('leads') || translated.includes('contact form') || msg.includes('enquiry dikhao') || msg.includes('leads dikhao')) {
    return {
      response: `Enquiries page khol raha hoon...\n\nAapke paas ${context.enquiries.length} enquiries hain.\n${context.enquiries.filter(e => e.status === 'new').length} naye hain.`,
      actions: ['Opening enquiries page'],
    };
  }

  // === NAVIGATION COMMANDS ===
  if (translated.includes('edit page') || translated.includes('change page') || translated.includes('page content') || msg.includes('page edit karo')) {
    return {
      response: `Page Editor khol raha hoon - wahan kisi bhi page ka text change kar sakte ho.`,
      actions: ['Opening page editor'],
    };
  }

  if (translated.includes('open theme') || translated.includes('theme page') || msg.includes('theme page')) {
    return {
      response: `Theme & Colors page khol raha hoon.`,
      actions: ['Opening theme page'],
    };
  }

  if (translated.includes('setting') || translated.includes('phone') || translated.includes('email') || translated.includes('address') || translated.includes('gst') || msg.includes('setting kholo')) {
    return {
      response: `Site Settings khol raha hoon - company info, phone, email, address sab change kar sakte ho.`,
      actions: ['Opening settings'],
    };
  }

  if (translated.includes('dashboard') || translated.includes('home') || msg.includes('dashboard kholo')) {
    return {
      response: `Dashboard khol raha hoon.`,
      actions: ['Opening dashboard'],
    };
  }

  if (msg.includes('banner') || msg.includes('hero') || msg.includes('banner badlo')) {
    return {
      response: `Banner/Hero image change karne ke liye Page Editor mein "Homepage" select karo, phir "Hero Banner" section edit karo.\n\nTitle, subtitle, button text sab change kar sakte ho.`,
      actions: ['Opening page editor'],
    };
  }

  // === MEDIA COMMANDS ===
  if (msg.includes('photo') || msg.includes('image') || msg.includes('media') || msg.includes('gallery') || msg.includes('photo edit karo')) {
    return {
      response: `Photo manage karne ke liye:\n\n1. **Product Photos**: Products page → Edit → Photo upload\n2. **Gallery Page**: Page Editor → Gallery section\n3. **AI Photo Editor**: AI Photo Editor page pe filters, crop, text add kar sakte ho\n\nKaunsa page kholun?`,
    };
  }

  // === FAQ COMMANDS ===
  if (msg.includes('faq') || msg.includes('question') || msg.includes('answer')) {
    return {
      response: `FAQ manage karne ke liye:\n\n1. Products page pe kisi product ko Edit karo\n2. FAQ section mein questions aur answers dalo\n3. Save karo\n\nHar product ki alag FAQ ho sakti hai.`,
    };
  }

  // === SEO COMMANDS ===
  if (msg.includes('seo') || msg.includes('google') || msg.includes('ranking') || msg.includes('search engine')) {
    return {
      response: `SEO Tips for Pharma Machinery:\n\n1. **Product Names**: Descriptive rakho - "Fluid Bed Dryer 50kg" instead of "FBD"\n2. **SEO Title**: "Fluid Bed Dryer - Pharma Equipment | Khushbu Pharma"\n3. **Description**: 150-160 chars, include key specs\n4. **Alt Text**: Photos mein descriptive alt text dalo\n5. **Keywords**: "pharmaceutical", "GMP", "SS 316", capacity sizes\n\nProducts page pe har product mein SEO section hai.`,
    };
  }

  // === ANALYTICS COMMANDS ===
  if (msg.includes('analytics') || msg.includes('stats') || msg.includes('data') || msg.includes('report')) {
    const newEnquiries = context.enquiries.filter(e => e.status === 'new').length;
    const totalEnquiries = context.enquiries.length;
    const categories = [...new Set(context.products.map(p => p.category))];
    return {
      response: `📊 **Website Analytics:**\n\n**Products:** ${context.products.length} total\n${categories.map(c => `  - ${c}: ${context.products.filter(p => p.category === c).length}`).join('\n')}\n\n**Enquiries:** ${totalEnquiries} total\n  - New: ${newEnquiries}\n  - Contacted: ${context.enquiries.filter(e => e.status === 'contacted').length}\n  - Quoted: ${context.enquiries.filter(e => e.status === 'quoted').length}\n  - Closed: ${context.enquiries.filter(e => e.status === 'closed').length}\n\n**Recent Activity:** ${context.activityLog.length} logged actions`,
    };
  }

  // === HELP ===
  if (translated === 'help' || msg === '?' || translated.includes('what can') || msg.includes('kya kar sakte ho') || msg.includes('help karo') || msg.includes('madad')) {
    return {
      response: `🤖 **Main ye kar sakta hoon:**\n\n**🎨 Theme & Colors:**\n- "apply blue theme" (green/blue/purple/red/teal/navy/orange/slate)\n- "change theme"\n\n**📦 Products:**\n- "show products" - saare products dikhao\n- "delete [product name]" - product hatao\n- "add product" - naya product jodo\n- "[product name] specs" - specifications\n\n**🔧 Machinery Knowledge:**\n- "FBD specs" / "dryer detail"\n- "blender types"\n- "granulator specification"\n- "coating pan detail"\n\n**📄 Navigation:**\n- "open products" / "open settings"\n- "open theme page" / "open page editor"\n- "open enquiries" / "dashboard kholo"\n- "banner badlo"\n\n**📊 Data:**\n- "analytics" / "stats"\n- "enquiries dikhao"\n\n**🔍 Info:**\n- "SEO tips"\n- "FAQ help"\n- "photo edit karo"\n\n**🌐 Hindi mein bhi bol sakte ho!**`,
    };
  }

  // === GENERAL CONVERSATION ===
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('hey')) {
    return {
      response: `Namaste! 🙏\n\nMain aapka AI assistant hoon. Machinery, products, theme, ya website ke baare mein kuch bhi pooch sakte ho.\n\n"help" type karo sab commands dekhne ke liye.`,
    };
  }

  if (msg.includes('thank') || msg.includes('dhanyavad') || msg.includes('shukriya')) {
    return { response: `Aapka swagat hai! 🙏\n\nAur kuch help chahiye to batao.` };
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('kimat')) {
    return {
      response: `Price quotation ke liye:\n\n1. Products page pe product select karo\n2. "Get Quote" button dabao\n3. Ya directly Contact page pe enquiry bhejo\n\nPrice capacity, MOC, aur configuration ke hisaab se hota hai. Sales team aapko contact karegi.`,
    };
  }

  if (msg.includes('capacity') || msg.includes('size') || msg.includes('volume')) {
    return {
      response: `Capacity options available hain:\n\n**Dryers:** 5kg - 500kg batch\n**Blenders:** 50L - 5000L\n**Granulators:** 10L - 600L\n**Vessels:** 50L - 10000L\n**Coating Pan:** 12" - 60"\n**Sifters:** 12" - 48"\n\nCustom capacity bhi available hai. Specific product ki capacity jaanna ho to naam bolo.`,
    };
  }

  if (msg.includes('material') || msg.includes('ss 304') || msg.includes('ss 316') || msg.includes('ss 316l') || msg.includes('moc')) {
    return {
      response: `Material of Construction:\n\n**Contact Parts:**\n- SS 304 (standard)\n- SS 316 (pharma grade)\n- SS 316L (high purity)\n\n**Non-Contact Parts:**\n- SS 304\n- MS (mild steel)\n- SS cladding\n\n**Product Frame:**\n- SS 304\n- MS with paint\n\nGMP compliant designs available. Specific product ke liye MOC poochna ho to batao.`,
    };
  }

  // === UNKNOWN COMMANDS ===
  return {
    response: `Samajh nahi aaya: "${input}"\n\nTry karo:\n- "help" - sab commands dekho\n- "apply blue theme" - theme change\n- "show products" - products list\n- "FBD specs" - machinery info\n- "analytics" - website stats\n\nYa kuch bhi machinery ke baare mein pooch sakte ho! 🔧`,
  };
}

export default function AdminAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<AIContext>(getAIContext());
  const [showContext, setShowContext] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Namaste! 🙏 Main aapka AI Website Assistant hoon.\n\nMujhe machinery ka poora knowledge hai - FBD, RMG, Blenders, Coating, Vessels, Filters - sab kuch.\n\n**Kya kar sakte ho:**\n- Theme change karo\n- Products manage karo\n- Machinery specs pucho\n- Website analytics dekho\n- Pages edit karo\n\nKuch bhi poocho ya bolo! "help" type karo sab commands dekhne ke liye.`,
      timestamp: Date.now(),
    }]);
  }, []);

  useEffect(() => {
    setContext(getAIContext());
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const ctx = getAIContext();
      const { response, actions } = processCommand(text, ctx);

      // Execute actions
      if (actions) {
        for (const action of actions) {
          if (action.startsWith('Applied')) {
            const themeName = action.replace('Applied ', '').replace(' theme', '');
            const colors = THEME_PRESETS[themeName];
            if (colors) {
              const fullTheme = { ...colors, headerBg: '#171717', footerBg: '#171717', bodyBg: '#f5f5f4', textColor: '#1c1917', headingFont: 'Inter, sans-serif', bodyFont: 'Inter, sans-serif', borderRadius: '8px' };
              localStorage.setItem('kpm_theme', JSON.stringify(fullTheme));
              applyThemeToSite(fullTheme);
              logActivity(`Theme changed to ${themeName}`);
            }
          } else if (action.startsWith('Delete product:')) {
            const productName = action.replace('Delete product: ', '');
            try {
              const stored = localStorage.getItem('kpm_products');
              if (stored) {
                const products = JSON.parse(stored);
                const found = products.find((p: Product) => p.name === productName);
                if (found && confirm(`Delete "${found.name}"?`)) {
                  const updated = products.filter((p: Product) => p.id !== found.id);
                  localStorage.setItem('kpm_products', JSON.stringify(updated));
                  logActivity(`Deleted product: ${found.name}`);
                  setContext(getAIContext());
                }
              }
            } catch {}
          } else if (action === 'Opening products page') {
            window.location.href = '/admin/products';
          } else if (action === 'Opening enquiries page') {
            window.location.href = '/admin/enquiries';
          } else if (action === 'Opening page editor') {
            window.location.href = '/admin/pages';
          } else if (action === 'Opening theme page') {
            window.location.href = '/admin/theme';
          } else if (action === 'Opening settings') {
            window.location.href = '/admin/settings';
          } else if (action === 'Opening dashboard') {
            window.location.href = '/admin';
          }
        }
      }

      const assistantMsg: Message = { role: 'assistant', content: response, actions, timestamp: Date.now() };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      logActivity(`AI: ${text.substring(0, 50)}`);
    }, 400 + Math.random() * 400);
  }, [input, isTyping]);

  const quickActions = [
    'help',
    'show products',
    'apply blue theme',
    'apply green theme',
    'FBD specs',
    'blender types',
    'analytics',
    'SEO tips',
    'enquiries dikhao',
    'open settings',
  ];

  const productSuggestions = context.products.slice(0, 6).map(p => `${p.name} specs`);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Header */}
        <div className="bg-white rounded-t-xl border border-b-0 border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">AI</div>
            <div>
              <h2 className="font-semibold text-gray-900">Machinery AI Assistant</h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                Online — {context.products.length} products loaded • Hindi/English
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowContext(!showContext)}
            className="px-3 py-1.5 text-xs bg-industrial-100 text-industrial-700 rounded-lg hover:bg-industrial-200 transition-colors"
          >
            {showContext ? 'Hide' : 'Show'} Context
          </button>
        </div>

        {/* Context Panel */}
        {showContext && (
          <div className="bg-gray-50 border-x border-gray-200 px-6 py-3 flex-shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <p className="text-gray-500">Products</p>
                <p className="font-bold text-gray-900">{context.products.length}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <p className="text-gray-500">Enquiries</p>
                <p className="font-bold text-gray-900">{context.enquiries.length}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <p className="text-gray-500">Categories</p>
                <p className="font-bold text-gray-900">{[...new Set(context.products.map(p => p.category))].length}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <p className="text-gray-500">Activity</p>
                <p className="font-bold text-gray-900">{context.activityLog.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 border-x border-gray-200 p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}
                style={msg.role === 'user' ? { backgroundColor: '#1e6b3a' } : {}}>
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
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-x border-gray-200 px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setInput(a)} className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors">
              {a}
            </button>
          ))}
        </div>

        {/* Product Suggestions */}
        <div className="bg-white border-x border-gray-200 px-3 py-1.5 flex gap-1.5 overflow-x-auto flex-shrink-0 border-t border-gray-100">
          <span className="text-[10px] text-gray-400 self-center mr-1">Products:</span>
          {productSuggestions.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} className="flex-shrink-0 px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-[10px] hover:bg-primary-100 transition-colors">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="bg-white rounded-b-xl border border-t-0 border-gray-200 px-4 py-3 flex gap-2 flex-shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type in English or Hindi... (e.g., 'apply blue theme', 'FBD specs', 'product dikhao')"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors disabled:opacity-40">
            Send
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
