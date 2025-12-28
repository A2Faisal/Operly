import React, { useState, useEffect } from 'react';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Reveal Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal(); // Initial check

    return () => window.removeEventListener("scroll", reveal);
  }, []);

  // Professional Navigation Fix: Scrolls to top and clears URL hash
  const goToHome = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, null, window.location.pathname);
    setIsMobileMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Maps to your Name, Email, Dropdown, and Textarea in order
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      interest: e.target[2].value,
      message: e.target[3].value
    };
  
    try {
      const response = await fetch('./contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        document.getElementById('contact-form').classList.add('hidden');
        document.getElementById('success-msg').classList.remove('hidden');
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  const copyEmail = () => {
    window.location.href = "mailto:admin@operly.org";
  };

  return (
    <div className="text-slate-900 min-h-screen text-pretty">
      {/* Internal CSS for consistent styling across professional builds */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');
        
        :root {
            --brand-navy: #0f172a;
            --brand-emerald: #10b981;
            --brand-sand: #fdfcf7;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--brand-sand);
        }
        h1, h2, h3, h4, .serif {
            font-family: 'Playfair Display', serif;
        }
        .btn-vibrant {
            background: var(--brand-navy);
            color: white !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-vibrant:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.2);
            background: #1e293b;
        }
        .img-mask {
            border-radius: 80px 10px 80px 10px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .nav-link {
            position: relative;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--brand-emerald);
            transition: width .3s;
        }
        .nav-link:hover::after {
            width: 100%;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite ease-in-out;
        }
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={goToHome}>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Operly</span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide uppercase text-slate-500">
            <a href="#services" className="nav-link">Services</a>
            <a href="#packages" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">Our Story</a>
            <a href="#contact" className="btn-vibrant px-6 py-3 rounded-full">Book Call</a>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-b px-6 py-6 flex flex-col space-y-4 font-semibold uppercase text-xs tracking-widest`}>
          <a href="#home" onClick={goToHome}>Home</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#packages" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-600">Book Call</a>
        </div>
      </nav>

      <main id="home" className="pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal active">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">Premium Support for Founders</span>
            <h1 className="text-5xl md:text-7xl font-medium mb-8 leading-[1.1]">
              Your business, <br /><span className="italic serif">run elegantly.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Operly handles the complex operations and daily administration that steal your focus. We don't just "do tasks"—we own outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="#contact" className="btn-vibrant w-full sm:w-auto px-10 py-5 rounded-full text-lg font-bold shadow-2xl text-center">
                Book a Consultation
              </a>
              <span className="text-slate-400 text-sm">60 mins • Free</span>
            </div>
          </div>
          <div className="relative group reveal active">
            {/* Status Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 glass-card p-6 rounded-2xl hidden lg:block shadow-xl border border-white/50 animate-bounce-slow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tighter text-slate-400">Status</p>
                  <p className="text-sm font-bold text-slate-900">Operations Balanced</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
              className="img-mask shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] w-full object-cover aspect-[4/5] relative z-10"
              alt="Operly Premium Workspace" />
          </div>
        </section>

        {/* The Operly Promise Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100 text-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-slate-900">The Operly Promise</h2>
            <p className="text-slate-500 text-lg mb-20">We move metrics, not just mouse cursors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group reveal">
              <div className="overflow-hidden rounded-[40px] shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl h-full">
                <div className="bg-emerald-50/30 p-10 h-full flex flex-col justify-center items-center text-center">
                   <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   </div>
                   <h4 className="text-2xl font-bold mb-4 text-slate-900">Free Consultation</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">60-minute complimentary business deep-dive to understand your workflows before you commit.</p>
                </div>
              </div>
            </div>
            <div className="group reveal">
              <div className="overflow-hidden rounded-[40px] shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl h-full">
                <div className="bg-blue-50/30 p-10 h-full flex flex-col justify-center items-center text-center">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <h4 className="text-2xl font-bold mb-4 text-slate-900">Fast Onboarding</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">Get fully operational and start delegating your first tasks within just 24 hours.</p>
                </div>
              </div>
            </div>
            <div className="group reveal">
              <div className="overflow-hidden rounded-[40px] shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl h-full">
                <div className="bg-rose-50/30 p-10 h-full flex flex-col justify-center items-center text-center">
                   <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                   </div>
                   <h4 className="text-2xl font-bold mb-4 text-slate-900">Quick Replacement</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">Not the right fit? We provide a guaranteed replacement within 48 hours for total continuity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
            <div className="reveal">
              <h2 className="text-6xl font-medium mb-8 leading-tight text-slate-900 italic">Expertise <br />without the <br /><span className="italic serif text-emerald-600">overhead.</span></h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">Operly acts as your internal operations department. We don't wait for instructions; we suggest improvements and implement systems that scale.</p>
            </div>
            <div className="reveal">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" className="rounded-[40px] shadow-2xl h-96 w-full object-cover" alt="Operational Excellence" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "Communication Mastery", icon: "emerald", text: "We handle the gatekeeping. Inboxes are cleared, leads are nurtured, and urgent requests are prioritized before you even log in.", outcome: "Zero missed opportunities." },
              { title: "Strategic Logistics", icon: "blue", text: "Travel booking, event coordination, and complex scheduling. We manage the puzzle so you can arrive prepared and focused.", outcome: "A protected schedule." },
              { title: "Task Coordination", icon: "indigo", text: "Stay on track with clear deadline management across your business. We manage the 'doing' so you can stay in high-level thinking.", outcome: "Zero missed deadlines." },
              { title: "Daily Operations Flow", icon: "amber", text: "Your business keeps moving even when you're offline. We manage reminders and team alignment checks.", outcome: "Sustainable momentum." }
            ].map((service, idx) => (
              <div key={idx} className="p-12 bg-white rounded-[40px] border border-slate-100 hover:shadow-xl transition-all duration-500 reveal group">
                <div className={`w-14 h-14 bg-${service.icon}-100 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
                  <svg className={`w-6 h-6 text-${service.icon}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">{service.text}</p>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${service.icon}-500 rounded-full animate-pulse`}></div>
                  <p className={`font-bold text-${service.icon}-600 text-sm uppercase tracking-widest`}>Outcome: {service.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="packages" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
          <div className="text-center mb-20 reveal">
            <h2 className="text-5xl font-medium mb-4 text-slate-900">Support Levels</h2>
            <p className="text-slate-500 text-lg">Retainer-based solutions. Request our private pricing guide for details.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 reveal h-full flex flex-col shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Essential Support</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-8 font-bold">Foundation</p>
              <p className="text-slate-600 mb-8 font-medium">Reliable daily operations for solo founders.</p>
              <ul className="space-y-4 mb-10 text-sm font-medium text-slate-500 mt-auto">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>Inbox Management</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>Daily Scheduling</li>
              </ul>
              <a href="#contact" className="block text-center w-full py-4 rounded-full border border-slate-200 font-bold hover:bg-slate-50 transition text-slate-900">Request Pricing</a>
            </div>
            <div className="bg-slate-900 text-white p-12 rounded-3xl shadow-2xl relative md:-translate-y-4 reveal h-full flex flex-col">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-500 text-white text-[10px] uppercase px-4 py-2 rounded-full font-bold">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2 text-white">Growth Support</h3>
              <p className="text-xs uppercase tracking-widest text-emerald-400 mb-8 font-bold">Scale</p>
              <p className="text-slate-300 mb-8 font-medium">Deeply integrated partner for active client rotations.</p>
              <ul className="space-y-4 mb-10 text-sm font-medium mt-auto">
                <li className="flex items-center text-slate-300"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>Lead Nurture Flow</li>
                <li className="flex items-center text-slate-300"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>CRM Ownership</li>
              </ul>
              <a href="#contact" className="block text-center w-full py-4 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">Get Quote</a>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 reveal h-full flex flex-col shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Operations Partner</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-8 font-bold">Strategic Integration</p>
              <p className="text-slate-600 mb-8 font-medium">Full integration managing business cycles.</p>
              <ul className="space-y-4 mb-10 text-sm font-medium text-slate-500 mt-auto">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>Stakeholder Management</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>Project Management</li>
              </ul>
              <a href="#contact" className="block text-center w-full py-4 rounded-full border border-slate-200 font-bold hover:bg-slate-50 transition text-slate-900">Request Pricing</a>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="reveal">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                   className="rounded-[60px] shadow-2xl grayscale hover:grayscale-0 transition duration-1000 w-full object-cover aspect-square"
                   alt="Collaborative Partner Team" />
            </div>
            <div className="reveal">
              <h2 className="text-5xl font-medium mb-8 leading-tight text-slate-900 italic serif uppercase tracking-tight"><span className="text-emerald-600">Operly</span> is founder-led.</h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>Operly is a founder-led Virtual Assistant agency that provides essential support to growing businesses. We relieve operational burdens for founders, coaches, and service providers, allowing them to focus on growth.</p>
                <p>We believe in structure, predictability, and the freedom that comes from knowing your operations are in expert hands.</p>
                <p>Based in Canada and serving clients globally, we bring a level of care and precision that goes beyond standard assistance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
          <div className="text-center mb-16 reveal">
            <h2 className="text-6xl font-medium mb-6 text-slate-900 tracking-tight">Let’s reclaim <br />your headspace.</h2>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-y border-slate-100 py-6">
              {["Confidentiality as standard", "Direct partner access", "Private pricing guide post-call"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">✓</div> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto text-left">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 reveal h-fit">
              <form onSubmit={handleSubmit} id="contact-form" className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Your Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Email</label>
                  <input type="email" required placeholder="john@company.com" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm outline-none" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Interested In</label>
                    <div className="relative">
                        <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm outline-none appearance-none cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Pricing & Packages</option>
                        <option>Free Consultation (60 mins)</option>
                        <option>Dedicated VA Support</option>
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                        </div>
                    </div>
                    </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Current BottleNeck</label>
                  <textarea rows="4" required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition font-medium resize-none text-sm outline-none" placeholder="Tell us what's keeping you busy..."></textarea>
                </div>
                <button type="submit" className="w-full btn-vibrant py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95">Send Inquiry</button>
              </form>
              <div id="success-msg" className="hidden text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
                <h4 className="text-2xl font-bold mb-2">Message Sent</h4>
                <p className="text-slate-500 font-medium">We'll be in touch with requested details within 24 hours.</p>
              </div>
            </div>

            <div className="reveal h-full flex flex-col justify-center">
              <div className="bg-white p-12 rounded-[40px] shadow-xl border-2 border-emerald-50/50">
                <h3 className="text-3xl font-medium mb-6 leading-tight text-slate-900 tracking-tight">Direct Reach</h3>
                <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">Prefer direct communication? Reach our lead partners instantly via email.</p>
                <button onClick={copyEmail} className="flex items-center gap-6 group p-5 rounded-[32px] bg-emerald-50/50 hover:bg-emerald-50 transition-all border border-emerald-100/50 w-full">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/60 mb-1">Email Our Team</p>
                    <p className="text-2xl font-bold text-slate-900">admin@operly.org</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-24 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-left">
            <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-8 cursor-pointer" onClick={goToHome}>
                <div className="w-8 h-8 bg-emerald-500 rounded-lg"></div>
                <span className="text-2xl font-bold tracking-tight">Operly</span>
            </div>
            <p className="text-slate-400 max-w-sm text-lg font-medium leading-relaxed">
                Premium operational partnership for founders who value deep work over shallow admin.
            </p>
            </div>
            
            <div>
            <h4 className="font-bold mb-8 text-emerald-400 uppercase text-[15px] tracking-[0.2em]">Region</h4>
            <div className="space-y-2 text-slate-300 font-medium">
                <p>Headquartered in Canada.</p>
                <p>Serving Globally.</p>
            </div>
            </div>
            
            <div>
            <h4 className="font-bold mb-8 text-emerald-400 uppercase text-[15px] tracking-[0.2em]">Legal</h4>
            <div className="space-y-2 text-slate-300 text-sm font-medium">
                <p>Confidentiality Assured.</p>
                <p>Direct Partner Access.</p>
                <p>Cancel Anytime.</p>
            </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 OPERLY OPERATIONS LTD.</p>
            <p className="italic">PREDICTABLE CALM. PROFESSIONAL SCALE.</p>
        </div>
        </footer>
    </div>
  );
};

export default App;