import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Define an array of team members with project details
const teamMembers = [
  {
    name: 'Bhautik Patel',
    role: 'Software Engineer',
    imageUrl: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    projects: [
      'Project A: Frontend development',
      'Project B: API integration',
      'project f: backend',
    ]
  },
  {
    name: 'Tirth Patel',
    role: 'Graphic Designer',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    projects: [
      'Project C: Branding design',
      'Project D: Illustrations',
    ]
  },
  {
    name: 'Divy Patel',
    role: 'Dev Ops',
    imageUrl: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80',
    projects: [
      'Project E: Infrastructure setup',
      'Project F: CI/CD pipelines',
    ]
  },
  {
    name: 'Abhishek Panta',
    role: 'Team Lead',
    imageUrl: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80',
    projects: [
      'Project G: Cloud architecture',
      'Project H: Deployment strategies',
    ]
  },
  {
    name: 'Jade Bradley',
    role: 'Dev Ops',
    imageUrl: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80',
    projects: [
      'Project I: Dockerization',
      'Project J: Monitoring solutions',
    ]
  }
];

const Team = () => {

  
    
  return (
    <div className="w-full bg-gray-900 rounded-xl">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center pb-12">
          <h2 className="text-base font-bold text-indigo-600">Meet Our Team</h2>
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
            Check out our awesome team members
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" >
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 member-card hover:transform hover:scale-105 duration-300">
              <div className="flex justify-center mb-4">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={member.imageUrl}
                  alt={`${member.name}'s photo`}
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-white font-bold mb-2">{member.name}</p>
                <p className="text-base text-gray-400 font-normal mb-4">{member.role}</p>
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Projects:</p>
                  <ul className="text-sm text-gray-300">
                    {member.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
