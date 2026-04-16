export interface UserFormData {
  householdSize: number
  monthlyBudget: number
  city: string
  cookingFrequency: string
}

export interface CookingOption {
  id: string
  name: string
  icon: string
  monthlyCost: number
  setupCost: number
  score: number
  pros: string[]
  cons: string[]
  carbonFootprint: number // kg CO2 per month
  subsidyAmount: number
  subsidyScheme: string
  color: string
}

export interface Dealer {
  id: string
  name: string
  type: 'biogas' | 'solar' | 'induction'
  address: string
  city: string
  lat: number
  lng: number
  phone: string
  rating: number
  reviews: number
}

export interface GovernmentScheme {
  id: string
  name: string
  description: string
  subsidy: string
  eligibility: string
  states: string[]
  link: string
  cookingType: string
}

export interface Review {
  id: string
  userName: string
  city: string
  cookingMethod: string
  rating: number
  comment: string
  date: string
  householdSize: number
  verified: boolean
}

export interface SavedRecommendation {
  id: string
  date: string
  formData: UserFormData
  recommendations: CookingOption[]
  bestOption: string
}

export interface EMIDetails {
  principal: number
  interestRate: number
  tenure: number
  emi: number
  totalAmount: number
  totalInterest: number
}

export const CITIES = [
  'Mumbai', 'Delhi', 'Pune', 'Chennai', 'Bangalore', 
  'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Bhopal'
] as const
export type City = typeof CITIES[number]

export const COOKING_FREQUENCIES = [
  { value: 'light', label: 'Light (1-2 meals/day)' },
  { value: 'moderate', label: 'Moderate (2-3 meals/day)' },
  { value: 'heavy', label: 'Heavy (3+ meals/day)' },
] as const

// Regional pricing multipliers
export const CITY_PRICE_MULTIPLIERS: Record<City, number> = {
  Mumbai: 1.15,
  Delhi: 1.10,
  Pune: 1.05,
  Chennai: 1.08,
  Bangalore: 1.12,
  Kolkata: 1.05,
  Hyderabad: 1.07,
  Ahmedabad: 1.06,
  Jaipur: 1.02,
  Lucknow: 1.04,
  Bhopal: 1.01,
}

// Cooking frequency multipliers
export const FREQUENCY_MULTIPLIERS: Record<string, number> = {
  light: 0.7,
  moderate: 1.0,
  heavy: 1.4,
}
