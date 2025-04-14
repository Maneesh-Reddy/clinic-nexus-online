
import { Link } from 'react-router-dom';
import { LandingLayout } from '../components/Layout';
import { CalendarClock, ClipboardCheck, Heart, Shield, Users } from 'lucide-react';

const features = [
  {
    title: 'Easy Appointment Booking',
    description: 'Schedule appointments with your preferred doctors at your convenience. No more waiting on calls.',
    icon: CalendarClock,
  },
  {
    title: 'Digital Health Records',
    description: 'Access your complete medical history, prescriptions, and test results all in one secure place.',
    icon: ClipboardCheck,
  },
  {
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with the highest security standards. Your privacy is our priority.',
    icon: Shield,
  },
  {
    title: 'Expert Healthcare Providers',
    description: 'Connect with qualified doctors and specialists for personalized care and consultation.',
    icon: Users,
  },
];

const testimonials = [
  {
    content: "Virtual Clinic has transformed how I manage my healthcare. I can book appointments, check my reports, and consult with doctors - all from my phone!",
    author: "Sarah J.",
    role: "Patient"
  },
  {
    content: "As a doctor, this platform has streamlined my practice. I can easily access patient records, manage appointments, and provide better care.",
    author: "Dr. Mark T.",
    role: "Cardiologist"
  },
  {
    content: "The administrative tools are excellent. I can oversee operations, staff, and patient management efficiently in one place.",
    author: "Rachel L.",
    role: "Clinic Administrator"
  },
];

const Index = () => {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-clinic-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 title-gradient">
                Modern Healthcare at Your Fingertips
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Virtual Clinic connects patients with healthcare providers through a secure, easy-to-use platform. Book appointments, access medical records, and receive care—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="px-6 py-3 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md font-medium transition-colors">
                  Get Started
                </Link>
                <Link to="/login" className="px-6 py-3 bg-white dark:bg-gray-800 text-clinic-600 dark:text-clinic-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md font-medium transition-colors border border-clinic-200 dark:border-gray-700">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-clinic-200 dark:bg-clinic-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Doctor with patient" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 title-gradient">Why Choose Virtual Clinic?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to make healthcare accessible, efficient, and personalized.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 card-hover"
              >
                <div className="w-12 h-12 bg-clinic-100 dark:bg-clinic-900/50 rounded-lg flex items-center justify-center text-clinic-600 dark:text-clinic-400 mb-5">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-clinic-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold">10k+</p>
              <p className="text-clinic-100 mt-2">Patients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold">250+</p>
              <p className="text-clinic-100 mt-2">Doctors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold">15k+</p>
              <p className="text-clinic-100 mt-2">Appointments</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold">98%</p>
              <p className="text-clinic-100 mt-2">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 title-gradient">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover how Virtual Clinic is making a difference in healthcare management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm relative flex flex-col card-hover"
              >
                <div className="mb-4 text-clinic-500">
                  <Heart className="fill-current" size={24} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{testimonial.content}</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.author}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup" className="px-6 py-3 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md font-medium transition-colors inline-block">
              Join Virtual Clinic Today
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-clinic-50 dark:bg-gray-800 border-t border-b border-clinic-100 dark:border-gray-700">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 title-gradient">Ready to transform your healthcare experience?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of patients and healthcare providers who are already benefiting from Virtual Clinic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="px-6 py-3 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md font-medium transition-colors">
                Create an Account
              </Link>
              <Link to="/login" className="px-6 py-3 bg-white dark:bg-gray-700 text-clinic-600 dark:text-clinic-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md font-medium transition-colors border border-clinic-200 dark:border-gray-600">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Index;
