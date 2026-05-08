// collectTelemetry.ts
export default async function collectTelemetry() {
  const nav = navigator, win = window, doc = document, screenObj = screen;
  const out: any = {};

  // basic
  out.userAgent = nav.userAgent;
  out.platform = nav.platform;
  out.language = nav.language || (nav.languages && nav.languages[0]);
  out.languages = nav.languages && JSON.stringify(nav.languages);
  out.cookieEnabled = nav.cookieEnabled;
  out.online = nav.onLine;
  out.hardwareConcurrency = nav.hardwareConcurrency;
  out.deviceMemoryGB = (nav as any).deviceMemory;
  out.maxTouchPoints = nav.maxTouchPoints;

  // screen
  out.screenWidth = screenObj.width;
  out.screenHeight = screenObj.height;
  out.availWidth = screenObj.availWidth;
  out.availHeight = screenObj.availHeight;
  out.colorDepth = screenObj.colorDepth;
  out.devicePixelRatio = win.devicePixelRatio;

  // timezone/locale
  out.timezoneOffsetMinutes = new Date().getTimezoneOffset();
  out.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  out.locale = Intl.DateTimeFormat().resolvedOptions().locale;

  // connection
  out.connectionType = (nav as any).connection && (nav as any).connection.effectiveType;
  out.downlink = (nav as any).connection && (nav as any).connection.downlink;
  out.rtt = (nav as any).connection && (nav as any).connection.rtt;

  // navigator capabilities
  out.plugins = nav.plugins && JSON.stringify(Array.from(nav.plugins).map(p => p.name));
  out.mimeTypes = nav.mimeTypes && JSON.stringify(Array.from(nav.mimeTypes).map(m => m.type));
  out.doNotTrack = nav.doNotTrack;

  // doc/referrer/cookies
  out.referrer = doc.referrer;
  try { out.cookies = doc.cookie } catch { out.cookies = null }

  // fonts (simple heuristic)
  try {
    const s = document.createElement('span');
    s.textContent = 'mmmmmmmmmmwwwww';
    s.style.fontSize = '72px';
    s.style.position = 'absolute';
    s.style.left = '-9999px';
    document.body.appendChild(s);
    const dw = s.offsetWidth, dh = s.offsetHeight;
    const fonts = ['Arial','Courier New','Times New Roman','Georgia','Comic Sans MS','Impact','Lucida Console','Tahoma','Trebuchet MS','Verdana'];
    const found = [];
    for (const f of fonts) { s.style.fontFamily = f + ', monospace'; if (s.offsetWidth !== dw || s.offsetHeight !== dh) found.push(f); }
    document.body.removeChild(s);
    out.fontsDetected = JSON.stringify(found);
  } catch { out.fontsDetected = null }

  // canvas
  try {
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top'; ctx.font = "14px 'Arial'"; ctx.fillStyle = '#f60'; ctx.fillRect(125,1,62,20);
      ctx.fillStyle = '#069'; ctx.fillText('telemetry-check-Ω',2,2); ctx.fillStyle='rgba(102,204,0,0.7)'; ctx.fillText('telemetry-check-Ω',4,4);
    }
    const data = c.toDataURL();
    let h = 2166136261>>>0; for (let i=0;i<data.length;i++){ h ^= data.charCodeAt(i); h = Math.imul(h,16777619)>>>0 }
    out.canvasFingerprint = h.toString(16);
  } catch { out.canvasFingerprint = null }

  // audio (async)
  out.audioFingerprint = null;
  (async ()=>{
    try{
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const o = ctx.createOscillator();
      const a = ctx.createAnalyser();
      const g = ctx.createGain();
      g.gain.value = 0;
      o.type = 'sine';
      o.connect(a); a.connect(g); g.connect(ctx.destination);
      o.start(0);
      const buf = new Float32Array(a.fftSize);
      a.getFloatTimeDomainData(buf);
      o.stop();
      ctx.close();
      let h = 2166136261>>>0;
      for (let i=0;i<buf.length;i++){ const v = Math.floor((buf[i]||0)*1000); h ^= v; h = Math.imul(h,16777619)>>>0 }
      out.audioFingerprint = h.toString(16);
    }catch{ out.audioFingerprint = null }
  })();

  // permissions (fire-and-forget)
  try {
    const perms = ['geolocation','notifications','push','midi','camera','microphone','background-sync','ambient-light-sensor','accelerometer','gyroscope','magnetometer','clipboard-read','clipboard-write'];
    const pRes: any = {};
    if (nav.permissions && nav.permissions.query) {
      perms.forEach(p => { nav.permissions.query({name: p as any}).then(r => pRes[p]=r.state).catch(()=>pRes[p]=null) });
    }
    out.permissions = JSON.stringify(pRes);
  } catch { out.permissions = null }

  // storage estimate (async)
  out.storageEstimate = null;
  if ((navigator as any).storage && (navigator as any).storage.estimate) {
    (navigator as any).storage.estimate().then((e:any)=> out.storageEstimate = JSON.stringify(e)).catch(()=> out.storageEstimate = null);
  }

  // media devices
  out.mediaDevices = JSON.stringify({
    enumerateDevices: !!(nav.mediaDevices && nav.mediaDevices.enumerateDevices),
    getUserMedia: !!(nav.mediaDevices && nav.mediaDevices.getUserMedia)
  });

  out.pointerType = (window as any).PointerEvent ? 'PointerEvent' : null;
  out.touchSupport = !!('ontouchstart' in window) || !!nav.maxTouchPoints;
  out.numberFormatExample = (1.2345).toLocaleString();
  out.dateFormatExample = new Date(2000,0,2,3,4,5).toLocaleString();
  out.performance = JSON.stringify({ timing: !!(performance as any).timing, memory: !!(performance as any).memory, now: typeof performance.now==='function' });

  // quick fingerprint
  const parts = [
    out.userAgent, out.platform, out.language, out.screenWidth, out.screenHeight,
    out.devicePixelRatio, out.canvasFingerprint, out.webglFingerprint, out.audioFingerprint
  ].join('||');
  let hh = 2166136261>>>0; for (let i=0;i<parts.length;i++){ hh ^= parts.charCodeAt(i)||0; hh = Math.imul(hh,16777619)>>>0 }
  out.quickFingerprint = hh.toString(16);

  return out;
}
