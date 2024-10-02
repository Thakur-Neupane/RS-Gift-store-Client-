import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const user = {
    name: "John Doe",
    bio: "Web Developer based in San Francisco.",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image
  };

  return (
    <div className="card" style={{ width: "18rem", margin: "20px auto" }}>
      <img
        src={user.imageUrl}
        alt={user.name}
        className="card-img-top rounded-circle"
      />
      <div className="card-body text-center">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
