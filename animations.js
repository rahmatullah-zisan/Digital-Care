// Smooth scroll, scroll animations and Lottie integration
// A. Smooth scroll (Lenis) + ScrollTrigger sync
gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// B. Hero intro animation
gsap.timeline({ defaults:{ duration:0.9, ease:"power3.out" }})
  .from(".hero-title", { y:30, autoAlpha:0 })
  .from(".hero-sub",   { y:20, autoAlpha:0 }, "-=0.5")
  .from(".cta",        { y:10, autoAlpha:0 }, "-=0.6");

// C. Scroll reveal for cards
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.from(el, {
    y: 40, autoAlpha: 0, duration: 0.8,
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
  });
});

// D. Pinned showcase section with scrub
gsap.timeline({
  scrollTrigger: {
    trigger: ".pinned",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: true
  }
})
.fromTo(".phone", { y: 120, rotate: -8 }, { y: -120, rotate: 8, ease: "none" });

// E. Lottie (hero micro-animation)
const lottieEl = document.getElementById("logo-lottie");
if (lottieEl) {
  lottie.loadAnimation({
    container: lottieEl,
    renderer: "svg",
    loop: true,
    autoplay: true,
    // Path to your JSON file
    path: "/assets/animations/agent.json"
  });
}
