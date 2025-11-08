import React, { useRef, useEffect, useState } from 'react';

// Custom CSS for slide animations
const customStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleId = 'elkaid-vs-traditional-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = customStyles;
    document.head.appendChild(style);
  }
}

// EL KAID VS TRADITIONAL FINANCES Section Component
const ElKaidVsTraditionalFinances = () => {
  const circleRef = useRef(null);
  const arcRef = useRef(null);
  const sectionRef = useRef(null);
  const [activePointIndex, setActivePointIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  const traditionalPoints = [
    'Operate within certain hours',
    'Very high transaction fees and taxes',
    'Banking apps can be hacked',
    'Transactions are controlled by banks',
    'Cannot be provided to some groups of people'
  ];

  const bitcoinPoints = [
    'Operate 24/7 without interruption',
    'Provide fast and cheap transactions',
    'Transactions cannot be intercepted or reversed',
    'Free from third-party interference',
    'Accessible to everyone regardless of their status'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!arcRef.current || !sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress through the sticky section
      // Progress goes from 0 (section starts) to 1 (section ends)
      const currentScroll = window.scrollY;
      const sectionTop = section.offsetTop;
      const scrollStart = sectionTop - windowHeight;
      const scrollEnd = sectionTop + sectionHeight - windowHeight;
      
      // Detect scroll direction only when within section bounds
      if (currentScroll >= scrollStart && currentScroll <= scrollEnd) {
        if (currentScroll > lastScrollY.current) {
          setScrollDirection('down');
        } else if (currentScroll < lastScrollY.current) {
          setScrollDirection('up');
        }
      }
      lastScrollY.current = currentScroll;
      const scrollRange = scrollEnd - scrollStart;

      let progress = 0;
      if (scrollRange > 0) {
        progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / scrollRange));
      }

      // Rotate arc smoothly based on scroll progress - maintains position
      const rotation = progress * 720; // 2 full rotations as you scroll
      if (arcRef.current) {
        arcRef.current.style.transform = `rotate(${rotation}deg)`;
        arcRef.current.style.transformOrigin = '50% 50%';
        arcRef.current.style.transition = 'none'; // Prevent any CSS transitions
      }

      // Update active point index (0-4) with hold zones
      // Cards hold still until complete text is visible, then transition
      const numPoints = 5;
      const sectionSize = 1 / numPoints; // 0.2 per section (20% each)
      const holdPercentage = 0.95; // Hold card for 95% of section to ensure text is fully visible

      // Calculate which section we're in
      let sectionIndex = Math.floor(progress / sectionSize);
      sectionIndex = Math.min(sectionIndex, numPoints - 1);

      // Within each section, check if we're still in the hold zone
      const sectionProgress = (progress % sectionSize) / sectionSize;
      const isInHoldZone = sectionProgress < holdPercentage;

      // Determine point index - hold current card until hold zone ends
      let pointIndex = sectionIndex;
      if (!isInHoldZone && sectionIndex < numPoints - 1) {
        // Only transition to next point after hold zone completes
        pointIndex = sectionIndex + 1;
      }

      // Clamp to valid range
      pointIndex = Math.min(Math.max(0, pointIndex), numPoints - 1);

      setActivePointIndex(pointIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = ['Accessibility', 'Transactions', 'Security', 'Inclusivity', 'Bias'];

  return (
    <>
      {/* ================= EL KAID VS TRADITIONAL FINANCES ================= */}
      <section ref={sectionRef} className="relative py-16 px-4 bg-black" style={{ minHeight: '260vh' }}>
        <div className="max-w-7xl mx-auto w-full sticky top-12 md:top-16">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-[#9B8AFB] uppercase tracking-widest text-sm mb-3">
              Comparison
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-white">
              EL&nbsp;KAID vs Traditional<br />Finances
            </h2>
          </div>

          {/* Main Layout */}
          <div className="relative flex flex-col items-center gap-2">
            {/* Top Row - Headers */}
            <div className="flex items-center justify-center gap-6 w-full max-w-7xl">
              {/* Traditional Finances */}
              <div className="flex-1 max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tl-[120px] rounded-br-[120px] p-10 min-h-[200px] flex flex-col justify-center items-center text-center">
                <p className="text-white/60 uppercase tracking-wider text-xs mb-2">
                  Traditional
                </p>
                <h3 className="text-3xl font-light text-white">
                  Finances
                </h3>
              </div>

              {/* EL KAID */}
              <div className="flex-1 max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tr-[120px] rounded-bl-[120px] p-10 min-h-[200px] flex flex-col justify-center items-center text-center">
                <p className="text-white/60 uppercase tracking-wider text-xs mb-2">
                  AI-Powered
                </p>
                <h3 className="text-3xl font-light text-white">
                  EL&nbsp;KAID
                </h3>
              </div>
            </div>

            {/* Center Rotating Arc */}
            <div className="relative w-40 h-40 md:w-44 md:h-44 flex items-center justify-center">
              {/* Background circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              
              {/* Rotating Arc Image */}
              <div ref={arcRef} className="absolute inset-0 flex items-center justify-center" style={{ willChange: 'transform' }}>
                <img 
                  src="/YOUR_ARC_IMAGE_URL_HERE.png.jpg" 
                  alt="" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>

              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span 
                  key={`label-${activePointIndex}`}
                  className="text-white/80 text-base md:text-lg font-light"
                  style={{
                    animation: 'fadeIn 1.2s ease-out'
                  }}
                >
                  {labels[activePointIndex]}
                </span>
              </div>
            </div>

            {/* Bottom Row - Descriptions */}
            <div className="flex items-start justify-center gap-6 w-full max-w-7xl">
              {/* Traditional Descriptions */}
              <div className="flex-1 max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tr-[120px] rounded-bl-[120px] p-10 min-h-[200px] flex items-center justify-center overflow-hidden">
                <div 
                  key={`traditional-${activePointIndex}`}
                  className="text-white/80 text-base md:text-lg leading-relaxed text-center"
                  style={{
                    animation: scrollDirection === 'down' 
                      ? 'slideUp 0.8s ease-out' 
                      : 'slideDown 0.8s ease-out'
                  }}
                >
                  {traditionalPoints[activePointIndex]}
                </div>
              </div>

              {/* EL KAID Descriptions */}
              <div className="flex-1 max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tl-[120px] rounded-br-[120px] p-10 min-h-[200px] flex items-center justify-center overflow-hidden">
                <div 
                  key={`bitcoin-${activePointIndex}`}
                  className="text-white/80 text-base md:text-lg leading-relaxed text-center"
                  style={{
                    animation: scrollDirection === 'down' 
                      ? 'slideUp 0.8s ease-out' 
                      : 'slideDown 0.8s ease-out'
                  }}
                >
                  {bitcoinPoints[activePointIndex]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElKaidVsTraditionalFinances;