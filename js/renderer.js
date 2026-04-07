/**
 * Renders the data array into the target container.
 * @param {Array} data - The array of module sections
 * @param {String} containerId - The ID of the div to render inside
 */
function renderModule(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !data) return;

    let html = '';

    data.forEach((section, index) => {
        // Last section gets pb-16 and border-b instead of standard section wrapper
        const isLast = index === data.length - 1;
        const sectionClass = isLast ? "section-wrapper border-b border-white/5 pb-16" : "section-wrapper";
        
        html += `
        <section id="section-${index}" class="${sectionClass}" data-aos="fade-up">
            <div class="glow-line"></div>
            
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-3xl font-bold text-white">${index + 1}. ${section.title}</h2>
            </div>
            
            <p class="text-slate-400 mb-6 leading-relaxed">${section.description}</p>
        `;

        // Render commands if they exist
        if (section.commands) {
            section.commands.forEach(cmd => {
                html += `
                <div class="mb-6 group">
                    <p class="text-sm text-slate-300 mb-2">${cmd.description}</p>
                    <div class="bg-[#0a0a0a] border border-white/10 rounded-xl p-3 code-wrapper relative hover:border-[#38bdf8]/50 transition-colors cursor-pointer group/code">
<pre class="language-${cmd.language}"><code class="language-${cmd.language}">${cmd.code}</code></pre>
                        <button class="copy-btn absolute top-3 right-3 text-slate-500 opacity-0 group-hover/code:opacity-100 transition-opacity hover:text-[#38bdf8]" title="Copy to clipboard">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>
                `;
            });
        }

        // Render alert if it exists
        if (section.alert) {
             html += `
            <div class="alert-box mt-4">
                <div class="alert-title">${section.alert.title}</div>
                <p class="text-slate-300 text-sm">
                    ${section.alert.message}
                </p>
            </div>
             `;
        }

        // Pattern Breakers
        if (section.didYouKnow) {
            html += `
            <div class="my-12 px-6 py-8 bg-[#38bdf8]/10 border border-[#38bdf8]/30 rounded-2xl shadow-lg relative flex flex-col items-center text-center max-w-2xl mx-auto">
                <div class="absolute -top-5 bg-[#38bdf8] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h4 class="text-lg font-bold text-white mb-2 mt-2">${section.didYouKnow.title}</h4>
                <p class="text-slate-300 italic">"${section.didYouKnow.content}"</p>
            </div>
            `;
        }

        if (section.proTip) {
            html += `
            <div class="my-10 border-l-4 border-[#38bdf8] bg-[#38bdf8]/5 p-6 rounded-r-lg shadow-sm">
                <h4 class="text-[#38bdf8] font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> 
                    ${section.proTip.title}
                </h4>
                <p class="text-slate-300 text-base leading-relaxed">${section.proTip.content}</p>
            </div>
            `;
        }

        if (section.quiz) {
            html += `
            <div class="my-12 group cursor-pointer" style="perspective: 1000px;">
                <div class="relative bg-black/40 border border-white/10 rounded-xl p-8 hover:border-[#38bdf8]/50 transition-all duration-500 overflow-hidden text-center">
                    <div class="absolute blur-3xl w-32 h-32 bg-[#38bdf8]/10 -top-10 -left-10 rounded-full z-0"></div>
                    <div class="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                        <span class="inline-block text-xs font-bold tracking-[0.2em] text-[#38bdf8] mb-4 bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/20">QUICK QUIZ</span>
                        <h4 class="text-xl text-white font-medium mb-2">${section.quiz.question}</h4>
                        <p class="text-slate-400 text-sm mt-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">Hover to reveal answer</p>
                    </div>
                    <div class="absolute inset-0 bg-[#0a0a0a] border border-[#38bdf8]/30 flex items-center justify-center p-6 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 rounded-xl">
                        <p class="text-white text-lg font-medium leading-relaxed">${section.quiz.answer}</p>
                    </div>
                </div>
            </div>
            `;
        }

        html += `</section>`;
    });

    container.innerHTML = html;

    // Generate Table of Contents if element exists
    const tocContainer = document.getElementById('toc-list');
    if (tocContainer) {
        let tocHtml = '';
        data.forEach((section, index) => {
            tocHtml += `<a href="#section-${index}" class="block py-2 text-sm text-slate-400 hover:text-[#38bdf8] transition-colors border-l-2 border-transparent hover:border-[#38bdf8] pl-4">${index + 1}. ${section.title}</a>`;
        });
        tocContainer.innerHTML = tocHtml;
    }
    
    // Re-highlight using PrismJS because content was injected dynamically
    if (window.Prism) {
        Prism.highlightAllUnder(container);
    }
}
