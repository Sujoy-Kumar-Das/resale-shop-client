import React from "react";

const AboutCard = ({teamMember}) => {
    console.log(teamMember)
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={teamMember.image}
          alt="Shoes"
          className="rounded-full w-24"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{teamMember.name}</h2>
        <p>{teamMember.post}</p>
        
      </div>
    </div>
  );
};

export default AboutCard;
