"use client"

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { MapPin, Users, Wallet, Clock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ResultsSection } from '@/components/results-section'
import { ComparisonChart } from '@/components/comparison-chart'
import { CarbonCalculator } from '@/components/carbon-calculator'
import { EMICalculator } from '@/components/emi-calculator'
import { DealerLocator } from '@/components/dealer-locator'
import { GovernmentSchemes } from '@/components/government-schemes'
import { CommunityReviews } from '@/components/community-reviews'
import { SmartInsights } from '@/components/smart-insights'
import { calculateRecommendations } from '@/lib/calculator'
import type { UserFormData, CookingOption, SavedRecommendation } from '@/lib/types'
import { CITIES, COOKING_FREQUENCIES } from '@/lib/types'

export default function ConsumerDashboard() {
  const [formData, setFormData] = useState<UserFormData>({
    city: 'Delhi',
    householdSize: 4,
    monthlyBudget: 3000,
    cookingFrequency: 'moderate'
  })
  const [recommendations, setRecommendations] = useState<CookingOption[]>([])
  const [savedRecommendations, setSavedRecommendations] = useState<SavedRecommendation[]>([])

  // Load saved recommendations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cooksmart-history')
    if (saved) {
      try {
        setSavedRecommendations(JSON.parse(saved))
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])

  // Auto calculate when form data changes
  useEffect(() => {
    if (formData.city && formData.cookingFrequency) {
      const results = calculateRecommendations(formData)
      setRecommendations(results)
    }
  }, [formData])

  const handleWhatsAppShare = useCallback(() => {
    if (!recommendations.length || !formData) return
    
    const best = recommendations[0]
    const message = `🍳 *CookSmart Recommendation*\n\n📍 City: ${formData.city}\n👥 Household: ${formData.householdSize} members\n💰 Budget: ₹${formData.monthlyBudget.toLocaleString()}/month\n\n🏆 *Best Option: ${best.name}*\n💵 Monthly Cost: ₹${best.monthlyCost.toLocaleString()}\n🔧 Setup Cost: ₹${best.setupCost.toLocaleString()}\n⭐ Score: ${best.score}/10\n\nFind your ideal cooking alternative at CookSmart! 🔗`

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    
    toast.success('Opening WhatsApp...', {
      description: 'Share your results with friends and family!',
    })
  }, [recommendations, formData])

  // Update specific form field
  const updateForm = (key: keyof UserFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <main className="min-h-screen bg-background pb-20 pt-16">
      <div className="container mx-auto max-w-6xl px-4 pt-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Live Consumer Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">Instantly tune your parameters and see real-time shifts in recommendations.</p>
        </div>

        {/* Live Controls Dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* City */}
          <div className="p-6 border border-white/10 rounded-xl bg-card text-card-foreground shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-semibold">Location</h2>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Set operational city</p>
            </div>
            <Select value={formData.city} onValueChange={(val) => updateForm('city', val)}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Household Size */}
          <div className="p-6 border border-white/10 rounded-xl bg-card text-card-foreground shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold">Household</h2>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Members: <strong className="text-white">{formData.householdSize}</strong></p>
            </div>
            <div className="py-2">
              <Slider
                value={[formData.householdSize]}
                onValueChange={(val) => updateForm('householdSize', val[0])}
                min={1} max={10} step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="p-6 border border-white/10 rounded-xl bg-card text-card-foreground shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold">Budget</h2>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Monthly: <strong className="text-white">₹{formData.monthlyBudget.toLocaleString()}</strong></p>
            </div>
            <div className="py-2">
              <Slider
                value={[formData.monthlyBudget]}
                onValueChange={(val) => updateForm('monthlyBudget', val[0])}
                min={500} max={10000} step={100}
                className="w-full"
              />
            </div>
          </div>

          {/* Habits */}
          <div className="p-6 border border-white/10 rounded-xl bg-card text-card-foreground shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold">Habits</h2>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Cooking frequency</p>
            </div>
            <Select value={formData.cookingFrequency} onValueChange={(val) => updateForm('cookingFrequency', val)}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white line-clamp-1">
                <SelectValue placeholder="Habits" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                {COOKING_FREQUENCIES.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
        </div>

        {/* Real-time Dashboard Sections */}
        {recommendations.length > 0 ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ResultsSection 
              recommendations={recommendations} 
              formData={formData}
              onShare={handleWhatsAppShare}
            />
            
            <SmartInsights bestOption={recommendations[0]} />

            <div className="grid md:grid-cols-2 gap-8">
              <CarbonCalculator 
                recommendations={recommendations} 
                householdSize={formData.householdSize}
              />
              <EMICalculator recommendations={recommendations} />
            </div>

            <div className="w-full">
              <ComparisonChart recommendations={recommendations} />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/5 mt-10">
              <DealerLocator city={formData.city} />
              <GovernmentSchemes city={formData.city} />
              <CommunityReviews city={formData.city} />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-white/5 rounded-2xl border border-white/10">
            Adjust your monthly budget to see viable recommendations. If your budget is too low, no sustainable options may fit.
          </div>
        )}
      </div>
    </main>
  );
}
