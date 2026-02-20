import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,900&family=Barlow:wght@300;400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: #12183A;
    --navy-deep: #0A0E24;
    --navy-mid: #1C2448;
    --white: #F5F2EE;
    --off-white: #D8D4CE;
    --purple: #7B5EA7;
    --purple-light: #A07CC5;
    --purple-dark: #5A3D88;
    --muted: rgba(245,242,238,0.45);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy-deep);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  .cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: var(--white);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
  }

  .cursor-ring {
    position: fixed;
    width: 32px; height: 32px;
    border: 1px solid rgba(160,124,197,0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: all 0.18s ease;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 56px;
    background: linear-gradient(to bottom, rgba(10,14,36,0.95), transparent);
  }

  .logo-w {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 2px;
    background: linear-gradient(135deg, var(--purple-light), var(--purple-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo-sep { width: 1px; height: 20px; background: rgba(245,242,238,0.15); margin: 0 14px; display: inline-block; }

  .logo-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase;
    color: var(--off-white); opacity: 0.6;
  }

  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--muted); text-decoration: none; cursor: none; font-weight: 700;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--white); }

  /* HERO */
  .hero {
    height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 56px 88px;
    position: relative; overflow: hidden;
    background: var(--navy-deep);
  }

  .hero-glow {
    position: absolute; top: -15%; right: -10%;
    width: 65vw; height: 65vw;
    background: radial-gradient(circle, rgba(123,94,167,0.16) 0%, transparent 65%);
    pointer-events: none;
  }

  .hero-lines {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 100px 100px;
  }

  .hero-tag {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 5px; text-transform: uppercase;
    color: var(--purple-light); margin-bottom: 28px;
    position: relative; z-index: 1;
    display: flex; align-items: center; gap: 16px;
  }
  .hero-tag::before { content: ''; display: block; width: 36px; height: 1px; background: var(--purple-light); }

  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(80px, 13vw, 176px);
    font-weight: 900; line-height: 0.88;
    letter-spacing: -1px; text-transform: uppercase;
    margin-bottom: 48px; position: relative; z-index: 1;
  }

  .line-grad {
    display: block;
    background: linear-gradient(90deg, var(--white) 0%, var(--purple-light) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .line-out {
    display: block;
    -webkit-text-stroke: 1px rgba(245,242,238,0.25);
    -webkit-text-fill-color: transparent;
  }

  .hero-bottom {
    display: flex; align-items: flex-end; justify-content: space-between;
    position: relative; z-index: 1;
  }

  .hero-sub {
    font-size: 15px; font-weight: 300;
    color: var(--muted); max-width: 380px; line-height: 1.85;
  }

  .hero-cta {
    display: inline-flex; align-items: center; gap: 14px;
    background: transparent;
    border: 1px solid rgba(160,124,197,0.4);
    color: var(--white); padding: 18px 44px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; letter-spacing: 4px; text-transform: uppercase;
    cursor: none; font-weight: 700;
    transition: all 0.35s ease; position: relative; overflow: hidden;
  }

  .hero-cta::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--purple-dark), var(--purple));
    transform: translateX(-100%); transition: transform 0.35s ease; z-index: 0;
  }
  .hero-cta:hover::before { transform: translateX(0); }
  .hero-cta:hover { border-color: var(--purple); }
  .hero-cta span { position: relative; z-index: 1; }

  .hero-scroll {
    position: absolute; right: 56px; bottom: 88px;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--muted);
  }

  .scroll-bar {
    width: 1px; height: 52px;
    background: linear-gradient(to bottom, var(--purple-light), transparent);
    animation: sc 2.5s ease infinite;
  }

  @keyframes sc { 0%,100%{opacity:.3;transform:scaleY(.6)} 50%{opacity:1;transform:scaleY(1)} }

  /* SECTION SHARED */
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase;
    color: var(--purple-light); margin-bottom: 20px;
    display: flex; align-items: center; gap: 14px;
  }
  .section-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--purple-light); }

  .big-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(52px, 8vw, 100px);
    font-weight: 900; line-height: 0.9; text-transform: uppercase;
  }

  /* MANIFESTO */
  .manifesto { background: var(--navy); padding: 130px 56px; position: relative; }
  .manifesto::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--purple), transparent); }

  .manifesto-layout {
    display: grid; grid-template-columns: 1.1fr 0.9fr;
    gap: 96px; max-width: 1200px; margin: 0 auto; align-items: start;
  }

  .manifesto-punch {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(38px, 4.5vw, 64px);
    font-weight: 900; line-height: 1.0; text-transform: uppercase;
    margin-bottom: 36px; letter-spacing: -.5px;
  }
  .manifesto-punch em {
    font-style: normal;
    background: linear-gradient(90deg, var(--purple-light), var(--purple-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .manifesto-body { font-size: 16px; font-weight: 300; color: var(--muted); line-height: 1.85; margin-bottom: 52px; }
  .manifesto-body strong { color: var(--white); font-weight: 600; }

  .stats-row { display: flex; border-top: 1px solid rgba(245,242,238,0.07); padding-top: 40px; }
  .stat { flex: 1; border-right: 1px solid rgba(245,242,238,0.07); padding-right: 28px; margin-right: 28px; }
  .stat:last-child { border-right: none; margin-right: 0; }
  .stat-n {
    font-family: 'Barlow Condensed', sans-serif; font-size: 52px; font-weight: 900; line-height: 1;
    background: linear-gradient(135deg, var(--white), var(--purple-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .stat-l { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-top: 6px; font-weight: 600; font-family: 'Barlow Condensed', sans-serif; }

  .manifesto-right { padding-top: 72px; }

  .quote-card {
    border: 1px solid rgba(123,94,167,0.2);
    background: rgba(123,94,167,0.05); padding: 48px; position: relative;
  }

  .quote-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 900; text-transform: uppercase;
    line-height: 1.1; margin-bottom: 24px; letter-spacing: .5px;
  }

  .quote-body { font-size: 14px; font-weight: 300; color: var(--muted); line-height: 1.85; }
  .quote-sig { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--purple-light); margin-top: 28px; font-weight: 700; }

  /* SERVICES */
  .services { background: var(--navy-deep); padding: 130px 56px; }

  .services-header { max-width: 1200px; margin: 0 auto 72px; display: flex; justify-content: space-between; align-items: flex-end; }
  .services-note { font-size: 14px; font-weight: 300; color: var(--muted); max-width: 300px; line-height: 1.7; text-align: right; }

  .services-list { max-width: 1200px; margin: 0 auto; border-top: 1px solid rgba(245,242,238,0.07); }

  .svc-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 0; border-bottom: 1px solid rgba(245,242,238,0.05);
    cursor: none; transition: all 0.3s ease;
  }
  .svc-row:hover { padding-left: 16px; }
  .svc-row:hover .svc-name { color: var(--purple-light); }

  .svc-l { display: flex; align-items: center; gap: 28px; }
  .svc-num { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; color: rgba(160,124,197,0.35); letter-spacing: 2px; min-width: 28px; }
  .svc-name { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; transition: color 0.3s; }
  .svc-tag { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); font-family: 'Barlow Condensed', sans-serif; font-weight: 700; margin-top: 3px; }
  .svc-desc { font-size: 13px; font-weight: 300; color: var(--muted); max-width: 340px; text-align: right; line-height: 1.6; }

  /* CLIENTS */
  .clients { background: var(--navy); padding: 130px 56px; position: relative; }
  .clients::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(123,94,167,0.4), transparent); }

  .clients-header { max-width: 1200px; margin: 0 auto 72px; display: flex; justify-content: space-between; align-items: flex-end; }
  .clients-note { font-size: 14px; font-weight: 300; color: var(--muted); max-width: 280px; line-height: 1.7; text-align: right; }

  .clients-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; max-width: 1200px; margin: 0 auto; }

  .client-card {
    background: var(--navy-mid); padding: 40px 32px;
    position: relative; overflow: hidden; cursor: none;
    transition: all 0.4s ease; min-height: 210px;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .client-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--purple-dark), var(--purple-light));
    transform: scaleX(0); transition: transform 0.4s ease; transform-origin: left;
  }
  .client-card:hover::before { transform: scaleX(1); }
  .client-card:hover { background: rgba(123,94,167,0.1); }

  .client-icon { position: absolute; top: 24px; right: 24px; font-size: 36px; opacity: 0.1; transition: opacity 0.4s ease; }
  .client-card:hover .client-icon { opacity: 0.28; }

  .client-sport { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--purple-light); margin-bottom: 10px; }
  .client-name { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; text-transform: uppercase; line-height: 1.05; margin-bottom: 8px; }
  .client-bio { font-size: 12px; font-weight: 300; color: var(--muted); line-height: 1.5; }

  .clients-footer { max-width: 1200px; margin: 40px auto 0; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 14px; font-weight: 700; }

  /* BRANDS */
  .brands { background: var(--navy-deep); padding: 130px 56px; }
  .brands-header { max-width: 1200px; margin: 0 auto 72px; }

  .brands-wall { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 2px; }
  .brand-item {
    background: var(--navy); padding: 22px 44px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: rgba(245,242,238,0.25);
    cursor: none; transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .brand-item::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--purple-dark), var(--purple));
    transform: translateY(100%); transition: transform 0.3s ease; z-index: 0;
  }
  .brand-item:hover::after { transform: translateY(0); }
  .brand-item:hover { color: var(--white); }
  .brand-item span { position: relative; z-index: 1; }

  /* HOW */
  .how { background: var(--navy); padding: 130px 56px; position: relative; }
  .how::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(123,94,167,0.4), transparent); }

  .how-layout { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 96px; }
  .how-left { position: sticky; top: 120px; align-self: start; }
  .how-note { font-size: 14px; font-weight: 300; color: var(--muted); line-height: 1.8; margin-top: 28px; }

  .how-steps { display: flex; flex-direction: column; gap: 2px; }
  .how-step {
    background: var(--navy-mid); padding: 36px 40px;
    display: flex; gap: 28px; align-items: flex-start;
    cursor: none; transition: background 0.3s;
  }
  .how-step:hover { background: rgba(123,94,167,0.1); }
  .step-n { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; color: var(--purple-light); letter-spacing: 2px; min-width: 24px; margin-top: 4px; }
  .step-title { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .step-desc { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.7; }

  /* CTA */
  .cta-block { background: linear-gradient(135deg, var(--navy-mid), var(--navy-deep)); padding: 160px 56px; text-align: center; position: relative; overflow: hidden; }
  .cta-block::before {
    content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 60vw; height: 60vw;
    background: radial-gradient(circle, rgba(123,94,167,0.2) 0%, transparent 60%);
    pointer-events: none;
  }

  .cta-kicker { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase; color: var(--purple-light); margin-bottom: 28px; position: relative; z-index: 1; }

  .cta-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(64px, 10vw, 130px); font-weight: 900; line-height: 0.88; text-transform: uppercase; margin-bottom: 24px; position: relative; z-index: 1; }
  .cta-title .line-g { background: linear-gradient(90deg, var(--white), var(--purple-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: block; }

  .cta-sub { font-size: 16px; font-weight: 300; color: var(--muted); margin-bottom: 56px; position: relative; z-index: 1; }

  .cta-buttons { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 12px;
    background: linear-gradient(135deg, var(--purple-dark), var(--purple));
    color: var(--white); padding: 20px 52px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;
    border: none; cursor: none; font-weight: 700; transition: all 0.3s ease;
  }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(123,94,167,0.3); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 12px;
    background: transparent; color: var(--white); padding: 20px 52px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;
    border: 1px solid rgba(245,242,238,0.15); cursor: none; font-weight: 700; transition: all 0.3s ease;
  }
  .btn-secondary:hover { border-color: var(--purple-light); color: var(--purple-light); transform: translateY(-3px); }

  /* FOOTER */
  footer { background: var(--navy-deep); padding: 72px 56px 40px; border-top: 1px solid rgba(245,242,238,0.05); }

  .footer-top { display: flex; justify-content: space-between; align-items: flex-start; max-width: 1200px; margin: 0 auto 56px; }

  .footer-logo-big {
    font-family: 'Barlow Condensed', sans-serif; font-size: 80px; font-weight: 900; line-height: .9; letter-spacing: -2px;
    background: linear-gradient(135deg, var(--purple-light), var(--purple-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .footer-claim { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--muted); margin-top: 12px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; }

  .footer-nav { display: flex; flex-direction: column; gap: 16px; align-items: flex-end; }
  .footer-link { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); text-decoration: none; cursor: none; font-weight: 700; transition: color 0.3s; }
  .footer-link:hover { color: var(--purple-light); }

  .footer-bottom { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(245,242,238,0.05); padding-top: 28px; }
  .footer-copy { font-size: 11px; color: rgba(245,242,238,0.18); letter-spacing: 1px; }
  .footer-ig { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(245,242,238,0.18); text-decoration: none; cursor: none; transition: color 0.3s; }
  .footer-ig:hover { color: var(--purple-light); }

  /* REVEAL */
  .r { opacity: 0; transform: translateY(28px); transition: opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1); }
  .r.in { opacity: 1; transform: translateY(0); }
  .r.d1 { transition-delay: .1s; } .r.d2 { transition-delay: .2s; } .r.d3 { transition-delay: .3s; } .r.d4 { transition-delay: .45s; } .r.d5 { transition-delay: .55s; }

  @media (max-width: 960px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .hero, .manifesto, .services, .clients, .brands, .how, .cta-block { padding-left: 24px; padding-right: 24px; }
    footer { padding: 56px 24px 32px; }
    .manifesto-layout { grid-template-columns: 1fr; gap: 48px; }
    .manifesto-right { padding-top: 0; }
    .services-header, .clients-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    .services-note, .clients-note { text-align: left; max-width: 100%; }
    .svc-desc { display: none; }
    .clients-grid { grid-template-columns: repeat(2, 1fr); }
    .how-layout { grid-template-columns: 1fr; gap: 48px; }
    .how-left { position: static; }
    .footer-top { flex-direction: column; gap: 40px; }
    .footer-nav { align-items: flex-start; }
    .footer-bottom { flex-direction: column; gap: 12px; }
  }
`;

const clients = [
  { name: "Bia Bulcão", sport: "Esgrima", bio: "Atleta olímpica e creator", icon: "🤺" },
  { name: "Dani Germano", sport: "Flag Football", bio: "NFL & curadoria esportiva", icon: "🏈" },
  { name: "Alana Ambrósio", sport: "Multiesporte", bio: "Creator & live host", icon: "🎙️" },
  { name: "Voz Futura", sport: "Projeto Especial", bio: "Narrativa & conteúdo", icon: "🎤" },
  { name: "Adriana Araújo", sport: "Boxe", bio: "Atleta olímpica", icon: "🥊" },
  { name: "Rafaela Silva", sport: "Judô", bio: "Campeã olímpica", icon: "🥋" },
  { name: "Formiga", sport: "Futebol", bio: "Lenda do futebol brasileiro", icon: "⚽" },
  { name: "+ Atletas", sport: "W Network", bio: "A rede cresce a cada dia", icon: "⭐" },
];

const brands = [
  "Nike", "Adidas", "Globo", "SporTV", "Itaú", "Banco do Brasil",
  "Vivo", "Bradesco", "Havaianas", "O Boticário", "Gatorade",
  "Red Bull", "Melitta", "Real Madrid",
];

const services = [
  { num: "01", name: "Inteligência Editorial", tag: "Conteúdo", desc: "Estratégia de narrativa alinhada à atleta e à marca. Muito mais do que post." },
  { num: "02", name: "Social Media", tag: "Digital", desc: "Gestão de redes com resultado. Primeiro trabalha, depois posta." },
  { num: "03", name: "Comercial Ativo", tag: "Parcerias", desc: "Prospecção de marcas. Comissão abaixo da média. Pagamento direto ao creator." },
  { num: "04", name: "Assessoria Jurídica", tag: "Contratos", desc: "Apoio jurídico em todo o processo. Transparência em cada negociação." },
  { num: "05", name: "Audiovisual", tag: "Produção", desc: "Vídeos, reels, coberturas. Produção com identidade e intenção editorial." },
  { num: "06", name: "PR & Estratégia", tag: "Posicionamento", desc: "Marca pessoal. Narrativa que constrói autoridade real no esporte." },
];

const steps = [
  { n: "01", title: "Briefing", desc: "Entendemos sua história e objetivos. Sem rodeios, direto ao ponto." },
  { n: "02", title: "Estratégia", desc: "Plano editorial e comercial personalizado. Conteúdo com intenção, não só volume." },
  { n: "03", title: "Criação", desc: "Produção com identidade. Cada entrega reflete quem você é e o que você defende." },
  { n: "04", title: "Comercial", desc: "Conectamos marcas que fazem sentido com a sua narrativa. Nada genérico." },
  { n: "05", title: "Resultados", desc: "Análise contínua e transparência total. Suporte direto via WhatsApp com as sócias." },
];

function useReveal(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

function R({ children, d = 0, tag = "div" }) {
  const ref = useRef();
  const vis = useReveal(ref);
  const Tag = tag;
  return <Tag ref={ref} className={`r${vis ? " in" : ""}${d ? ` d${d}` : ""}`}>{children}</Tag>;
}

export default function App() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const moveR = (e) => setRing({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", moveR);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", moveR);
    };
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className="cursor" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

      {/* NAV */}
      <nav>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="logo-w">W</span>
          <span className="logo-sep" />
          <span className="logo-text">Content</span>
        </div>
        <ul className="nav-links">
          {[["manifesto","Manifesto"],["servicos","Serviços"],["clientes","Atletas"],["marcas","Marcas"],["contato","Contato"]].map(([id, label]) => (
            <li key={id}><a href="#" onClick={e => { e.preventDefault(); go(id); }}>{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-lines" />
        <div className="hero-glow" />
        <div className="hero-tag">Desde 2014 — São Paulo, SP</div>
        <h1 className="hero-title">
          <span>Sports Bring</span>
          <span className="line-grad">Women</span>
          <span className="line-out">Together.</span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-sub">A agência de conteúdo e influência especializada em construir narrativas para mulheres no esporte. End to end.</p>
          <button className="hero-cta" onClick={() => go("manifesto")}><span>Conheça a W →</span></button>
        </div>
        <div className="hero-scroll"><div className="scroll-bar" />scroll</div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto" id="manifesto">
        <div className="manifesto-layout">
          <div>
            <R><div className="section-label">Manifesto W</div></R>
            <R d={1}><h2 className="manifesto-punch">Acreditamos que a <em>equidade de gênero</em> é o melhor caminho para o mundo.</h2></R>
            <R d={2}><p className="manifesto-body">
              Existimos para que meninas e mulheres encontrem <strong>pertencimento e empoderamento</strong> através do esporte. Em um lugar onde até pouco tempo atrás existia narrativa única, trabalhar com a pluralidade e diversidade é essencial.
              <br /><br />
              A W Content atua de forma <strong>end to end</strong>: da criação à análise de resultados, do comercial ativo ao jurídico — com atendimento direto das sócias e transparência em todo o processo.
            </p></R>
            <R d={3}><div className="stats-row">
              <div className="stat"><div className="stat-n">10+</div><div className="stat-l">Anos de mercado</div></div>
              <div className="stat"><div className="stat-n">50+</div><div className="stat-l">Atletas atendidas</div></div>
              <div className="stat"><div className="stat-n">100+</div><div className="stat-l">Marcas parceiras</div></div>
            </div></R>
          </div>
          <div className="manifesto-right">
            <R d={2}><div className="quote-card">
              <div className="quote-headline">Primeiro trabalha,<br />depois posta.</div>
              <p className="quote-body">Na W, a gente respira o esporte muito além do campo. Nosso jeito de trabalhar é diferente: queremos que nossas clientes se tornem referência por conta do próprio trabalho. Isso é sucesso pra nós.</p>
              <div className="quote-sig">— W Content</div>
            </div></R>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="servicos">
        <div className="services-header">
          <div>
            <R><div className="section-label">Serviços</div></R>
            <R d={1}><h2 className="big-title">Como<br />Trabalhamos</h2></R>
          </div>
          <R d={2}><p className="services-note">Estratégia, social, audiovisual, PR e comercial. Tudo integrado, tudo com intenção.</p></R>
        </div>
        <div className="services-list">
          {services.map((s, i) => (
            <R key={i} d={Math.min(i + 1, 5)}>
              <div className="svc-row">
                <div className="svc-l">
                  <span className="svc-num">{s.num}</span>
                  <div>
                    <div className="svc-name">{s.name}</div>
                    <div className="svc-tag">{s.tag}</div>
                  </div>
                </div>
                <div className="svc-desc">{s.desc}</div>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="clients" id="clientes">
        <div className="clients-header">
          <div>
            <R><div className="section-label">Nossas Atletas</div></R>
            <R d={1}><h2 className="big-title">Quem<br />Representa<br />a W.</h2></R>
          </div>
          <R d={2}><p className="clients-note">Creators, atletas olímpicas, comunicadoras. Mulheres mudando a narrativa do esporte.</p></R>
        </div>
        <div className="clients-grid">
          {clients.map((c, i) => (
            <R key={i} d={Math.min((i % 4) + 1, 4)}>
              <div className="client-card">
                <div className="client-icon">{c.icon}</div>
                <div className="client-sport">{c.sport}</div>
                <div className="client-name">{c.name}</div>
                <div className="client-bio">{c.bio}</div>
              </div>
            </R>
          ))}
        </div>
        <div className="clients-footer">
          <span style={{ width: 24, height: 1, background: 'var(--purple-light)', display: 'inline-block' }} />
          Sua história também pode ser contada pela W
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands" id="marcas">
        <div className="brands-header">
          <R><div className="section-label">Marcas Parceiras</div></R>
          <R d={1}><h2 className="big-title">Quem Confia<br />na W.</h2></R>
        </div>
        <div className="brands-wall">
          {brands.map((b, i) => (
            <R key={i} d={Math.min((i % 5) + 1, 5)}>
              <div className="brand-item"><span>{b}</span></div>
            </R>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="processo">
        <div className="how-layout">
          <div className="how-left">
            <R><div className="section-label">Processo</div></R>
            <R d={1}><h2 className="big-title">End<br />to<br />End.</h2></R>
            <R d={2}><p className="how-note">Da criação à análise de resultados. Suporte direto com as sócias via WhatsApp, sem intermediários.</p></R>
          </div>
          <div className="how-steps">
            {steps.map((s, i) => (
              <R key={i} d={i + 1}>
                <div className="how-step">
                  <div className="step-n">{s.n}</div>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-block" id="contato">
        <R><div className="cta-kicker">Sports Bring Women Together</div></R>
        <R d={1}><h2 className="cta-title"><span className="line-g">Vamos</span><span>Começar?</span></h2></R>
        <R d={2}><p className="cta-sub">Seja você uma atleta ou uma marca — a W Content está pronta para a sua história.</p></R>
        <R d={3}><div className="cta-buttons">
          <button className="btn-primary" onClick={() => window.open("https://instagram.com/w__content", "_blank")}>@w__content no Instagram</button>
          <button className="btn-secondary" onClick={() => window.open("https://linkedin.com/company/wcontentco", "_blank")}>LinkedIn W Content</button>
        </div></R>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo-big">W</div>
            <div className="footer-claim">Sports Bring Women Together</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, letterSpacing: 1, fontFamily: 'Barlow Condensed, sans-serif' }}>
              A Agência de Conteúdo e Influência da Mulher no Esporte
            </div>
          </div>
          <nav className="footer-nav">
            {[["manifesto","Manifesto"],["servicos","Serviços"],["clientes","Atletas"],["marcas","Marcas"],["contato","Contato"]].map(([id, label]) => (
              <a key={id} className="footer-link" href="#" onClick={e => { e.preventDefault(); go(id); }}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 W Content — São Paulo, SP — Todos os direitos reservados.</span>
          <a className="footer-ig" href="https://instagram.com/w__content" target="_blank" rel="noopener">@w__content</a>
        </div>
      </footer>
    </>
  );
}
