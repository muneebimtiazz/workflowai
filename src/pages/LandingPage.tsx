import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Users,
  BarChart3,
  Target,
  Clock,
  Shield,
  TrendingUp,
  Star,
  Rocket,
  ArrowRight,
  Upload,
  Check,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';

const WorkflowLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="url(#gradient)" />
    <circle cx="16" cy="11" r="2" fill="white" />
    <circle cx="11" cy="16" r="2" fill="white" />
    <circle cx="21" cy="16" r="2" fill="white" />
    <circle cx="16" cy="21" r="2" fill="white" />
    <line x1="16" y1="11" x2="11" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="11" x2="21" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="16" x2="16" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="16" x2="16" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#9333EA" />
      </linearGradient>
    </defs>
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WorkflowLogo />
            <span className="text-base">Workflow</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-700">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-700">How it works</a>
            <a href="#reviews" className="text-sm text-gray-700">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')} size="sm">
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')} size="sm" className="bg-linear-to-r from-blue-600 to-purple-600">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="relative bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 mb-6">
                <Rocket className="size-4 text-blue-600" />
                <span className="text-sm text-blue-600">Now with AI-Powered Automation</span>
              </div>

              <h1 className="font-bold text-6xl leading-tight mb-6">
                Transform HR with{' '}
                <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Autonomous AI
                </span>{' '}
                Automation
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Revolutionize your human resource processes with cutting-edge AI technology. Streamline operations, boost productivity, and make data-driven decisions that drive your organization forward.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-linear-to-r from-blue-600 to-purple-600"
                >
                  Explore Demo
                  <ArrowRight className="ml-2 size-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/upload-cv')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Upload className="mr-2 size-5" />
                  Upload CV
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="size-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="size-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb24lMjBtZWV0aW5nfGVufDF8fHx8MTc2NTkxMTU3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="HR Team Collaboration"
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="size-4 text-green-600" />
                  <span className="text-xs text-gray-600">Productivity</span>
                </div>
                <div className="text-xl text-green-600">+67% increase</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="size-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Team Satisfaction</span>
                </div>
                <div className="text-xl text-blue-600">98% rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">Key Features</h2>
            <p className="text-gray-600">Major modules that revolutionize core HR workflow operations powered by AI intelligence</p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <BarChart3 className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Predictive Analytics</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our AI-driven insights give you real-time workforce data analytics with AI-powered analytics.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <Users className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Talent Onboarding</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accelerate team acquisition and engagement for building skilled communities and work teams.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <Shield className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Leave Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track all leave requests and approval with integrated calendar and AI-powered workflows.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <FileText className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Document Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Centralized hub to view, organize, and access organization essential work-related documents.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <Target className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Performance Evaluation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create performance evaluations according with KPI-driven feedback and automated reviews.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-linear-to-br from-blue-500 to-purple-500 size-12 rounded-xl flex items-center justify-center mb-5">
                <Clock className="size-6 text-white" />
              </div>
              <h3 className="text-lg mb-3">Time & Compliance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ensure compliance and track with AI-accelerated time-tracking and payroll regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">How it Works</h2>
            <p className="text-gray-600">Our platform automates HR workflows in four simple steps</p>
          </div>

          <div className="grid grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-linear-to-br from-blue-600 to-purple-600 size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                1
              </div>
              <h3 className="text-lg mb-2">Onboard</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Send bulk onboard new employee using AI-customized workflows and brand templates.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-br from-blue-600 to-purple-600 size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                2
              </div>
              <h3 className="text-lg mb-2">Automate</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fully integrate workflows and workflows with advanced onboarding and AI-powered tools.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-br from-blue-600 to-purple-600 size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                3
              </div>
              <h3 className="text-lg mb-2">Analytics</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get insights in real-time with predictive and dashboards with management dashboards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-br from-blue-600 to-purple-600 size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                4
              </div>
              <h3 className="text-lg mb-2">Results & Growth</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Achieve measurable results as your future organization grows through data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-linear-to-br from-blue-600 via-purple-600 to-purple-700 py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3">Trusted by HR Professionals</h2>
          </div>

          <div className="grid grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-6xl mb-2">90%</div>
              <div className="text-xl mb-2">Time Saved</div>
              <div className="text-sm text-blue-100">Reduce HR operations time with AI automation</div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">98%</div>
              <div className="text-xl mb-2">User Satisfaction</div>
              <div className="text-sm text-blue-100">HR professionals report increased productivity</div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">70%</div>
              <div className="text-xl mb-2">Cost Reduction</div>
              <div className="text-sm text-blue-100">Lower operational costs through automation</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/95 mb-6 leading-relaxed">
                "This platform transformed how we manage our HR processes. The AI automation saved us countless hours. We've seen a 10x improvement in our efficiency!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 size-10 rounded-full flex items-center justify-center">
                  <span className="text-sm">SA</span>
                </div>
                <div>
                  <div className="text-sm">Sarah Anderson</div>
                  <div className="text-xs text-blue-100">HR Director, TechCorp Inc.</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/95 mb-6 leading-relaxed">
                "Incredible platform helped us reduce our time by 50%. Absolutely game-changing for our organization!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 size-10 rounded-full flex items-center justify-center">
                  <span className="text-sm">MC</span>
                </div>
                <div>
                  <div className="text-sm">Michael Chen</div>
                  <div className="text-xs text-blue-100">Chief People Officer, InnovateTech</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl mb-4">Ready to Transform Your HR Operations?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of organizations already using our platform HR automation tools that help drive productivity and streamline the future of human resources.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-linear-to-r from-blue-600 to-purple-600"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/upload-cv')}
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <WorkflowLogo />
                <span className="text-base">Workflow</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transforming HR automation with Autonomous AI Analytics
              </p>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Guides</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            © 2025 Workflow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}