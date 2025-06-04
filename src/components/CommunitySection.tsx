
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Share2, Trophy, Users, Code } from 'lucide-react';

const CommunitySection = () => {
  const communityStats = [
    { icon: Users, number: "2.5M+", label: "Active Developers", color: "brand-blue" },
    { icon: Code, number: "50K+", label: "Projects Shared", color: "brand-purple" },
    { icon: Heart, number: "1M+", label: "Likes Given", color: "brand-orange" },
    { icon: MessageCircle, number: "500K+", label: "Comments Posted", color: "brand-cyan" }
  ];

  const featuredProjects = [
    {
      title: "3D Solar System",
      author: "Alex Chen",
      likes: 1247,
      description: "Interactive 3D solar system built with Three.js",
      tags: ["JavaScript", "Three.js", "WebGL"],
      color: "brand-blue"
    },
    {
      title: "AI Image Generator",
      author: "Sarah Johnson",
      likes: 2156,
      description: "Generate stunning images using machine learning",
      tags: ["Python", "TensorFlow", "AI"],
      color: "brand-purple"
    },
    {
      title: "Real-time Chat App",
      author: "Mike Rodriguez",
      likes: 892,
      description: "WebSocket-powered chat with emoji reactions",
      tags: ["Node.js", "Socket.io", "React"],
      color: "brand-cyan"
    }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-brand-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Join Our
            <span className="bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent">
              {" "}Thriving Community
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Connect with millions of developers, share your projects, and get inspired by amazing creations.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-16 h-16 bg-${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-gray mb-2">{stat.number}</div>
              <div className="text-brand-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-brand-gray text-center mb-8">Featured Community Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-24 bg-gradient-to-r from-${project.color} to-brand-gray flex items-center justify-center`}>
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-brand-gray mb-2">{project.title}</h4>
                  <p className="text-sm text-brand-gray mb-1">by {project.author}</p>
                  <p className="text-brand-gray mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-brand-light text-brand-gray text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-brand-gray">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {project.likes}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className={`bg-${project.color} hover:opacity-90 text-white`}>
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-brand-gray mb-4">Ready to Share Your Creation?</h3>
          <p className="text-xl text-brand-gray mb-8">Join thousands of developers showcasing their projects and getting valuable feedback.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 px-8 py-4 text-lg"
            >
              Share Your Project
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 text-lg"
            >
              Explore Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
