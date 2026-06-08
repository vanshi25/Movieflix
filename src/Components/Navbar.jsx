import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FaSearch,
  FaMicrophone,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { searchMulti } from "../Services/api";

import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const data =
          await searchMulti(searchTerm);

        const filtered =
          data.results
            ?.filter(
              (item) =>
                item.title ||
                item.name
            )
            .slice(0, 6);

        setSuggestions(filtered || []);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(
      fetchSuggestions,
      400
    );

    return () =>
      clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice Search not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (
      event
    ) => {
      const text =
        event.results[0][0]
          .transcript;

      setSearchTerm(text);

      navigate(`/search/${text}`);
    };

    recognition.start();
  };

  const handleSuggestionClick = (
    text
  ) => {
    setSearchTerm(text);
    setSuggestions([]);

    navigate(`/search/${text}`);
  };

  return (
    <nav className="navbar">

      <div className="logo"
         onClick={() => navigate("/")}
         >
        MOVIEFLIX
      </div>

      <button
        className="hamburger"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </button>

      <div
        className={`nav-links ${
          menuOpen
            ? "active-menu"
            : ""
        }`}
      >

        <Link
          to="/"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Home
        </Link>

        <Link
          to="/hollywood"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Hollywood
        </Link>

        <Link
          to="/bollywood"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Bollywood
        </Link>

        <Link
          to="/korean"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Korean
        </Link>

        <Link
          to="/japanese"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Japanese
        </Link>

        <Link
          to="/favorites"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          My List
        </Link>

      </div>

      <div className="search-wrapper">

        <div className="search-container">

          <FaSearch
            className="search-icon"
            onClick={
              handleSearch
            }
          />

          <input
            type="text"
            placeholder="Movies, actors, years, moods..."
            className="search-input"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
          />

          <FaMicrophone
            className="mic-icon"
            onClick={
              startVoiceSearch
            }
          />

        </div>

        {suggestions.length >
          0 && (
          <div className="suggestions-box">

            {suggestions.map(
              (item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onClick={() =>
                    handleSuggestionClick(
                      item.title ||
                        item.name
                    )
                  }
                >
                  {item.title ||
                    item.name}
                </div>
              )
            )}

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;