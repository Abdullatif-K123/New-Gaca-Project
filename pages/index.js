import HomePage from "@/components/home/HomePage";
import { useEffect, useState } from "react";
export default function Home({
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
}) {
  // const [currentSection, setCurrentSection] = useState(0);

  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     const delta = event.deltaY || event.detail || event.wheelDelta;
  //     if (delta > 0 && currentSection < 2) {
  //       setCurrentSection((prevSection) => prevSection + 1);
  //     } else if (delta < 0 && currentSection > 0) {
  //       setCurrentSection((prevSection) => prevSection - 1);
  //     }
  //   };
  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowDown" && currentSection < 2) {
  //       setCurrentSection((prevSection) => prevSection + 1);
  //     } else if (event.key === "ArrowUp" && currentSection > 0) {
  //       setCurrentSection((prevSection) => prevSection - 1);
  //     }
  //     // Scroll the page when arrow keys are pressed
  //     if (event.key === "ArrowDown" || event.key === "ArrowUp") {
  //       const scrollAmount = 150; // Adjust this value as needed
  //       window.scrollBy(
  //         0,
  //         event.key === "ArrowDown" ? scrollAmount : -scrollAmount
  //       );
  //     }
  //   };
  //   const scrollToSection = () => {
  //     const scrollTo = currentSection * window.innerHeight;
  //     console.log(scrollTo);
  //     window.scrollTo({
  //       top: scrollTo,
  //       behavior: "smooth",
  //     });
  //     console.log(window.innerHeight);
  //   };
  //   scrollToSection(); // Initial scroll to the specified section
  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("wheel", handleWheel);
  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [currentSection]);
  return (
    <div>
      <HomePage
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={conVersion}
      />
    </div>
  );
}
