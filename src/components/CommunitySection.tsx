
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Heart, Trophy, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunitySection = () => {
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    console.log('Join the Community button clicked');
    // Navigate to auth page to join community
    navigate('/auth');
  };

  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Active Developers",
      color: "brand-blue"
    },
    {
      icon: MessageSquare,
      number: "1M+",
      label: "Forum Posts",
      color: "brand-cyan"
    },
    {
      icon: Heart,
      number: "25K+",
      label: "Projects Shared",
      color: "brand-purple"
    },
    {
      icon: Trophy,
      number: "500+",
      label: "Challenges Completed",
      color: "brand-orange"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      content: "The community here is incredible! I've learned so much from other developers and got help whenever I was stuck.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      content: "Vibe Coding has transformed how I approach web development. The collaborative environment is unmatched.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      content: "From ideation to deployment, this platform makes the entire development process smooth and enjoyable.",
      rating: 5
    }
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Join Our Thriving
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {" "}Community
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Connect with thousands of passionate developers, share your projects, 
            and grow together in our supportive community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-gray mb-2">{stat.number}</div>
              <div className="text-brand-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-brand-light rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-brand-gray">{testimonial.name}</h4>
                  <p className="text-sm text-brand-gray">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-brand-gray italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleJoinCommunity}
            size="lg"
            className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90 px-8 py-4 text-lg"
          >
            Join the Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
