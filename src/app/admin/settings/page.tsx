'use client';

import React, { useState } from 'react';
import { AdminLayout } from '../AdminLayout';
import { siteConfig } from '@/lib/config';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    name: siteConfig.name,
    phone: siteConfig.phone,
    phone2: siteConfig.phone2 || '',
    whatsapp: siteConfig.whatsapp,
    email: siteConfig.email,
    gst: siteConfig.gst || '',
    address: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state}, ${siteConfig.address.country} - ${siteConfig.address.pincode}`,
    weekdays: siteConfig.businessHours.weekdays,
    saturday: siteConfig.businessHours.saturday,
    sunday: siteConfig.businessHours.sunday,
  });

  const handleSave = () => {
    localStorage.setItem('kpm_settings', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        {saved && (
          <div className="rounded-industrial bg-green-50 border border-green-200 p-4 text-sm text-green-700">
            Settings saved successfully!
          </div>
        )}

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Company Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Company Name</label>
              <input value={config.name} onChange={e => setConfig({...config, name: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-industrial-700 mb-1">Primary Phone</label>
                <input value={config.phone} onChange={e => setConfig({...config, phone: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-industrial-700 mb-1">Secondary Phone</label>
                <input value={config.phone2} onChange={e => setConfig({...config, phone2: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-industrial-700 mb-1">WhatsApp Number</label>
                <input value={config.whatsapp} onChange={e => setConfig({...config, whatsapp: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-industrial-700 mb-1">Email</label>
                <input value={config.email} onChange={e => setConfig({...config, email: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-industrial-700 mb-1">GST Number</label>
                <input value={config.gst} onChange={e => setConfig({...config, gst: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Address</label>
              <textarea value={config.address} onChange={e => setConfig({...config, address: e.target.value})} rows={3} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Business Hours</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Weekdays</label>
              <input value={config.weekdays} onChange={e => setConfig({...config, weekdays: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Saturday</label>
              <input value={config.saturday} onChange={e => setConfig({...config, saturday: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Sunday</label>
              <input value={config.sunday} onChange={e => setConfig({...config, sunday: e.target.value})} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Admin Password</h3>
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-1">Current Password</label>
            <p className="text-sm text-industrial-500">Default: khushbu2024</p>
            <p className="text-xs text-industrial-400 mt-1">To change admin password, update the ADMIN_PASSWORD constant in /admin/AdminLayout.tsx</p>
          </div>
        </div>

        <button onClick={handleSave} className="px-6 py-3 bg-primary-700 text-white rounded-industrial text-sm font-medium hover:bg-primary-800 transition-colors">
          Save Settings
        </button>
        <p className="text-xs text-industrial-400">Note: Settings saved here use localStorage. For permanent changes, update /src/lib/config.ts and redeploy.</p>
      </div>
    </AdminLayout>
  );
}
