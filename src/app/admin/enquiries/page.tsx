'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../AdminLayout';

interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kpm_enquiries');
    if (stored) setEnquiries(JSON.parse(stored));
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    setEnquiries(updated);
    localStorage.setItem('kpm_enquiries', JSON.stringify(updated));
  };

  const deleteEnquiry = (id: string) => {
    if (confirm('Delete this enquiry?')) {
      const updated = enquiries.filter(e => e.id !== id);
      setEnquiries(updated);
      localStorage.setItem('kpm_enquiries', JSON.stringify(updated));
      if (selected?.id === id) setSelected(null);
    }
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'contacted', 'quoted', 'closed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-industrial text-sm capitalize transition-colors ${filter === s ? 'bg-primary-700 text-white' : 'bg-industrial-100 text-industrial-700 hover:bg-industrial-200'}`}
            >
              {s} {s === 'all' ? `(${enquiries.length})` : `(${enquiries.filter(e => e.status === s).length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-industrial-lg border border-industrial-200 p-8 text-center text-sm text-industrial-500">
                No enquiries found
              </div>
            ) : (
              filtered.map((enq) => (
                <div
                  key={enq.id}
                  onClick={() => setSelected(enq)}
                  className={`bg-white rounded-industrial border p-4 cursor-pointer transition-colors ${selected?.id === enq.id ? 'border-primary-500 ring-2 ring-primary-100' : 'border-industrial-200 hover:border-industrial-300'}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-industrial-900">{enq.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${enq.status === 'new' ? 'bg-orange-100 text-orange-700' : enq.status === 'contacted' ? 'bg-blue-100 text-blue-700' : enq.status === 'quoted' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-industrial-500 mt-1">{enq.company || 'No company'} • {enq.product}</p>
                  <p className="text-xs text-industrial-400 mt-0.5">{enq.phone}</p>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-industrial-900">Enquiry Details</h2>
                  <button onClick={() => setSelected(null)} className="text-sm text-industrial-500 hover:text-industrial-700">Close</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-industrial-500">Name</p>
                    <p className="text-sm font-medium text-industrial-900">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-industrial-500">Company</p>
                    <p className="text-sm font-medium text-industrial-900">{selected.company || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-industrial-500">Phone</p>
                    <p className="text-sm font-medium text-industrial-900">
                      <a href={`tel:${selected.phone}`} className="text-primary-600 hover:text-primary-700">{selected.phone}</a>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-industrial-500">Email</p>
                    <p className="text-sm font-medium text-industrial-900">
                      <a href={`mailto:${selected.email}`} className="text-primary-600 hover:text-primary-700">{selected.email}</a>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-industrial-500">Product</p>
                    <p className="text-sm font-medium text-industrial-900">{selected.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-industrial-500">Date</p>
                    <p className="text-sm font-medium text-industrial-900">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {selected.message && (
                  <div className="mb-6">
                    <p className="text-xs text-industrial-500 mb-1">Message</p>
                    <p className="text-sm text-industrial-700 bg-industrial-50 rounded-industrial p-4">{selected.message}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <a href={`tel:${selected.phone}`} className="px-4 py-2 bg-primary-700 text-white rounded-industrial text-sm hover:bg-primary-800">Call Now</a>
                  <a href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#25D366] text-white rounded-industrial text-sm hover:bg-[#1DB954]">WhatsApp</a>
                  <a href={`mailto:${selected.email}`} className="px-4 py-2 bg-industrial-100 text-industrial-700 border border-industrial-200 rounded-industrial text-sm hover:bg-industrial-200">Email</a>
                </div>
                <div className="mt-4 pt-4 border-t border-industrial-200">
                  <p className="text-xs text-industrial-500 mb-2">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'quoted', 'closed'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`px-3 py-1.5 rounded-industrial text-xs capitalize transition-colors ${selected.status === s ? 'bg-primary-700 text-white' : 'bg-industrial-100 text-industrial-600 hover:bg-industrial-200'}`}
                      >
                        {s}
                      </button>
                    ))}
                    <button onClick={() => deleteEnquiry(selected.id)} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-industrial text-xs hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-industrial-lg border border-industrial-200 p-12 text-center text-sm text-industrial-500">
                Select an enquiry to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
