'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import {
  MACHINERY_KNOWLEDGE,
  MACHINE_CATEGORIES,
  AUTOMATION_LEVELS,
  generateImageSuggestions,
  getMaterialComparison,
  getGMPInfo,
  getCostBreakdown,
  MATERIAL_GUIDE,
  MachineryData,
} from './knowledge';
import {
  Bot,
  Send,
  Calculator,
  Plus,
  Edit3,
  Image,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Wrench,
  DollarSign,
  Info,
  Scale,
  FlaskConical,
  FileText,
  ArrowRight,
  X,
  Save,
  Layers,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

function getProducts(): Product[] {
  try {
    const s = localStorage.getItem('kpm_products');
    if (s) return JSON.parse(s);
  } catch {}
  return defaultProducts;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function processMessage(input: string): string {
  const msg = input.toLowerCase().trim();

  if (msg.match(/^(hi|hello|hey|namaste|hii|good morning|good evening)/)) {
    return `Hello! I'm **DHRUV**, your AI assistant for Khushbu Pharma Machinery.\n\nI can help you with:\n\n🏭 **Machinery Info** - Specs, pricing, applications for 25+ machines\n💰 **Cost Calculator** - Detailed cost breakdowns\n📸 **Photo Suggestions** - Auto-generated image URLs\n⚖️ **Machine Comparison** - Compare any two machines\n🛡️ **GMP Guide** - Compliance requirements\n🧪 **Material Guide** - SS304 vs SS316 vs SS316L\n📝 **Content Generation** - Product descriptions & SEO\n➕ **Product Management** - Add, edit, delete products\n\nHow can I assist you today?`;
  }

  // Material guide
  if (msg.includes('material') || msg.includes('ss304') || msg.includes('ss316') || msg.includes('ss316l') || msg.includes('stainless steel') || msg.includes('moc') || msg.includes('material selection')) {
    return getMaterialComparison();
  }

  // GMP guide
  if (msg.includes('gmp') || msg.includes('compliance') || msg.includes('validation') || msg.includes('who gmp') || msg.includes('fda') || msg.includes('schedule m')) {
    return getGMPInfo();
  }

  // Cost calculator
  if (msg.includes('calculate') || msg.includes('cost') || msg.includes('price') || msg.includes('rate') || msg.includes('quotation') || msg.includes('estimate')) {
    const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
    let found = '';
    for (const key of machineTypes) {
      if (msg.includes(key) || msg.includes(MACHINERY_KNOWLEDGE[key].name.toLowerCase())) {
        found = key;
        break;
      }
    }

    if (found) {
      return getCostBreakdown(found, { material: 'ss316', automation: 'manual', capacity: 'standard' }) +
        `\n\n**For a custom quote, specify:**\n- Material: SS304 / SS316 / SS316L\n- Automation: Manual / Semi-Auto / Fully Auto\n- Capacity: Standard / Premium / Custom\n\nExample: *"Calculate cost for FBD with SS316L and full automation"*`;
    }

    return `**Cost Calculator**\n\nI can calculate costs for all ${Object.keys(MACHINERY_KNOWLEDGE).length} machines.\n\n**Available Machines:**\n` +
      Object.values(MACHINERY_KNOWLEDGE).map((m) => `• ${m.name} (${m.priceRange.standard})`).join('\n') +
      `\n\nAsk: **"Calculate cost for [machine name]"**`;
  }

  // Machine information
  const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
  for (const key of machineTypes) {
    const machine = MACHINERY_KNOWLEDGE[key];
    if (
      msg.includes(key) ||
      msg.includes(machine.name.toLowerCase()) ||
      msg.includes(machine.name.toLowerCase().replace(/[()]/g, ''))
    ) {
      let response = `**${machine.name}**\n\n`;
      response += `**Category:** ${machine.category}\n`;
      response += `**Capacity Range:** ${machine.capacityRange}\n`;
      response += `**Power Requirements:** ${machine.powerRequirements}\n`;
      response += `**Dimensions:** ${machine.dimensions}\n`;
      response += `**Weight Range:** ${machine.weight}\n\n`;

      response += `**Price Ranges:**\n`;
      response += `• Standard: ${machine.priceRange.standard}\n`;
      response += `• Premium: ${machine.priceRange.premium}\n`;
      response += `• Custom: ${machine.priceRange.custom}\n\n`;

      response += `**Material Options:**\n`;
      response += `• SS304: ${machine.materialOptions.ss304}\n`;
      response += `• SS316: ${machine.materialOptions.ss316}\n`;
      response += `• SS316L: ${machine.materialOptions.ss316l}\n\n`;

      response += `**Applications:**\n`;
      machine.applications.forEach((app) => (response += `• ${app}\n`));
      response += `\n`;

      response += `**Key Features:**\n`;
      machine.features.forEach((feat) => (response += `• ${feat}\n`));
      response += `\n`;

      response += `**GMP Compliance:** ${machine.gmpCompliance}\n\n`;
      response += `**Maintenance:** ${machine.maintenanceRequirements}\n\n`;

      response += `**📸 Photo URLs:**\n`;
      machine.suggestedImages.slice(0, 2).forEach((url, i) => {
        response += `• Image ${i + 1}: ${url}\n`;
      });
      response += `\n`;

      response += `Would you like:\n• *"Calculate cost for ${machine.name}"*\n• *"Suggest images for ${machine.name}"*\n• *"Generate content for ${machine.name}"*\n• *"Compare ${machine.name} with..."*`;
      return response;
    }
  }

  // Product management - ADD
  if (msg.includes('add product') || msg.includes('new product') || msg.includes('create product')) {
    const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
    let found = '';
    for (const key of machineTypes) {
      if (msg.includes(key) || msg.includes(MACHINERY_KNOWLEDGE[key].name.toLowerCase())) {
        found = key;
        break;
      }
    }

    if (found) {
      const m = MACHINERY_KNOWLEDGE[found];
      let response = `**Adding Product: ${m.name}**\n\n`;
      response += `Here's a ready-to-use product template:\n\n`;
      response += `**Name:** ${m.name}\n`;
      response += `**Category:** ${m.category}\n`;
      response += `**Short Description:** ${m.name} from Khushbu Pharma Machinery designed for ${m.applications[0].toLowerCase()}. Capacity: ${m.capacityRange}.\n`;
      response += `**Capacity:** ${m.capacityRange}\n`;
      response += `**MOC:** SS 304 / SS 316 / SS 316L\n`;
      response += `**Contact Parts:** ${m.materialOptions.ss316l}\n`;
      response += `**Non-Contact Parts:** ${m.materialOptions.ss304}\n`;
      response += `**Power:** ${m.powerRequirements}\n`;
      response += `**Dimensions:** ${m.dimensions}\n`;
      response += `**Features:** ${m.features.join(', ')}\n`;
      response += `**Applications:** ${m.applications.join(', ')}\n`;
      response += `**Industries:** Pharmaceutical, Chemical, Food\n`;
      response += `**Price Range:** ${m.priceRange.standard}\n\n`;
      response += `**📸 Auto-Generated Images:**\n`;
      m.suggestedImages.forEach((url, i) => {
        response += `• ${url}\n`;
      });
      response += `\nTo add this product:\n1. Go to **Products** page → **+ Add Product**\n2. Copy the details above\n3. Paste and save`;
      return response;
    }

    return `**Adding a New Product**\n\nTo add a new product:\n1. Go to **Products** page\n2. Click **+ Add Product** button\n3. Fill in the details\n4. Click **Save**\n\nI can generate a product template! Just say:\n*"Add product for FBD"* or *"Create product for Ribbon Blender"*`;
  }

  // Product management - EDIT
  if (msg.includes('edit product') || msg.includes('update product')) {
    return `**Editing Products**\n\nTo edit a product:\n1. Go to **Products** page\n2. Find the product in the list\n3. Click **Edit** button\n4. Make your changes\n5. Click **Save Changes**\n\nYou can update name, description, specifications, images, and SEO details.`;
  }

  // Product management - DELETE
  if (msg.includes('delete product') || msg.includes('remove product')) {
    return `**Deleting Products**\n\nTo delete a product:\n1. Go to **Products** page\n2. Find the product in the list\n3. Click **Delete** button\n4. Confirm the deletion\n\n*This action cannot be undone.*`;
  }

  // Content generation
  if (msg.includes('generate content') || msg.includes('write description') || msg.includes('create content') || msg.includes('seo')) {
    const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
    let found = '';
    for (const key of machineTypes) {
      if (msg.includes(key) || msg.includes(MACHINERY_KNOWLEDGE[key].name.toLowerCase())) {
        found = key;
        break;
      }
    }

    if (found) {
      const machine = MACHINERY_KNOWLEDGE[found];
      let content = `**Generated Content for ${machine.name}**\n\n`;
      content += `**Product Title:**\n${machine.name} Manufacturer | Khushbu Pharma Machinery\n\n`;
      content += `**Meta Description:**\nKhushbu Pharma Machinery manufactures ${machine.name} for pharmaceutical, chemical, and food industries. Available in ${machine.capacityRange} capacity with ${machine.materialOptions.ss316l} contact parts.\n\n`;
      content += `**Short Description:**\n${machine.name} from Khushbu Pharma Machinery is designed for efficient processing in pharmaceutical, chemical, and food industries. ${machine.features[0]}.\n\n`;
      content += `**Full Description:**\nThe ${machine.name} from Khushbu Pharma Machinery is engineered to meet the demanding requirements of modern pharmaceutical manufacturing. Featuring ${machine.features.slice(0, 3).join(', ')}, this equipment delivers consistent performance and reliable operation.\n\n`;
      content += `**Key Specifications:**\n• Capacity: ${machine.capacityRange}\n• Material: ${machine.materialOptions.ss316l}\n• Power: ${machine.powerRequirements}\n• Dimensions: ${machine.dimensions}\n• GMP Compliant: Yes\n\n`;
      content += `**SEO Keywords:**\n${machine.name}, pharmaceutical ${machine.name.toLowerCase()}, ${machine.name.toLowerCase()} manufacturer, ${machine.category.toLowerCase()} equipment, pharma machinery\n\n`;
      content += `Would you like me to save this content? Go to **Products** page and edit the product.`;
      return content;
    }

    return `**Content Generation**\n\nI can generate product descriptions, meta titles, and SEO content for any machine.\n\nExample: *"Generate content for FBD"* or *"Write description for Ribbon Blender"*`;
  }

  // Image suggestions
  if (msg.includes('suggest image') || msg.includes('image url') || msg.includes('product image') || msg.includes('photo') || msg.includes('image')) {
    const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
    let found = '';
    for (const key of machineTypes) {
      if (msg.includes(key) || msg.includes(MACHINERY_KNOWLEDGE[key].name.toLowerCase())) {
        found = key;
        break;
      }
    }

    if (found) {
      const machine = MACHINERY_KNOWLEDGE[found];
      let response = `**Image Suggestions for ${machine.name}**\n\n`;
      response += `**Auto-Generated Image URLs:**\n\n`;
      machine.suggestedImages.forEach((url, i) => {
        response += `${i + 1}. ${url}\n`;
      });
      response += `\n**Recommended File Names:**\n`;
      const slug = found.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      response += `• ${slug}.jpg (main image)\n`;
      response += `• ${slug}-side.jpg (side view)\n`;
      response += `• ${slug}-detail.jpg (detail view)\n`;
      response += `• ${slug}-installation.jpg (installation view)\n\n`;
      response += `**Image Guidelines:**\n`;
      response += `• Resolution: 1200x800 pixels minimum\n`;
      response += `• Format: JPG or WebP\n`;
      response += `• Background: Clean, professional\n`;
      response += `• Lighting: Well-lit, no harsh shadows\n\n`;
      response += `**Image Keywords for Stock Photos:**\n`;
      machine.imageKeywords.forEach((kw) => (response += `• ${kw}\n`));
      response += `\nGo to **Products** page → Edit product → Upload images`;
      return response;
    }

    return `**Image Suggestions**\n\nI can suggest image URLs and naming conventions for products.\n\nExample: *"Suggest images for FBD"* or *"Image URLs for Ribbon Blender"*`;
  }

  // Compare machines
  if (msg.includes('compare') || msg.includes('difference') || msg.includes('vs') || msg.includes('versus')) {
    const machineTypes = Object.keys(MACHINERY_KNOWLEDGE);
    const found: string[] = [];
    for (const key of machineTypes) {
      if (msg.includes(key) || msg.includes(MACHINERY_KNOWLEDGE[key].name.toLowerCase())) {
        found.push(key);
      }
    }

    if (found.length >= 2) {
      const m1 = MACHINERY_KNOWLEDGE[found[0]];
      const m2 = MACHINERY_KNOWLEDGE[found[1]];
      let response = `**Comparison: ${m1.name} vs ${m2.name}**\n\n`;
      response += `| Feature | ${m1.name} | ${m2.name} |\n`;
      response += `|---------|----------|----------|\n`;
      response += `| Category | ${m1.category} | ${m2.category} |\n`;
      response += `| Capacity | ${m1.capacityRange} | ${m2.capacityRange} |\n`;
      response += `| Price (Standard) | ${m1.priceRange.standard} | ${m2.priceRange.standard} |\n`;
      response += `| Power | ${m1.powerRequirements} | ${m2.powerRequirements} |\n`;
      response += `| Weight | ${m1.weight} | ${m2.weight} |\n`;
      response += `| Dimensions | ${m1.dimensions} | ${m2.dimensions} |\n\n`;
      response += `**When to choose ${m1.name}:**\n`;
      response += `• Best for: ${m1.applications[0]}\n`;
      response += `• Key advantage: ${m1.features[0]}\n\n`;
      response += `**When to choose ${m2.name}:**\n`;
      response += `• Best for: ${m2.applications[0]}\n`;
      response += `• Key advantage: ${m2.features[0]}`;
      return response;
    }

    return `**Machine Comparison**\n\nI can compare any two machines. Example:\n• *"Compare FBD and RMG"*\n• *"Difference between Octagonal and Ribbon Blender"*\n• *"V-Blender vs Double Cone"*`;
  }

  // List all machines
  if (msg.includes('list') || msg.includes('all machine') || msg.includes('available') || msg.includes('catalogue') || msg.includes('catalog')) {
    let response = `**Complete Machinery Catalogue (${Object.keys(MACHINERY_KNOWLEDGE).length} Machines)**\n\n`;
    const categories = [...new Set(Object.values(MACHINERY_KNOWLEDGE).map((m) => m.category))];
    for (const cat of categories) {
      response += `**${cat}:**\n`;
      Object.values(MACHINERY_KNOWLEDGE)
        .filter((m) => m.category === cat)
        .forEach((m) => {
          response += `• ${m.name} (${m.capacityRange}) - ${m.priceRange.standard}\n`;
        });
      response += `\n`;
    }
    response += `Ask about any machine for detailed specs!`;
    return response;
  }

  // Recommendation
  if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('which') || msg.includes('best')) {
    if (msg.includes('tablet') || msg.includes('tablet manufacturing')) {
      return `**Recommended Setup for Tablet Manufacturing:**\n\n1. **Rapid Mixing Granulator (RMG)** - For wet granulation\n2. **Fluid Bed Dryer (FBD)** - For drying granules\n3. **Octagonal/Ribbon Blender** - For dry mixing\n4. **Tablet Press Machine** - For compression\n5. **Coating Pan** - For film/sugar coating\n6. **Vibro Sifter** - For screening\n\n**Estimated Investment:** ₹25,00,000 - ₹1,50,00,000\n(depending on capacity and automation level)\n\nWould you like detailed specs for any of these?`;
    }
    if (msg.includes('liquid') || msg.includes('syrup')) {
      return `**Recommended Setup for Liquid/Syrup Manufacturing:**\n\n1. **Mixing Vessel** - For mixing ingredients\n2. **Manufacturing Vessel** - For processing\n3. **Storage Vessel** - For storage\n4. **Zero Hold Up Filter** - For filtration\n5. **CIP System** - For cleaning\n\n**Estimated Investment:** ₹10,00,000 - ₹50,00,000\n\nWould you like detailed specs?`;
    }
    if (msg.includes('capsule')) {
      return `**Recommended Setup for Capsule Manufacturing:**\n\n1. **Capsule Filling Machine** - For filling\n2. **Multi Mill** - For size reduction\n3. **Vibro Sifter** - For ingredient screening\n4. **Mass Mixer** - For powder blending\n\n**Estimated Investment:** ₹8,00,000 - ₹40,00,000\n\nWould you like detailed specs?`;
    }
    return `**How to Choose the Right Machine:**\n\nTell me about your requirements:\n1. **What product** are you manufacturing?\n2. **What capacity** do you need?\n3. **What material** preference? (SS304/SS316/SS316L)\n4. **Budget range?**\n5. **Automation level?**\n\nI'll recommend the best equipment for your needs!\n\nOr ask: *"Recommend setup for tablet/liquid/capsule manufacturing"*`;
  }

  // Maintenance
  if (msg.includes('maintenance') || msg.includes('service') || msg.includes('spare')) {
    return `**Maintenance Guidelines**\n\n**Preventive Maintenance Schedule:**\n\n**Daily:**\n• Visual inspection\n• Check lubrication levels\n• Clean equipment\n• Check safety devices\n\n**Weekly:**\n• Check belt tension\n• Inspect seals and gaskets\n• Check electrical connections\n• Calibrate instruments\n\n**Monthly:**\n• Grease bearings\n• Check alignment\n• Inspect wear parts\n• Test safety interlocks\n\n**Quarterly:**\n• Major inspection\n• Replace consumables\n• Performance verification\n• Documentation review\n\n**Spare Parts Available:**\n• Seals and gaskets\n• Bearings\n• Filters\n• Drive components\n• Control panels\n\nContact us for maintenance contracts and spare parts supply.`;
  }

  // Help
  if (msg.includes('help') || msg.includes('what can') || msg.includes('command') || msg === '?') {
    return `**DHRUV AI Assistant - Complete Help Guide**\n\n**Machinery Information (25+ machines):**\n• Ask about any machine: "Tell me about FBD"\n• List all machines: "List all machines"\n• Compare machines: "Compare FBD and RMG"\n\n**Cost Calculator:**\n• "Calculate cost for Ribbon Blender"\n• "Price for Tablet Press"\n\n**Content Generation:**\n• "Generate content for FBD"\n• "Write description for Coating Pan"\n\n**Image Suggestions:**\n• "Suggest images for Octagonal Blender"\n• "Image URLs for Tray Dryer"\n\n**Recommendations:**\n• "Recommend setup for tablet manufacturing"\n• "Best machine for pharmaceutical"\n\n**Material Guide:**\n• "Material comparison SS304 vs SS316"\n• "SS316L properties"\n\n**GMP Compliance:**\n• "GMP compliance information"\n• "WHO GMP standards"\n\n**Product Management:**\n• "Add product for FBD"\n• "Edit product"\n• "Delete product"\n\n**Other:**\n• "Maintenance guidelines"\n• "Compare [machine A] and [machine B]"`;
  }

  // Default
  return `I'm DHRUV, your AI assistant for pharmaceutical machinery. I can help you with:\n\n• **Machinery Info:** Ask about FBD, RMG, Blenders, Dryers, Mills, and ${Object.keys(MACHINERY_KNOWLEDGE).length - 5}+ more machines\n• **Cost Calculator:** Get detailed price estimates\n• **Photo Suggestions:** Auto-generated image URLs for products\n• **Machine Comparison:** Compare any two machines\n• **Material Guide:** SS304 vs SS316 vs SS316L\n• **GMP Guide:** Compliance requirements\n• **Recommendations:** Equipment suggestions\n\nTry asking:\n• *"Tell me about FBD"*\n• *"Calculate cost for Ribbon Blender"*\n• *"Recommend setup for tablet manufacturing"*\n• *"List all machines"*\n• *"Compare FBD and RMG"*\n\nType **"help"** for the complete guide.`;
}

export default function AdminDhruvPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: `Hello! I'm **DHRUV**, your AI assistant for Khushbu Pharma Machinery.\n\nI have complete knowledge of all our pharmaceutical machinery including:\n\n🏭 **Machinery:** ${Object.keys(MACHINERY_KNOWLEDGE).length} machines with full specs\n💰 **Pricing:** Cost estimates for different configurations\n📸 **Photos:** Auto-generated image URLs for products\n⚖️ **Comparison:** Compare different machines\n🛡️ **GMP:** Compliance guide and standards\n🧪 **Materials:** SS304 vs SS316 vs SS316L guide\n📝 **Content:** Generate product descriptions\n➕ **Products:** Add/edit/delete products\n\nHow can I assist you today?`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput('');

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = processMessage(text);
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  }, [input, isTyping]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickActions = [
    { label: 'List All Machines', icon: <Wrench className="w-3.5 h-3.5" />, cmd: 'List all machines' },
    { label: 'Calculate Cost', icon: <Calculator className="w-3.5 h-3.5" />, cmd: 'Calculate cost for' },
    { label: 'Add Product', icon: <Plus className="w-3.5 h-3.5" />, cmd: 'Add product for' },
    { label: 'Compare Machines', icon: <Scale className="w-3.5 h-3.5" />, cmd: 'Compare' },
    { label: 'Material Guide', icon: <FlaskConical className="w-3.5 h-3.5" />, cmd: 'Material comparison SS304 vs SS316 vs SS316L' },
    { label: 'GMP Guide', icon: <FileText className="w-3.5 h-3.5" />, cmd: 'GMP compliance information' },
    { label: 'Generate Content', icon: <Edit3 className="w-3.5 h-3.5" />, cmd: 'Generate content for' },
    { label: 'Suggest Images', icon: <Image className="w-3.5 h-3.5" />, cmd: 'Suggest images for' },
    { label: 'Help', icon: <Sparkles className="w-3.5 h-3.5" />, cmd: 'help' },
  ];

  const machineSuggestions = [
    'Fluid Bed Dryer',
    'Rapid Mixing Granulator',
    'Octagonal Blender',
    'Ribbon Blender',
    'Tablet Press Machine',
    'Coating Pan',
    'Capsule Filling',
    'Vibro Sifter',
  ];

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">DHRUV AI Assistant</h2>
              <p className="text-xs text-blue-100 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300 inline-block animate-pulse" />
                {Object.keys(MACHINERY_KNOWLEDGE).length} Machines | Pharma Expert
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm shadow-md'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                }`}
              >
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>'),
                  }}
                />
                {msg.role === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 bg-white border-t border-slate-100">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => setInput(action.cmd)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>

        {/* Machine Suggestions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 bg-white border-t border-slate-100">
          <span className="flex-shrink-0 text-xs text-slate-400 self-center mr-1">Machines:</span>
          {machineSuggestions.map((machine, i) => (
            <button
              key={i}
              onClick={() => setInput(`Tell me about ${machine}`)}
              className="flex-shrink-0 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors font-medium"
            >
              {machine}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="bg-white border-t border-slate-200 px-4 py-3 flex gap-2 flex-shrink-0"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about machinery, pricing, specifications, materials, GMP..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-40 shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
