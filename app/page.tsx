'use client'

import { useState } from 'react'

export default function BusinessCalculator() {
  // ══════ STATE FOR ALL SECTIONS ══════
  
  // Section 1: Unit Economics
  const [price, setPrice] = useState(0)
  const [cogs, setCogs] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [packaging, setPackaging] = useState(0)
  const [gatewayPct, setGatewayPct] = useState(2)
  
  // Section 2: LTV & CAC
  const [aov, setAov] = useState(0)
  const [cmPct, setCmPct] = useState(0)
  const [avgOrders, setAvgOrders] = useState(0)
  const [cac, setCac] = useState(0)
  
  // Section 3: Churn & Retention
  const [ret12, setRet12] = useState(0)
  const [ret6, setRet6] = useState(0)
  const [ret3, setRet3] = useState(0)
  const [subStart, setSubStart] = useState(0)
  
  // Section 4: CAC by Channel
  const [cacIg, setCacIg] = useState(0)
  const [pctIg, setPctIg] = useState(0)
  const [cacGg, setCacGg] = useState(0)
  const [pctGg, setPctGg] = useState(0)
  const [cacInf, setCacInf] = useState(0)
  const [pctInf, setPctInf] = useState(0)
  const [cacRef, setCacRef] = useState(0)
  const [pctRef, setPctRef] = useState(0)
  
  // Section 5: Retail Economics
  const [mrp, setMrp] = useState(0)
  const [retMargin, setRetMargin] = useState(30)
  const [distMargin, setDistMargin] = useState(10)
  const [retCogs, setRetCogs] = useState(0)
  const [d2cMargin, setD2cMargin] = useState(0)
  
  // Section 6: Sampling Economics
  const [convRate, setConvRate] = useState(4)
  const [costPerSample, setCostPerSample] = useState(0)
  const [marginPerUnit, setMarginPerUnit] = useState(0)
  const [digitalCac, setDigitalCac] = useState(0)
  
  // Section 7: Growth & Scale
  const [currRev, setCurrRev] = useState(0)
  const [targetRev, setTargetRev] = useState(0)
  const [prevAdded, setPrevAdded] = useState(0)
  const [capital, setCapital] = useState(0)
  const [prevCapital, setPrevCapital] = useState(0)
  const [targetCust, setTargetCust] = useState(0)
  const [blendedCac, setBlendedCac] = useState(0)
  
  // Section 8: Subscription
  const [subPrice, setSubPrice] = useState(0)
  const [subCogs, setSubCogs] = useState(0)
  const [subCac, setSubCac] = useState(0)
  const [avgLife, setAvgLife] = useState(0)
  const [monthlyChurn, setMonthlyChurn] = useState(5)
  
  // ══════ CALCULATIONS ══════
  
  // Section 1
  const gatewayAmt = (price * gatewayPct) / 100
  const cm = price - cogs - shipping - packaging - gatewayAmt
  const cmPctCalc = price > 0 ? cm / price : 0
  
  // Section 2
  const revLtv = aov * avgOrders
  const cmLtv = revLtv * (cmPct / 100)
  const ltvCacRatio = cac > 0 ? cmLtv / cac : 0
  const firstOrderProfit = (aov * (cmPct / 100)) - cac
  const paybackMonths = (aov * (cmPct / 100)) > 0 ? cac / (aov * (cmPct / 100)) : 999
  
  // Section 3
  const churn12 = 1 - (ret12 / 100)
  const lost3 = subStart * (1 - (ret3 / 100))
  const earlyChurn = 1 - (ret3 / 100)
  const effCac = (ret3 / 100) > 0 ? cac / (ret3 / 100) : 0
  
  // Section 4
  const totalPct = pctIg + pctGg + pctInf + pctRef
  const blendedCacCalc = totalPct > 0 
    ? (cacIg * pctIg + cacGg * pctGg + cacInf * pctInf + cacRef * pctRef) / totalPct 
    : 0
  const cacRatio = cacRef > 0 ? cacIg / cacRef : 0
  
  // Section 5
  const realization = mrp * (1 - (retMargin/100) - (distMargin/100))
  const retailCm = mrp > 0 ? (realization - retCogs) / mrp : 0
  const marginGap = (d2cMargin / 100) - retailCm
  
  // Section 6
  const samplesNeeded = convRate > 0 ? 100 / convRate : 999
  const samplingCac = samplesNeeded * costPerSample
  const sampleProfit = marginPerUnit - samplingCac
  const samplingVsDigital = digitalCac > 0 ? samplingCac / digitalCac : 0
  
  // Section 7
  const absGrowth = targetRev - currRev
  const growthRatio = prevAdded > 0 ? absGrowth / prevAdded : 0
  const capEff = (prevCapital > 0 && prevAdded > 0) 
    ? (absGrowth / capital) / (prevAdded / prevCapital) 
    : 0
  const acqCost = targetCust * blendedCac
  const pctOfRaise = capital > 0 ? acqCost / capital : 0
  
  // Section 8
  const monthlyCm = subPrice - subCogs
  const subCmLtv = monthlyCm * avgLife
  const subRatio = subCac > 0 ? subCmLtv / subCac : 0
  const subPayback = monthlyCm > 0 ? subCac / monthlyCm : 999
  const impliedLife = monthlyChurn > 0 ? 100 / monthlyChurn : 999
  
  // ══════ HELPER FUNCTIONS ══════
  
  const formatCurrency = (val: number) => {
    return `₹${Math.round(val).toLocaleString('en-IN')}`
  }
  
  const formatPct = (val: number) => {
    return `${(val * 100).toFixed(1)}%`
  }
  
  const getSignal = (val: number, thresholds: {excellent?: number, good?: number, acceptable?: number}) => {
    if (thresholds.excellent && val >= thresholds.excellent) return { color: 'bg-green-100 border-2 border-green-500 text-green-800', text: '✅ Excellent' }
    if (thresholds.good && val >= thresholds.good) return { color: 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800', text: '🟡 Good' }
    if (thresholds.acceptable && val >= thresholds.acceptable) return { color: 'bg-orange-100 border-2 border-orange-500 text-orange-800', text: '🔴 Needs Work' }
    return { color: 'bg-red-100 border-2 border-red-500 text-red-800', text: '🚨 Critical' }
  }
  
  // ══════ RENDER ══════
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-navy text-white px-8 py-6 rounded-lg mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">BUSINESS METRICS CALCULATOR</h1>
          <p className="text-blue-200">Input yellow cells → Answers auto-calculate → Purple boxes = insights & questions</p>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-100 border-2 border-yellow-600 rounded-lg px-4 py-3 text-center">
            <span className="font-bold text-blue-900">🟡 Yellow = TYPE YOUR NUMBER</span>
          </div>
          <div className="bg-blue-50 border-2 border-blue-400 rounded-lg px-4 py-3 text-center">
            <span className="font-bold text-blue-800">🔵 Blue = AUTO ANSWER</span>
          </div>
          <div className="bg-purple-50 border-2 border-purple-400 rounded-lg px-4 py-3 text-center">
            <span className="font-bold text-purple-900">🟣 Purple = KEY INSIGHTS</span>
          </div>
        </div>
        
        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 1: UNIT ECONOMICS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ① UNIT ECONOMICS — Is the core transaction profitable?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Selling Price (MRP / AOV) ₹</label>
              <input 
                type="number" 
                className="input-field w-full"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">COGS per unit ₹</label>
              <input 
                type="number" 
                className="input-field w-full"
                value={cogs || ''}
                onChange={(e) => setCogs(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Shipping per order ₹</label>
              <input 
                type="number" 
                className="input-field w-full"
                value={shipping || ''}
                onChange={(e) => setShipping(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Packaging per order ₹</label>
              <input 
                type="number" 
                className="input-field w-full"
                value={packaging || ''}
                onChange={(e) => setPackaging(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Payment gateway % (e.g. 2 = 2%)</label>
              <input 
                type="number" 
                step="0.1"
                className="input-field w-full"
                value={gatewayPct || ''}
                onChange={(e) => setGatewayPct(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Payment Gateway Amount ₹</div>
              <div className="calc-result">{formatCurrency(gatewayAmt)}</div>
              <div className="text-sm italic text-gray-600">Auto-calc from price × gateway %</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► CONTRIBUTION MARGIN ₹</div>
              <div className="calc-result">{formatCurrency(cm)}</div>
              <div className={`signal-badge ${getSignal(cmPctCalc, {excellent: 0.5, good: 0.35}).color}`}>
                {getSignal(cmPctCalc, {excellent: 0.5, good: 0.35}).text}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► CONTRIBUTION MARGIN %</div>
              <div className="calc-result">{formatPct(cmPctCalc)}</div>
              <div className={`signal-badge ${getSignal(cmPctCalc, {excellent: 0.5, good: 0.35}).color}`}>
                {cmPctCalc >= 0.5 ? '✅ Strong' : cmPctCalc >= 0.35 ? '🟡 Acceptable' : '🔴 Danger'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "On a single order today — after COGS, shipping, packaging and payment gateway — what rupee amount actually stays? And is that improving or worsening as you grow?"
            </div>
          </div>
        </div>
        
        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 2: LTV & CAC */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ② LTV vs CAC — Is acquiring this customer profitable?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Average Order Value ₹ (AOV)</label>
              <input type="number" className="input-field w-full" value={aov || ''} onChange={(e) => setAov(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Contribution Margin % (from Section 1 or manual)</label>
              <input type="number" className="input-field w-full" value={cmPct || ''} onChange={(e) => setCmPct(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Avg number of orders per customer (lifetime)</label>
              <input type="number" className="input-field w-full" value={avgOrders || ''} onChange={(e) => setAvgOrders(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Customer Acquisition Cost ₹ (CAC) — blended</label>
              <input type="number" className="input-field w-full" value={cac || ''} onChange={(e) => setCac(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► REVENUE LTV ₹</div>
              <div className="calc-result">{formatCurrency(revLtv)}</div>
              <div className="text-sm italic text-amber-700 bg-amber-50 p-2 rounded">⚠ Revenue LTV — convert to CM LTV</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► CM LTV ₹</div>
              <div className="calc-result">{formatCurrency(cmLtv)}</div>
              <div className="text-sm">Use this for LTV:CAC ratio</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► LTV:CAC RATIO</div>
              <div className="calc-result">{ltvCacRatio.toFixed(1)}x</div>
              <div className={`signal-badge ${getSignal(ltvCacRatio, {excellent: 5, good: 3, acceptable: 1}).color}`}>
                {ltvCacRatio >= 5 ? '✅ Excellent ≥5x' : ltvCacRatio >= 3 ? '🟡 Good 3-5x' : ltvCacRatio >= 1 ? '🔴 Weak 1-3x' : '🚨 Burning cash'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► FIRST ORDER PROFIT ₹</div>
              <div className="calc-result">{formatCurrency(firstOrderProfit)}</div>
              <div className={`signal-badge ${firstOrderProfit > 0 ? 'bg-green-100 border-2 border-green-500 text-green-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {firstOrderProfit > 0 ? '✅ Profitable on 1st order' : '🔴 Need repeat to breakeven'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► CAC PAYBACK (months)</div>
              <div className="calc-result">{paybackMonths < 100 ? paybackMonths.toFixed(1) : '∞'}</div>
              <div className={`signal-badge ${paybackMonths <= 3 ? 'bg-green-100 border-2 border-green-500 text-green-800' : paybackMonths <= 6 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {paybackMonths <= 3 ? '✅ Fast' : paybackMonths <= 6 ? '🟡 OK' : paybackMonths <= 12 ? '🔴 Slow' : '🚨 Too long'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "At this LTV:CAC ratio, if you doubled acquisition spend tomorrow — would you be building value or burning cash?"
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 3: CHURN & RETENTION */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ③ CHURN & RETENTION — Where are customers leaving?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Retention at Month 12 (%)</label>
              <input type="number" className="input-field w-full" value={ret12 || ''} onChange={(e) => setRet12(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Retention at Month 6 (%)</label>
              <input type="number" className="input-field w-full" value={ret6 || ''} onChange={(e) => setRet6(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Retention at Month 3 (%)</label>
              <input type="number" className="input-field w-full" value={ret3 || ''} onChange={(e) => setRet3(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Starting customer base (count)</label>
              <input type="number" className="input-field w-full" value={subStart || ''} onChange={(e) => setSubStart(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Total churn by Month 12</div>
              <div className="calc-result">{formatPct(churn12)}</div>
              <div className={`signal-badge ${churn12 <= 0.2 ? 'bg-green-100 border-2 border-green-500 text-green-800' : churn12 <= 0.4 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {churn12 <= 0.2 ? '✅ Low' : churn12 <= 0.4 ? '🟡 Medium' : '🔴 High'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Customers lost by Month 3</div>
              <div className="calc-result">{Math.round(lost3).toLocaleString()}</div>
              <div className="text-sm italic">Early churn indicator</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► EARLY CHURN RATE</div>
              <div className="calc-result">{formatPct(earlyChurn)}</div>
              <div className={`signal-badge ${earlyChurn <= 0.1 ? 'bg-green-100 border-2 border-green-500 text-green-800' : earlyChurn <= 0.25 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {earlyChurn <= 0.1 ? '✅ Healthy' : earlyChurn <= 0.25 ? '🟡 Watch' : '🔴 Fix onboarding'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► EFFECTIVE CAC (adjusted)</div>
              <div className="calc-result">{formatCurrency(effCac)}</div>
              <div className="text-sm italic">True cost per retained customer</div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Show me churn month-by-month. Where's the steepest drop? Early churn and late churn need completely different solutions."
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 4: CAC BY CHANNEL */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ④ CAC BY CHANNEL — Which channel is worth scaling?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Instagram/Facebook CAC ₹</label>
              <input type="number" className="input-field w-full" value={cacIg || ''} onChange={(e) => setCacIg(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Instagram % of acquisitions</label>
              <input type="number" className="input-field w-full" value={pctIg || ''} onChange={(e) => setPctIg(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Google Search CAC ₹</label>
              <input type="number" className="input-field w-full" value={cacGg || ''} onChange={(e) => setCacGg(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Google % of acquisitions</label>
              <input type="number" className="input-field w-full" value={pctGg || ''} onChange={(e) => setPctGg(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Influencer CAC ₹</label>
              <input type="number" className="input-field w-full" value={cacInf || ''} onChange={(e) => setCacInf(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Influencer % of acquisitions</label>
              <input type="number" className="input-field w-full" value={pctInf || ''} onChange={(e) => setPctInf(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Referral/WOM CAC ₹</label>
              <input type="number" className="input-field w-full" value={cacRef || ''} onChange={(e) => setCacRef(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Referral % of acquisitions</label>
              <input type="number" className="input-field w-full" value={pctRef || ''} onChange={(e) => setPctRef(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► BLENDED CAC ₹</div>
              <div className="calc-result">{formatCurrency(blendedCacCalc)}</div>
              <div className="text-sm italic">Weighted average across channels</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► PAID vs REFERRAL RATIO</div>
              <div className="calc-result">{cacRatio.toFixed(1)}x</div>
              <div className={`signal-badge ${cacRatio >= 5 ? 'bg-red-100 border-2 border-red-500 text-red-800' : cacRatio >= 3 ? 'bg-orange-100 border-2 border-orange-500 text-orange-800' : cacRatio >= 2 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}`}>
                {cacRatio >= 5 ? '🚨 Paid 5x+ more' : cacRatio >= 3 ? '🔴 Paid 3-5x more' : cacRatio >= 2 ? '🟡 Paid 2-3x more' : '✅ Balanced'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Have you overlaid retention data onto CAC by channel? Cheapest acquisition and highest quality customer often come from different channels."
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 5: RETAIL ECONOMICS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ⑤ RETAIL ECONOMICS — D2C vs Retail margins
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">MRP / Retail Price ₹</label>
              <input type="number" className="input-field w-full" value={mrp || ''} onChange={(e) => setMrp(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Retailer margin % (typically 25-35)</label>
              <input type="number" className="input-field w-full" value={retMargin || ''} onChange={(e) => setRetMargin(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Distributor margin % (typically 8-12)</label>
              <input type="number" className="input-field w-full" value={distMargin || ''} onChange={(e) => setDistMargin(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">COGS per unit ₹</label>
              <input type="number" className="input-field w-full" value={retCogs || ''} onChange={(e) => setRetCogs(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Your D2C CM % (for comparison)</label>
              <input type="number" className="input-field w-full" value={d2cMargin || ''} onChange={(e) => setD2cMargin(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Your realization ₹</div>
              <div className="calc-result">{formatCurrency(realization)}</div>
              <div className="text-sm italic">After retailer + distributor cuts</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► RETAIL CM %</div>
              <div className="calc-result">{formatPct(retailCm)}</div>
              <div className={`signal-badge ${retailCm >= 0.35 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : retailCm >= 0.2 ? 'bg-orange-100 border-2 border-orange-500 text-orange-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {retailCm >= 0.35 ? '🟡 OK for retail' : retailCm >= 0.2 ? '🔴 Thin' : '🚨 Too low'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► D2C vs RETAIL GAP</div>
              <div className="calc-result">{formatPct(marginGap)}</div>
              <div className={`signal-badge ${marginGap <= 0.1 ? 'bg-green-100 border-2 border-green-500 text-green-800' : marginGap <= 0.25 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {marginGap <= 0.1 ? '✅ Small gap' : marginGap <= 0.25 ? '🟡 Meaningful sacrifice' : '🔴 Big gap'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Your D2C CM is X% but retail drops you to Y%. What strategic reason justifies that margin sacrifice — discovery, credibility, or volume?"
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 6: SAMPLING ECONOMICS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ⑥ SAMPLING ECONOMICS — Trial-to-purchase cost
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Trial-to-purchase conversion % (e.g. 4)</label>
              <input type="number" className="input-field w-full" value={convRate || ''} onChange={(e) => setConvRate(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Cost per sample ₹</label>
              <input type="number" className="input-field w-full" value={costPerSample || ''} onChange={(e) => setCostPerSample(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Margin per unit sold ₹</label>
              <input type="number" className="input-field w-full" value={marginPerUnit || ''} onChange={(e) => setMarginPerUnit(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Current digital CAC ₹ (comparison)</label>
              <input type="number" className="input-field w-full" value={digitalCac || ''} onChange={(e) => setDigitalCac(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Samples needed per purchase</div>
              <div className="calc-result">{samplesNeeded < 100 ? samplesNeeded.toFixed(1) : '∞'}</div>
              <div className="text-sm italic">100 ÷ conversion%</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► SAMPLING CAC ₹</div>
              <div className="calc-result">{formatCurrency(samplingCac)}</div>
              <div className="text-sm italic">Samples needed × cost per sample</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► First purchase profit</div>
              <div className="calc-result">{formatCurrency(sampleProfit)}</div>
              <div className={`signal-badge ${sampleProfit > 0 ? 'bg-green-100 border-2 border-green-500 text-green-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {sampleProfit > 0 ? '✅ Profitable' : '🔴 Loss on 1st purchase'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► SAMPLING vs DIGITAL</div>
              <div className="calc-result">{samplingVsDigital.toFixed(1)}x</div>
              <div className={`signal-badge ${samplingVsDigital <= 1 ? 'bg-green-100 border-2 border-green-500 text-green-800' : samplingVsDigital <= 2 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {samplingVsDigital <= 1 ? '✅ Cheaper' : samplingVsDigital <= 2 ? '🟡 Slightly more' : '🔴 Much more expensive'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Build the sampling cost model: conversion rate × cost per sample = CAC. How does that compare to digital CAC?"
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 7: GROWTH & SCALE */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ⑦ GROWTH & SCALE — Can you hit that target?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Current monthly revenue ₹</label>
              <input type="number" className="input-field w-full" value={currRev || ''} onChange={(e) => setCurrRev(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Target monthly revenue ₹</label>
              <input type="number" className="input-field w-full" value={targetRev || ''} onChange={(e) => setTargetRev(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Revenue added LAST round ₹/month</label>
              <input type="number" className="input-field w-full" value={prevAdded || ''} onChange={(e) => setPrevAdded(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Capital to raise THIS round ₹</label>
              <input type="number" className="input-field w-full" value={capital || ''} onChange={(e) => setCapital(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Capital raised LAST round ₹</label>
              <input type="number" className="input-field w-full" value={prevCapital || ''} onChange={(e) => setPrevCapital(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Target new customers to acquire</label>
              <input type="number" className="input-field w-full" value={targetCust || ''} onChange={(e) => setTargetCust(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Expected blended CAC ₹</label>
              <input type="number" className="input-field w-full" value={blendedCac || ''} onChange={(e) => setBlendedCac(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► ABSOLUTE GROWTH NEEDED</div>
              <div className="calc-result">{formatCurrency(absGrowth)}/mo</div>
              <div className="text-sm italic">The actual ₹ challenge</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► GROWTH MULTIPLIER</div>
              <div className="calc-result">{growthRatio.toFixed(1)}x</div>
              <div className={`signal-badge ${growthRatio <= 1.5 ? 'bg-green-100 border-2 border-green-500 text-green-800' : growthRatio <= 3 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {growthRatio <= 1.5 ? '✅ Consistent' : growthRatio <= 3 ? '🟡 Ambitious' : '🔴 Very aggressive'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Capital efficiency vs last round</div>
              <div className="calc-result">{capEff.toFixed(1)}x</div>
              <div className={`signal-badge ${capEff >= 1 ? 'bg-green-100 border-2 border-green-500 text-green-800' : capEff >= 0.7 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {capEff >= 1 ? '✅ More efficient' : capEff >= 0.7 ? '🟡 Slightly less' : '🔴 Less efficient'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► ACQUISITION COST</div>
              <div className="calc-result">{formatCurrency(acqCost)}</div>
              <div className="text-sm italic">{formatPct(pctOfRaise)} of raise</div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Last round you added ₹X. This round you need ₹Y — that's Zx more absolute growth. What specifically changes in your growth engine to justify that?"
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 8: SUBSCRIPTION HEALTH */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="section-header">
            ⑧ SUBSCRIPTION HEALTH — Does the model work?
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Subscription price ₹/month</label>
              <input type="number" className="input-field w-full" value={subPrice || ''} onChange={(e) => setSubPrice(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Variable cost per delivery ₹</label>
              <input type="number" className="input-field w-full" value={subCogs || ''} onChange={(e) => setSubCogs(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">CAC for subscription ₹</label>
              <input type="number" className="input-field w-full" value={subCac || ''} onChange={(e) => setSubCac(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Average subscriber lifetime (months)</label>
              <input type="number" className="input-field w-full" value={avgLife || ''} onChange={(e) => setAvgLife(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Monthly churn rate % (e.g. 5)</label>
              <input type="number" className="input-field w-full" value={monthlyChurn || ''} onChange={(e) => setMonthlyChurn(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Monthly CM per subscriber</div>
              <div className="calc-result">{formatCurrency(monthlyCm)}/mo</div>
              <div className="text-sm italic">Engine of subscription economics</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► SUBSCRIPTION LTV ₹</div>
              <div className="calc-result">{formatCurrency(subCmLtv)}</div>
              <div className="text-sm italic">Monthly CM × lifetime</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► LTV:CAC RATIO</div>
              <div className="calc-result">{subRatio.toFixed(1)}x</div>
              <div className={`signal-badge ${subRatio >= 5 ? 'bg-green-100 border-2 border-green-500 text-green-800' : subRatio >= 3 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {subRatio >= 5 ? '✅ Excellent' : subRatio >= 3 ? '🟡 Good' : '🔴 Fix before scaling'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-semibold">► Payback period (months)</div>
              <div className="calc-result">{subPayback < 100 ? subPayback.toFixed(1) : '∞'}</div>
              <div className={`signal-badge ${subPayback <= 3 ? 'bg-green-100 border-2 border-green-500 text-green-800' : subPayback <= 6 ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {subPayback <= 3 ? '✅ Fast' : subPayback <= 6 ? '🟡 OK' : subPayback <= avgLife ? '🔴 Slow' : '🚨 Never recovered'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="font-bold text-lg">► IMPLIED LIFETIME (from churn)</div>
              <div className="calc-result">{impliedLife < 100 ? impliedLife.toFixed(1) : '∞'} months</div>
              <div className={`signal-badge ${Math.abs(impliedLife - avgLife) <= 2 ? 'bg-green-100 border-2 border-green-500 text-green-800' : 'bg-red-100 border-2 border-red-500 text-red-800'}`}>
                {Math.abs(impliedLife - avgLife) <= 2 ? '✅ Consistent' : '🔴 Mismatch!'}
              </div>
            </div>
            
            <div className="question-box mt-4">
              💬 "Your monthly churn implies {impliedLife.toFixed(1)} month lifetime. You said {avgLife} months. Those don't reconcile — which is correct?"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12 pb-8">
          <p className="mb-2">All 8 calculator sections complete ✅</p>
          <p className="text-xs">Built for consumer product startups • Real-time calculations • Mobile-friendly</p>
        </div>
      </div>
    </div>
  )
}
