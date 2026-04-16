"use client"

import { useState } from 'react'
import { 
  Store, UserPlus, Package, TrendingUp, MapPin, 
  CheckCircle2, ShieldCheck, Mail, Phone, Flame, Zap, Leaf,
  ChevronRight, ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock Data
const LEADS = [
  { id: 1, name: 'Ananya Sharma', location: 'Delhi NP', type: 'Induction', budget: '₹4,500/mo', status: 'Hot', time: '10 mins ago' },
  { id: 2, name: 'Raj Kumar', location: 'Mumbai South', type: 'Biogas', budget: '₹1,200/mo', status: 'Ready', time: '2 hours ago' },
  { id: 3, name: 'Priya Patel', location: 'Pune Central', type: 'Solar', budget: '₹800/mo', status: 'Inquiry', time: '5 hours ago' },
]

const INVENTORY = [
  { id: 'ind', name: 'Smart Induction Stoves', stock: 45, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'bio', name: 'Biogas Digestors', stock: 12, icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'sol', name: 'Solar Thermal Cookers', stock: 28, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
]

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'inventory'>('leads')

  return (
    <main className="min-h-screen bg-background pb-20 pt-16 relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 pt-10 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <Store className="w-6 h-6 text-violet-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Supplier Portal</h1>
            </div>
            <p className="text-lg text-muted-foreground">Manage your fleet, inbound consumer leads, and sustainable inventory.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">Accepting Leads</span>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { title: 'New Leads', value: '14', icon: UserPlus, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { title: 'Active Inventory', value: '85', icon: Package, color: 'text-blue-400', border: 'border-blue-500/20' },
            { title: 'Pipeline Value', value: '₹1.2L', icon: TrendingUp, color: 'text-violet-400', border: 'border-violet-500/20' },
            { title: 'Verification', value: 'Verified', icon: ShieldCheck, color: 'text-amber-400', border: 'border-amber-500/20' },
          ].map((stat, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 border rounded-2xl bg-card/50 backdrop-blur-xl ${stat.border} shadow-lg relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className={`w-16 h-16 ${stat.color}`} />
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</p>
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Leads/Inventory Toggles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`text-lg font-semibold transition-colors relative ${activeTab === 'leads' ? 'text-white' : 'text-muted-foreground hover:text-white/80'}`}
              >
                Inbound Leads
                {activeTab === 'leads' && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-violet-500 rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`text-lg font-semibold transition-colors relative ${activeTab === 'inventory' ? 'text-white' : 'text-muted-foreground hover:text-white/80'}`}
              >
                Inventory Map
                {activeTab === 'inventory' && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-violet-500 rounded-full" />}
              </button>
            </div>

            {/* Leads View */}
            {activeTab === 'leads' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {LEADS.map((lead) => (
                  <div key={lead.id} className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white uppercase border border-white/10">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium flex items-center gap-2">
                          {lead.name}
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                            {lead.status}
                          </span>
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {lead.location}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-violet-300">{lead.type} Needed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-0 justify-between md:justify-end">
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium text-white">{lead.budget}</p>
                        <p className="text-xs text-muted-foreground">{lead.time}</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500 hover:text-white flex items-center justify-center transition-all group-hover:scale-105">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-muted-foreground hover:text-white hover:border-white/30 transition-all font-medium flex items-center justify-center gap-2">
                  Load Older Leads <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Inventory View */}
            {activeTab === 'inventory' && (
              <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {INVENTORY.map((item) => (
                  <div key={item.id} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.bg} blur-2xl opacity-50`} />
                    <div>
                      <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                      <h4 className="text-lg font-medium text-white">{item.name}</h4>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className="text-3xl font-bold text-white">{item.stock}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Units in Stock</p>
                      </div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
                <div className="glass-panel p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center min-h-[160px] text-muted-foreground hover:text-white hover:border-white/40 transition-colors cursor-pointer">
                  <Package className="w-8 h-8 mb-2 opacity-50" />
                  <p className="font-medium">Add Product Link</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quick Actions & Profile */}
          <div className="space-y-6">
            {/* Store Profile Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#111] rounded-[14px] flex items-center justify-center">
                    <Store className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">GreenTech Solutions</h3>
                  <p className="text-sm text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Dealer
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-500/25 transition-all">
                  Run Regional Targeted Ad
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors border border-white/5 flex items-center justify-center gap-2">
                    <Phone className="w-3 h-3" /> Call Log
                  </button>
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors border border-white/5 flex items-center justify-center gap-2">
                    <Mail className="w-3 h-3" /> Messages
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Supplier Alerts</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <div>
                    <p className="text-sm text-white font-medium">Low Stock: Solar Cookers</p>
                    <p className="text-xs text-muted-foreground">Only 28 units left in central warehouse.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <div>
                    <p className="text-sm text-white font-medium">Subsidy Approved</p>
                    <p className="text-xs text-muted-foreground">State scheme #1142 cleared for dispatch.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <div>
                    <p className="text-sm text-white font-medium">New Delhi Surge</p>
                    <p className="text-xs text-muted-foreground">Biogas demand up 32% this week in South Delhi.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
