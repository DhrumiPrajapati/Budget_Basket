import React from 'react';

// Array of objects containing information about each feature
const features = [
  {
    id: 1,
    title: 'Feature 1 Title',
    description: 'Updated content for Feature 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?',
    iconUrl: '..', // Replace with your actual URL
  },
  {
    id: 2,
    title: 'Feature 2 Title',
    description: 'Updated content for Feature 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?',
    iconUrl: 'https://example.com/ico2.png' // Replace with your actual URL
  },
  {
    id: 3,
    title: 'Feature 3 Title',
    description: 'Updated content for Feature 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?',
    iconUrl: 'https://example.com/icon3.png' // Replace with your actual URL
  }
];

const Info = () => {
  return (
    <section className="bg-gray-900 text-white rounded-xl mb-2">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mx-auto">
        <div className=" mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">What makes us special</h2>

          <div className="grid gap-6 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <div key={feature.id} className="flex items-start gap-4">
                <span className="rounded-full bg-gray-800 p-4">
                  <img
                    className="h-8 w-8 text-gray-300"
                    src={feature.iconUrl}
                    alt={`Icon for ${feature.title}`}
                  />
                </span>

                <div>
                  <h2 className="text-lg font-bold">{feature.title}</h2>

                  <p className="mt-1 text-sm text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
