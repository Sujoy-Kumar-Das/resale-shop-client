import React from "react";
import { useQuery } from "react-query";
import AboutCard from "../home/about/AboutCard";

const About = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ["/about"],
    queryFn: async () => {
      const res = await fetch(
        "https://resell-shop-server-sujoy-kumar-das.vercel.app/about"
      );
      const data = await res.json();
      if (data?.success) {
        return data.about;
      }
    },
  });
  const { data: allDetails } = useQuery({
    queryKey: ["/about-detail"],
    queryFn: async () => {
      const res = await fetch(
        "https://resell-shop-server-sujoy-kumar-das.vercel.app/about-detail"
      );
      const data = await res.json();
      
      if (data?.success) {
        return data.aboutDetails;
      }
    },
  });

  return (
    <div className="  w-4/5 mx-auto border-l-indigo-100 text-fuchsia-600">
      {allDetails?.map((detail) => (
        <div className=" my-8 text-center" key={detail._id}>
          <h1 className=" text-3xl mb-1 ">{detail.header}</h1>
          <p>{detail.detail}</p>
        </div>
      ))}
      <h1 className=" text-3xl text-center mb-5">Meet Our Team</h1>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
        {teamMembers?.map((teamMember) => (
          <AboutCard key={teamMember._id} teamMember={teamMember}></AboutCard>
        ))}
      </div>
    </div>
  );
};

export default About;
