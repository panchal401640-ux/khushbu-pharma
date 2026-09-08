'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../AdminLayout';
import {
  Settings,
  Lock,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  Check,
  Download,
  Upload,
  AlertTriangle,
  Eye,
  EyeOff,
  Cloud,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';
import { getConfig, saveConfig, isConfigured, type CloudinaryConfig } from '@/lib/cloudinary';

interface SiteSettings {
  siteName: string;
  phone: string;
  phone2: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  website: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
  gst: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'KHUSHBU PHARMA MACHINERY',
  phone: '+91 9328030074',
  phone2: '+91 8849936218',
  email: 'khushbupharma.sales@gmail.com',
  whatsapp: '919328030074',
  address: 'Opp. Ramvadi Bridge, B/H Metrix Plaza, Shed No -9, 26, Gajanan Industrial Hub - 2',
  city: 'Ahmedabad',
  state: 'Gujarat',
  country: 'India',
  pincode: '382445',
  website: 'https://khushbupharmamachinery.com',
  linkedin: 'https://linkedin.com/company/khushbu-pharma-machinery',
  facebook: '',
  twitter: '',
  youtube: 'https://youtube.com/@khushbupharmamachinery',
  instagram: '',
  gst: '24CBPP7842P1ZY',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [cloudinary, setCloudinary] = useState<CloudinaryConfig>({
    cloudName: '',
    uploadPreset: '',
    apiKey: '',
  });
  const [cloudinarySaved, setCloudinarySaved] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showCloudinaryGuide, setShowCloudinaryGuide] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_settings');
      if (stored) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {}
    setCloudinary(getConfig());
  }, []);

  const handleSave = () => {
    localStorage.setItem('kpm_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    setPasswordMsg('');
    setPasswordError('');

    if (password !== 'khushbu@2024') {
      setPasswordError('Current password is incorrect');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    localStorage.setItem('kpm_admin_password', newPassword);
    setPasswordMsg('Password changed successfully! Use the new password for next login.');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExport = () => {
    const data = {
      settings,
      products: localStorage.getItem('kpm_products'),
      pages: localStorage.getItem('kpm_pages'),
      photos: localStorage.getItem('kpm_photos'),
      gallery: localStorage.getItem('kpm_gallery_items'),
      enquiries: localStorage.getItem('kpm_enquiries'),
      cloudinary,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kpm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.settings) {
          setSettings(data.settings);
          localStorage.setItem('kpm_settings', JSON.stringify(data.settings));
        }
        if (data.products) localStorage.setItem('kpm_products', data.products);
        if (data.pages) localStorage.setItem('kpm_pages', data.pages);
        if (data.photos) localStorage.setItem('kpm_photos', data.photos);
        if (data.gallery) localStorage.setItem('kpm_gallery_items', data.gallery);
        if (data.enquiries) localStorage.setItem('kpm_enquiries', data.enquiries);
        if (data.cloudinary) {
          setCloudinary(data.cloudinary);
          saveConfig(data.cloudinary);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch {
        alert('Invalid backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveCloudinary = () => {
    saveConfig(cloudinary);
    setCloudinarySaved(true);
    setTimeout(() => setCloudinarySaved(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!cloudinary.cloudName || !cloudinary.uploadPreset) {
      setTestResult({ success: false, message: 'Please enter Cloud Name and Upload Preset' });
      return;
    }

    setTestingConnection(true);
    setTestResult(null);

    try {
      const testBlob = new Blob(['test'], { type: 'text/plain' });
      const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', testFile);
      formData.append('upload_preset', cloudinary.uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        setTestResult({ success: true, message: 'Connection successful! Cloudinary is configured correctly.' });
        const data = await response.json();
        if (data.public_id) {
          fetch(`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/resources/image/upload/${data.public_id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Basic ${btoa(`${cloudinary.apiKey || ''}:`)}`,
            },
          }).catch(() => {});
        }
      } else {
        const error = await response.json();
        setTestResult({
          success: false,
          message: error.error?.message || `HTTP ${response.status}: Connection failed`,
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Network error: ${err.message}. Check your Cloud Name.`,
      });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        {saved && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 font-medium flex items-center gap-2">
            <Check className="w-5 h-5" />
            Settings saved successfully!
          </div>
        )}

        {/* Cloudinary Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Cloudinary Configuration
            </h3>
            <div className="flex items-center gap-2">
              {isConfigured() ? (
                <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  Configured
                </span>
              ) : (
                <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                  Not Configured
                </span>
              )}
            </div>
          </div>

          {cloudinarySaved && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Cloudinary settings saved!
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cloud Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cloudinary.cloudName}
                  onChange={(e) => setCloudinary({ ...cloudinary, cloudName: e.target.value })}
                  placeholder="e.g., dxyz123abc"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">Found in your Cloudinary dashboard</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Preset <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cloudinary.uploadPreset}
                  onChange={(e) => setCloudinary({ ...cloudinary, uploadPreset: e.target.value })}
                  placeholder="e.g., unsigned_upload"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <p className="text-xs text-slate-400 mt-1">Must be an unsigned preset</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                API Key <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="text"
                value={cloudinary.apiKey || ''}
                onChange={(e) => setCloudinary({ ...cloudinary, apiKey: e.target.value })}
                placeholder="Only needed for test connection"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveCloudinary}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Cloudinary Settings
              </button>
              <button
                onClick={handleTestConnection}
                disabled={testingConnection || !cloudinary.cloudName || !cloudinary.uploadPreset}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 disabled:opacity-40"
              >
                {testingConnection ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                Test Connection
              </button>
              <button
                onClick={() => setShowCloudinaryGuide(!showCloudinaryGuide)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                {showCloudinaryGuide ? <X className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {showCloudinaryGuide ? 'Hide Guide' : 'Setup Guide'}
              </button>
            </div>

            {testResult && (
              <div
                className={`rounded-xl p-4 text-sm flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {testResult.success ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {testResult.message}
              </div>
            )}

            {showCloudinaryGuide && (
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Cloudinary Setup Guide</h4>
                <ol className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <p className="font-medium text-slate-900">Create a free Cloudinary account</p>
                      <a
                        href="https://cloudinary.com/users/register/free"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        cloudinary.com/users/register/free →
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-medium text-slate-900">Copy your Cloud Name from the dashboard</p>
                      <p className="text-xs text-slate-500">It appears at the top of your Media Library</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-medium text-slate-900">Create an unsigned upload preset</p>
                      <p className="text-xs text-slate-500">
                        Settings → Upload → Upload presets → Add new → Select &quot;Unsigned&quot;
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <p className="font-medium text-slate-900">Paste both values above and save</p>
                      <p className="text-xs text-slate-500">Free tier includes 25GB storage and 25GB bandwidth/month</p>
                    </div>
                  </li>
                </ol>
                <a
                  href="https://cloudinary.com/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Open Cloudinary Dashboard
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </h3>

          {passwordMsg && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
              {passwordMsg}
            </div>
          )}
          {passwordError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {passwordError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all pr-12"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <button
              onClick={handlePasswordChange}
              disabled={!password || !newPassword || !confirmPassword}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </button>
          </div>
        </div>

        {/* Site Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Site Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">GST Number</label>
              <input
                type="text"
                value={settings.gst}
                onChange={(e) => setSettings({ ...settings, gst: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  value={settings.phone2}
                  onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Street Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                <input
                  type="text"
                  value={settings.country}
                  onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pincode</label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Social Media Links
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
              <input
                type="url"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={settings.linkedin}
                  onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Twitter</label>
                <input
                  type="url"
                  value={settings.twitter}
                  onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">YouTube</label>
                <input
                  type="url"
                  value={settings.youtube}
                  onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export / Import */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Backup & Restore
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export All Data
            </button>
            <label className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Export creates a JSON backup file. Import restores data from a backup file.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save All Settings
          </button>
          <a
            href="/"
            target="_blank"
            className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            View Website ↗
          </a>
        </div>

        <p className="text-xs text-slate-400">
          Settings are saved in browser localStorage. For production use, consider using a
          database.
        </p>
      </div>
    </AdminLayout>
  );
}
