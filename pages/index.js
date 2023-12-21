import HomePage from "@/components/home/HomePage";
export default function Home({
  isFeedbackVisible,
  handleToggleFeedback,
  conVersion,
}) {
  return (
    <HomePage
      isFeedbackVisible={isFeedbackVisible}
      handleToggleFeedback={handleToggleFeedback}
      conVersion={conVersion}
    />
  );
}
