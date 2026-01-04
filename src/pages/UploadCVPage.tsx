import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Target,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CVAnalyzerLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#cvGradient)" />
    <path d="M16 8L20 14H18V18L22 24H10L14 18V14H12L16 8Z" fill="white" />
    <defs>
      <linearGradient id="cvGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED" />
        <stop offset="1" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
  </svg>
);

export default function UploadCVPage() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const faqs = [
    {
      question: "What file formats are accepted?",
      answer: "We accept PDF, DOC, DOCX, and TXT file formats for CV uploads. PDF is recommended for best results."
    },
    {
      question: "How long does the analysis take?",
      answer: "Our AI analyzer processes your CV within 30 seconds to 2 minutes, depending on the document length and complexity."
    },
    {
      question: "Is my CV data secure and safe?",
      answer: "Yes, all uploaded CVs are encrypted and stored securely. We never share your data with third parties without your consent."
    },
    {
      question: "How does CV parsing work?",
      answer: "Our AI uses natural language processing to extract key information like skills, experience, education, and qualifications from your CV."
    },
    {
      question: "Can I get suggestions for multiple job roles?",
      answer: "Yes, our analyzer provides personalized suggestions and matches your CV against multiple job roles in our database."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="size-4" />
            <span className="text-sm">Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <CVAnalyzerLogo />
            <span className="text-base">CV Analyzer</span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <section className="container mx-auto px-6 py-16 lg:py-20">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/select-role')}
            className="inline-flex items-center gap-2 text-blue-600 text-sm px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <Sparkles className="size-4" />
            <span>AI-Powered Analysis</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
              Elevate Your{' '}
              <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Career Story
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Transform your CV with our intelligent analyzer platform. Get instant feedback, personalized recommendations, and industry insights to enhance your career opportunities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg shrink-0">
                  <Sparkles className="size-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-1">AI-Powered Analysis</h3>
                  <p className="text-xs text-gray-600">Deep insights into your CV with advanced algorithms</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                  <TrendingUp className="size-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-1">Interview Insights</h3>
                  <p className="text-xs text-gray-600">Prepare better with AI-generated interview tips</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg shrink-0">
                  <CheckCircle2 className="size-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-1">Expert Included</h3>
                  <p className="text-xs text-gray-600">Professional recommendations from industry experts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg shrink-0">
                  <Target className="size-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-1">Skills Match</h3>
                  <p className="text-xs text-gray-600">Match your skills to trending job requirements</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-linear-to-r from-purple-600 to-blue-600"
            >
              Get Started for $7
            </Button>
            <p className="text-xs text-gray-500 mt-3">One-time payment • Instant results</p>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border">
              <img 
                src="https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2NTgxNjg0Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="CV Analysis Workspace"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">AI Active</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-xl shadow-lg">
              <div className="text-xs text-gray-500 mb-1">Success Rate</div>
              <div className="text-2xl">94%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">How It Works</h2>
            <p className="text-gray-600">Our professional CV analyzer in three simple steps and share your talent analysis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-linear-to-br from-purple-600 to-blue-600 size-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="size-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg mb-2">Upload Your CV</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Simply upload your CV or resume in PDF, DOC, or DOCX format for instant AI analysis.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-br from-purple-600 to-blue-600 size-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg mb-2">AI Analyzer</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our advanced AI scans and analyzes your CV, identifying strengths and areas for improvement.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-br from-purple-600 to-blue-600 size-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="size-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg mb-2">Get Results</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Receive detailed insights, recommendations, and a comprehensive score to boost your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="upload-section" className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">Upload Your CV</h2>
            <p className="text-gray-600">Drop your CV in the field below or click to browse and start the automated analysis</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
              <div className="text-center">
                <div className="bg-purple-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="size-8 text-purple-600" />
                </div>
                <h3 className="text-lg mb-2">Drag and drop your CV here</h3>
                <p className="text-sm text-gray-600 mb-6">or click to browse from your computer</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('File selected:', file.name);
                    }
                  }}
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-linear-to-r from-purple-600 to-blue-600 mb-4"
                >
                  Choose File
                </Button>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>PDF, DOC, DOCX</span>
                  <span>•</span>
                  <span>Max 10MB</span>
                  <span>•</span>
                  <span>30s Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">Apply with Your CV</h2>
            <p className="text-gray-600">Complete your application and receive instant analysis with expert job with personalized feedback</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <Input placeholder="Enter your name" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <Input type="email" placeholder="Enter your email" className="w-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <Input placeholder="Enter your phone" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Current Position</label>
                  <Input placeholder="e.g., Software Engineer" className="w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">LinkedIn / Portfolio</label>
                <Input placeholder="Enter LinkedIn or portfolio URL (optional)" className="w-full" />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-2" />
                <p className="text-xs text-gray-600">
                  I consent to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a> and <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
                </p>
              </div>

              <Button className="w-full bg-linear-to-r from-purple-600 to-blue-600" size="lg">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find the answers to common questions about our CV Analyzer platform</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border shadow-sm">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`size-5 text-gray-400 shrink-0 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CVAnalyzerLogo />
                <span className="text-base">CV Analyzer</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                © 2025 CV Analyzer. All rights reserved. Powered by Workflow AI.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
