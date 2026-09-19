import gsap from "gsap";

export const initLoadingAnimation = (
  container: HTMLDivElement | null,
  shapes: (HTMLDivElement | null)[],
  onProgress: (progress: number) => void,
  onComplete: () => void
) => {
  if (!container) return;

  const ctx = gsap.context(() => {
    // 1. Floating shapes animation (squares and triangles)
    const validShapes = shapes.filter(Boolean);
    if (validShapes.length > 0) {
      gsap.to(validShapes, {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        rotation: "random(-90, 90)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }

    // 2. Loading progress simulation (0 to 100)
    const dummyObj = { progress: 0 };
    gsap.to(dummyObj, {
      progress: 100,
      duration: 3.5, // 3.5 seconds loading simulation
      ease: "power1.inOut",
      onUpdate: () => {
        onProgress(Math.floor(dummyObj.progress));
      },
      onComplete: () => {
        // 3. Fade out the container when loading is done
        gsap.to(container, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });
  }, container);

  return () => ctx.revert(); // cleanup
};

export const animateEntry = (container: HTMLElement | null) => {
  if (!container) return;
  const ctx = gsap.context(() => {
    gsap.from(container, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }, container);
  return () => ctx.revert();
};
