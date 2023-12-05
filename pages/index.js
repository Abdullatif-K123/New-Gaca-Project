import HomePage from "@/components/home/HomePage";
export default function Home({ isFeedbackVisible, handleToggleFeedback }) {
  return (
    <HomePage
      isFeedbackVisible={isFeedbackVisible}
      handleToggleFeedback={handleToggleFeedback}
    />
  );
}
