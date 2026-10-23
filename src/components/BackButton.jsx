import { useGoBack } from "../hooks/useKeys.js";

export default function BackButton() {
  const goBack = useGoBack();
  return <button type="button" className="back-btn" onClick={goBack} aria-label="Go back">◄ BACK</button>;
}
