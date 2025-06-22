import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard = () => {
  const backend_url = import.meta.env.VITE_REACT_APP_BACKEND;

  const [scores, setScores] = React.useState([]);
  const [filteredScores, setFilteredScores] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchScores = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${backend_url}user/get-all-scores`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Sort and assign fixed ranks
        const sortedWithRank = res.data
          .sort((a, b) => b.totalScore - a.totalScore)
          .map((user, index) => ({ ...user, fixedRank: index + 1 }));

        setScores(sortedWithRank);
        setFilteredScores(sortedWithRank);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch leaderboard");
        setLoading(false);
      }
    };

    fetchScores();
  }, [backend_url]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = scores.filter((user) =>
      (user.name || "").toLowerCase().includes(value)
    );
    setFilteredScores(filtered);
  };

  if (loading) return <div className="leaderboard-loading">Loading...</div>;
  if (error) return <div className="leaderboard-error">Error: {error}</div>;

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>
      <input
        type="text"
        className="leaderboard-search"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
      />

      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th> {/* 👈 Add this */}
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {filteredScores.map((user, idx) => (
              <tr
                key={idx}
                className={`leaderboard-row rank-${user.fixedRank}`}
              >
                <td>{user.fixedRank}</td> {/* 👈 Show fixed rank */}
                <td
                  className="leaderboard-name"
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  {user.name || "Unknown"}
                </td>
                <td>{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
