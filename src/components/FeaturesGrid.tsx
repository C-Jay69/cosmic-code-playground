
export const FeaturesGrid = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI Code Generation',
      description: 'Describe your app in plain English and let AI generate the code for you instantly.',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '⚡',
      title: 'Live Preview',
      description: 'See your React app rendered in real-time as you make changes to the code.',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '📝',
      title: 'Code Editor',
      description: 'Edit your React components with JSX syntax highlighting and validation.',
      bgColor: 'bg-green-50'
    },
    {
      icon: '💾',
      title: 'Export & Save',
      description: 'Download your code as a file to continue development in your local environment.',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-brand-gray mb-4">✨ Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-brand-gray">
        {features.map((feature, index) => (
          <div key={index} className={`p-4 ${feature.bgColor} rounded-lg`}>
            <h3 className="font-semibold mb-2">
              {feature.icon} {feature.title}
            </h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
