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
    'Evolved Finance Rooted in vision. Designed for growth',
    'Seamless Transactions flowing beyond boundaries',
    'Built to think, designed to evolve',
    'Adaptive Flow Powering motion with precision'
  ];

  const bitcoinPoints = [
    'Operate 24/7 without interruption',
    '⁠Crafted for stability. Driven by intelligence',
    'Speed with purpose. Trust in every move',
    'Intelligent Workspace where clarity meets creation',
    '⁠Dynamic flow Connecting finance to intelligence'
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

  const labels = ['Accessibility', 'Finance', 'Transcation', 'Workspace', 'Flow'];

  return (
    <>
      {/* ================= EL KAID VS TRADITIONAL FINANCES ================= */}
      <section 
        ref={sectionRef} 
        className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-black" 
        style={{ minHeight: 'clamp(200vh, 260vh, 300vh)' }}
      >
        <div className="max-w-7xl mx-auto w-full sticky top-4 sm:top-8 md:top-12 lg:top-16">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
            <p className="text-[#9B8AFB] uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 px-2">
    Originality
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-2 leading-tight"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '0.05em',
              }}
            >
              EL&nbsp;KAID Designed Different<br className="hidden sm:block" />{' '}
              <span className="sm:hidden"> </span>Built for Progress
            </h2>
          </div>

          {/* Main Layout */}
          <div className="relative flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
            {/* Top Row - Headers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl">
              {/* Traditional Finances */}
              <div className="flex-1 w-full sm:max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tl-[20px] sm:rounded-tl-[30px] md:rounded-tl-[40px] lg:rounded-tl-[80px] xl:rounded-tl-[120px] rounded-tr-[20px] sm:rounded-tr-none rounded-br-[20px] sm:rounded-br-[30px] md:rounded-br-[40px] lg:rounded-br-[80px] xl:rounded-br-[120px] rounded-bl-[20px] sm:rounded-bl-none p-4 sm:p-6 md:p-8 lg:p-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] flex flex-col justify-center items-center text-center">

                <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 sm:mb-3 md:mb-4">
                  B1
                </h3>
                <p className="text-white/60 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs mb-1 sm:mb-2">
                Build For Business
                </p>
              </div>

              {/* EL KAID */}
              <div className="flex-1 w-full sm:max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tr-[20px] sm:rounded-tr-[30px] md:rounded-tr-[40px] lg:rounded-tr-[80px] xl:rounded-tr-[120px] rounded-tl-[20px] sm:rounded-tl-none rounded-bl-[20px] sm:rounded-bl-[30px] md:rounded-bl-[40px] lg:rounded-bl-[80px] xl:rounded-bl-[120px] rounded-br-[20px] sm:rounded-br-none p-4 sm:p-6 md:p-8 lg:p-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] flex flex-col justify-center items-center text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 sm:mb-3 md:mb-4">
                  B2
                </h3>
                <p className="text-white/60 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs mb-1 sm:mb-2">
                  Build For Smart Workspace
                </p>

              </div>
            </div>

            {/* Center Rotating Arc */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44 flex items-center justify-center my-2 sm:my-3 md:my-4">
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
                  className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg font-light px-1 sm:px-2 text-center"
                  style={{
                    animation: 'fadeIn 1.2s ease-out'
                  }}
                >
                  {labels[activePointIndex]}
                </span>
              </div>
            </div>

            {/* Bottom Row - Descriptions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl">
              {/* Traditional Descriptions */}
              <div className="flex-1 w-full sm:max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tr-[20px] sm:rounded-tr-[30px] md:rounded-tr-[40px] lg:rounded-tr-[80px] xl:rounded-tr-[120px] rounded-tl-[20px] sm:rounded-tl-none rounded-bl-[20px] sm:rounded-bl-[30px] md:rounded-bl-[40px] lg:rounded-bl-[80px] xl:rounded-bl-[120px] rounded-br-[20px] sm:rounded-br-none p-4 sm:p-6 md:p-8 lg:p-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] flex items-center justify-center overflow-hidden">
                <div 
                  key={`traditional-${activePointIndex}`}
                  className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-center px-2 sm:px-3"
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
              <div className="flex-1 w-full sm:max-w-xl bg-gradient-to-b from-[#7B6FC8] via-[#6B5FB8] to-[#B0A0D8] rounded-tl-[20px] sm:rounded-tl-[30px] md:rounded-tl-[40px] lg:rounded-tl-[80px] xl:rounded-tl-[120px] rounded-tr-[20px] sm:rounded-tr-none rounded-br-[20px] sm:rounded-br-[30px] md:rounded-br-[40px] lg:rounded-br-[80px] xl:rounded-br-[120px] rounded-bl-[20px] sm:rounded-bl-none p-4 sm:p-6 md:p-8 lg:p-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] flex items-center justify-center overflow-hidden">
                <div 
                  key={`bitcoin-${activePointIndex}`}
                  className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-center px-2 sm:px-3"
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