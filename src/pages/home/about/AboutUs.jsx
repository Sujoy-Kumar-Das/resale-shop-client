import React from "react";
import Spiner from "../../shared/spiner/Spiner";
import { useQuery } from "react-query";
import AboutCard from "./AboutCard";

const AboutUs = () => {
  const { isLoading, data: teamMembers = [] } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/about");
      const data = await res.json();
      if (data?.success) {
        return data.about;
      } else {
        return;
      }
    },
  });
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  return (
    <section className="">
      <h3 className=" text-center text-3xl font-bold mb-8">Who We Are ?</h3>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamMembers.map((teamMember) => (
          <AboutCard key={teamMember._id} teamMember={teamMember}></AboutCard>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
