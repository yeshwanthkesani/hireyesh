import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchSignInMethodsForEmail, linkWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "@/hooks/use-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  Eye,
  EyeOff,
  FileText,
  Video,
  Target,
  BarChart3,
  Linkedin,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Personalized Resume Insights",
      description: "AI-powered resume analysis and optimization suggestions",
    },
    {
      icon: Video,
      title: "Real-time Mock Interview Practice",
      description: "Practice with AI interviewers and get instant feedback",
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems",
    },
    {
      icon: BarChart3,
      title: "Job Application Tracker",
      description: "Track and manage all your job applications in one place",
    },
    {
      icon: Linkedin,
      title: "LinkedIn Networking Boost",
      description: "Smart networking suggestions and connection strategies",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      // Check if the email exist with other providers
      //const methods = await fetchSignInMethodsForEmail(auth, email);
      const methods = await fetchSignInMethodsForEmail(auth, email.trim().toLowerCase());
      console.log("Fetched methods:", methods)
      
      if (!methods.includes("password")){
        console.log("Available sign-in methods:", methods);
        let providerHint = "another provider";
        if (methods.includes("google.com")) providerHint = "Google";
        else if (methods.includes("github.com")) providerHint = "GitHub";
        else if (methods.includes("facebook.com")) providerHint = "Facebook";
        toast({
          title: "Login Failed",
          description: `This email is registered via ${providerHint}. Please log in using that provider.`,
          variant: "destructive",

        });
        setIsLoading(false);
        return;
      }
      // Try logging in only if 'password' method is supported
        const userCredential = await signInWithEmailAndPassword(
          auth,email, password);
          console.log("User logged in:", userCredential.user);
            navigate("/dashboard");
        } catch(error:any){
            console.error("Login error:", error.code, error.message);
            let description = "An error occurred during login. Please try again.";
            if (error.code === "auth/wrong-password") {
              description = "Incorrect password. This email may be linked to a Google or GitHub account. Try logging in with those.";
              } else if (error.code === "auth/user-not-found") {
                description = "No account found with this email. Try signing up or checking the provider used.";
                }
                toast({
                  title: "Login Failed",
                  description: description,
                  variant: "destructive",
                  });
                  setIsLoading(false);
                }
                
        
  };
  const handleForgotPassword = async() =>{
    if(!email){
      toast({
        title:"Enter Email",
        description: "Please enter your email address to reset your password",
        variant:"destructive"
        });
        return;
    }
    try{
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a password reset link",
        variant: "default",
        });
  } catch(error: any){
    toast({
      title: "Error Sending Password Reset Email",
      description: error.message,
      variant: "destructive",
      
    });
    }
  };

  const [popupInProgress, setPopupInProgress] = useState(false);

  const handleSocialLogin = async (providerName: "Google" | "Github" | "LinkedIn") => {
    if (popupInProgress) return;
    setPopupInProgress(true);

    if (providerName === "LinkedIn") {
      toast({
        title: "Coming Soon",
        description: "LinkedIn login is not yet implemented.",
        variant: "default",
      });
      setPopupInProgress(false);
      return;
    }
    const provider = providerName === "Google"
      ? new GoogleAuthProvider()
      : new GithubAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        // Get signed-in user email
        const email = result.user?.email;
        if(!email){
          await auth.signOut();
          toast({
            title: "Login Failed", 
            description: "No Email returned",
            variant:"destructive"
            });
            return;
        }
        // const methods = await fetchSignInMethodsForEmail(auth, email);
        // // only allow if provider matches
        // const expectedProvider = providerName === "Google" ? "google.com" : "github.com";
        // if (!methods.includes(expectedProvider)){
        //   await auth.signOut();
        //   toast({
        //     title: "Login Failed",
        //     description:`This account is registered with ${methods[0]}. Please use that provider.`,
        //     variant: "destructive",
        //     });
        //     return;
        // }
        toast({
          title: "login Successful",
          description:`Welcome ${result.user.displayName||"User"}`,
          variant: "default",
        });
        navigate("/dashboard");     
        } catch (error: any) {
          if (error.code === "auth/account-exists-with-different-credential"){
            const pendingCred = error.credential;
            const email = error.customData?.email;
            if (!email){
              toast({
                title: "Email Missing",
                description: "Could not retrive email from provider.",
                variant: "destructive",
              });
              return;
            }
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.includes("password")){
              const password = prompt(
                `An account with this email exists using password. Enter your password to link your ${providerName} login:`
                );
                if (password) {
                  try{
                    const userCred = await signInWithEmailAndPassword(auth, email, password);
                    await linkWithCredential(userCred.user, pendingCred);
                    toast({
                      title:"Account Linked",
                      description: `Your ${providerName} login has been linked to your account.`,
                      variant: "default",
                    });
                    navigate("/dashboard");
                  } catch(linkErr: any){
                    toast({
                      title: "linking Failed",
                      description: linkErr.message,
                      variant: "destructive",
                    });
                  }
                  } else {
                    toast({
                      title: "Linking Cancelled",
                      description: `Please Sign in using: ${methods[0]}`,
                      variant: "destructive",
                    });
                    }
                    } else{
                      toast({
                        title: "Account Exists with Different Method",
                        description: `Please sign in using: ${methods[0]}`,
                        variant: "destructive",
                      });
                    }
                  } else if(error.code === "auth/cancelled-popup-request"){
                    toast({
                      title: "Login Cancelled",
                      description: "You cancelled the login request.",
                      variant: "destructive",
                      });
                  }
                  else{
          console.error("Login error:", error.code, error.message);
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } 
      
      } finally{
        setPopupInProgress(false)
      }
    };
   

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1b3a 0%, #2d1b69 25%, #4c1d95 50%, #7c2d92 75%, #be185d 100%)",
      }}
    >
        {/* Shooting Stars Background */}
        

      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center p-12">
        <div className="max-w-lg">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HireYesh
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Land your dream jobs with smart guide
            </h2>
            <p className="text-slate-400 text-lg">What HireYesh Offers</p>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === currentFeature;

              return (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    isActive
                      ? "opacity-100 transform translate-x-0 scale-105"
                      : "opacity-40 transform translate-x-4 scale-95"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-4 p-4 rounded-lg ${
                      isActive
                        ? "bg-slate-800/50 border border-blue-500/30"
                        : "bg-slate-900/30"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-blue-600" : "bg-slate-700"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-300"}`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold mb-2 ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Indicators */}
          <div className="flex space-x-2 mt-8">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md lg:max-w-lg">

          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HireYesh
            </h1>
            <p className="text-slate-400 text-lg">
              Land your dream jobs with smart guide
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-200 text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-200 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>

              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-700"></div>
              <span className="px-4 text-slate-400 text-sm">
                or continue with
              </span>
              <div className="flex-1 border-t border-slate-700"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-6">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="w-14 h-14 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-white hover:border-white hover:scale-110 shadow-lg hover:shadow-xl group"
              >
                <svg
                  className="w-6 h-6 transition-all duration-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="transition-all duration-500 group-hover:fill-[#4285F4]"
                    fill="#9CA3AF"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    className="transition-all duration-500 group-hover:fill-[#34A853]"
                    fill="#9CA3AF"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    className="transition-all duration-500 group-hover:fill-[#FBBC05]"
                    fill="#9CA3AF"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    className="transition-all duration-500 group-hover:fill-[#EA4335]"
                    fill="#9CA3AF"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Github")}
                className="w-14 h-14 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-gray-900 hover:border-gray-900 hover:scale-110 shadow-lg hover:shadow-xl group"
              >
                <svg
                  className="w-6 h-6 transition-all duration-500 fill-slate-400 group-hover:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                onClick={() => handleSocialLogin("LinkedIn")}
                className="w-14 h-14 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 shadow-lg hover:shadow-xl group"
              >
                <svg
                  className="w-6 h-6 transition-all duration-500 fill-slate-400 group-hover:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
