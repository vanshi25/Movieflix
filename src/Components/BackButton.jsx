import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "./BackButton.css";

function BackButton() {

  const navigate = useNavigate();

  return (
    <button
      className="global-back-btn"
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft />
    </button>
  );
}

export default BackButton;