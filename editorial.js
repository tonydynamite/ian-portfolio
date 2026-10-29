// Progressive enhancement: all content stays visible without JavaScript.
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav?.classList.toggle('s',scrollY>8),{passive:true});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const lb=document.getElementById('lb');
if(lb){
  lb.setAttribute('aria-label','Image preview');
  const close=document.createElement('button');
  close.className='lightbox-close';close.type='button';close.textContent='×';close.setAttribute('aria-label','Close image preview');lb.append(close);
  const preview=lb.querySelector('img');let opener;
  const open=(image)=>{opener=image;preview.src=image.currentSrc||image.src;preview.alt=image.alt||'';lb.showModal();close.focus();};
  document.querySelectorAll('figure img,.logo img,.lead img,.tile img').forEach(image=>{
    image.classList.add('zoomable');image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label',image.alt?'Enlarge: '+image.alt:'Enlarge image');
    image.addEventListener('click',()=>open(image));
    image.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(image);}});
  });
  close.addEventListener('click',()=>lb.close());
  lb.addEventListener('click',e=>{if(e.target===lb)lb.close();});
  lb.addEventListener('close',()=>{preview.removeAttribute('src');opener?.focus({preventScroll:true});});
}
// Play only visible clips. Reduced-motion visitors keep the original posters.
const videos=[...document.querySelectorAll('video')];
const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
  if(isIntersecting&&!reducedMotion.matches&&!document.hidden)target.play().catch(()=>{});
  else target.pause();
}),{threshold:.25});
videos.forEach(video=>observer.observe(video));
document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(video=>video.pause());});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)videos.forEach(video=>video.pause());});

/* Signature intro: the ink image is revealed along the traced pen strokes, in writing order. */
(function(){
  var SIG={"w":838,"h":309,"s":[[[25.5,184.2],[42.0,176.1],[91.0,141.1],[116.0,127.2],[137.4,120.2],[153.1,107.6],[208.0,87.4],[236.0,81.6]],[[140.8,105.4],[125.2,174.0],[125.4,187.5],[129.1,196.8]],[[177.6,216.3],[190.1,209.7],[195.1,197.6],[201.2,201.5],[217.8,193.5],[229.9,178.0],[232.9,163.1],[259.3,153.6],[264.9,143.0],[260.8,187.0],[264.6,195.9],[282.0,201.2],[290.0,200.5],[321.9,180.5],[343.5,154.4],[362.9,94.6],[379.2,68.2]],[[261.9,216.4],[298.3,161.0],[337.0,111.0],[347.0,102.4],[377.8,90.5]],[[325.6,156.9],[366.0,147.2],[394.4,129.9],[411.0,107.5],[499.2,27.3]],[[380.0,121.6],[412.0,132.4],[481.0,115.9],[552.0,105.8],[560.8,107.1],[563.3,117.8],[556.9,124.4],[506.0,151.3],[401.0,193.7],[380.9,208.9],[285.0,239.1],[266.0,243.3],[252.0,242.9]],[[289.3,103.3],[271.7,130.8],[252.0,130.5],[243.0,134.3],[233.6,144.0],[226.0,160.6],[209.0,172.8],[196.9,185.8],[172.0,193.8],[147.0,209.6],[113.0,234.6],[66.5,276.7],[57.3,280.6]],[[388.0,207.0],[403.0,209.5],[534.0,175.5],[637.0,159.4],[814.0,149.5]]]};
  var B64='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';
  var copy=document.querySelector('.identity-copy'),h1=copy&&copy.querySelector('h1'); if(!h1) return; var box=document.createElement('div'); box.className='sig'; box.id='sig'; box.setAttribute('aria-hidden','true'); copy.insertBefore(box,h1);
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS='http://www.w3.org/2000/svg';
  function f(n){return Math.round(n*10)/10}
  function bez(P){var d='M'+f(P[0][0])+' '+f(P[0][1]);if(P.length===2)return d+'L'+f(P[1][0])+' '+f(P[1][1]);for(var i=0;i<P.length-1;i++){var p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||P[i+1];d+='C'+f(p1[0]+(p2[0]-p0[0])/6)+' '+f(p1[1]+(p2[1]-p0[1])/6)+' '+f(p2[0]-(p3[0]-p1[0])/6)+' '+f(p2[1]-(p3[1]-p1[1])/6)+' '+f(p2[0])+' '+f(p2[1])}return d}
  var svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 '+SIG.w+' '+SIG.h);svg.setAttribute('aria-hidden','true');
  var defs=document.createElementNS(NS,'defs');var mask=document.createElementNS(NS,'mask');mask.setAttribute('id','sigmask');mask.setAttribute('maskUnits','userSpaceOnUse');
  var paths=[],lens=[];
  SIG.s.forEach(function(st){var p=document.createElementNS(NS,'path');p.setAttribute('d',bez(st));p.setAttribute('fill','none');p.setAttribute('stroke','#fff');p.setAttribute('stroke-width','26');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');mask.appendChild(p);paths.push(p)});
  defs.appendChild(mask);svg.appendChild(defs);
  var img=document.createElementNS(NS,'image');img.setAttribute('href','data:image/png;base64,'+B64);img.setAttribute('x','0');img.setAttribute('y','0');img.setAttribute('width',SIG.w);img.setAttribute('height',SIG.h);img.setAttribute('mask','url(#sigmask)');svg.appendChild(img);
  box.appendChild(svg);
  paths.forEach(function(p,i){lens[i]=p.getTotalLength()});
  var total=lens.reduce(function(a,b){return a+b},0);
  function setDash(el,L,drawn){el.style.strokeDasharray=(L+4)+' '+(L+4);el.style.strokeDashoffset=(L+4)-Math.max(0,Math.min(L,drawn));el.style.visibility=drawn>0.5?'visible':'hidden'}
  function draw(s){var c=0;paths.forEach(function(p,i){setDash(p,lens[i],s-c);c+=lens[i]})}
  if(reduce){draw(total);return}
  draw(0);
  var dur=2200,t0=null,delay=250;
  function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
  function frame(ts){if(t0===null)t0=ts;var t=Math.min(1,(ts-t0-delay)/dur);if(t<0){requestAnimationFrame(frame);return}draw(total*ease(t));if(t<1)requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
})();
