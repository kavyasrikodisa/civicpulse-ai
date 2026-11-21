const categories = ['Roads', 'Water', 'Waste Management', 'Drainage', 'Pollution'];
function fallback(title, description) {
 const text = `${title} ${description}`.toLowerCase();
 const rules = [
  ['Roads', /road|pothole|pavement|street|sidewalk|footpath|traffic light/],
  ['Water', /water|leak|pipe|supply|contaminat|tap|sewage water/],
  ['Waste Management', /garbage|waste|trash|rubbish|dump|litter|bin/],
  ['Drainage', /drain|flood|overflow|sewer|waterlogging|blocked/],
  ['Pollution', /pollut|smoke|emission|noise|air quality|chemical/]
 ];
 const category = rules.find(([,re]) => re.test(text))?.[0] || 'Roads';
 const high = /danger|injur|accident|collapse|burst|flood|overflow|expos|school|hospital|severe|urgent|major/i.test(text);
 const medium = /broken|damage|leak|blocked|pile|odor|smell|crack/i.test(text);
 const severity = high ? 'High' : medium ? 'Medium' : 'Low';
 const department = ({ Roads:'Public Works Department', Water:'Water Supply Department', 'Waste Management':'Municipal Sanitation Department', Drainage:'Stormwater and Drainage Department', Pollution:'Environmental Health Department' })[category];
 return {category, severity, department, summary:`${title.trim()}: ${description.trim().slice(0, 150)}${description.trim().length > 150 ? '…' : ''}`, suggested_action: ({ Roads:'Inspect the affected road section and schedule repair or hazard marking.', Water:'Inspect the supply line, stop any leak and assess water quality.', 'Waste Management':'Arrange a site inspection and clear the accumulated waste.', Drainage:'Inspect and clear the drain; assess nearby properties for flooding.', Pollution:'Inspect the reported source and assess the local environmental impact.' })[category], analysis_source:'Rule-based fallback', severity_reason:high ? 'High: the report mentions a potential immediate safety or health hazard.' : medium ? 'Medium: the report describes visible damage, leakage or blockage needing attention.' : 'Low: no urgent hazard terms were identified; confirm severity during inspection.'};
}
export async function analyzeComplaint(title, description) {
 if (!process.env.GEMINI_API_KEY) return fallback(title, description);
 try {
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({contents:[{parts:[{text:`Classify this civic complaint. Return only JSON with keys category (one of ${categories.join(', ')}), severity (Low, Medium, High), department, summary (under 35 words), suggested_action (under 30 words), severity_reason (brief evidence-based reason). Do not invent details. Title: ${title}\nDescription: ${description}`}]}], generationConfig:{responseMimeType:'application/json',temperature:0.2}}), signal:AbortSignal.timeout(12000) });
  if (!response.ok) {
   console.warn(`Gemini API returned HTTP ${response.status}; using rule-based fallback.`);
   return fallback(title, description);
  }
  const data = await response.json();
  const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || '{}');
  if (!categories.includes(result.category) || !['Low','Medium','High'].includes(result.severity) || !result.department || !result.summary || !result.suggested_action) throw new Error('Invalid analysis');
  return {...result, analysis_source:'Gemini'};
 } catch (error) {
  console.warn(`Gemini analysis failed (${error?.name || 'unknown error'}); using rule-based fallback.`);
  return fallback(title, description);
 }
}
