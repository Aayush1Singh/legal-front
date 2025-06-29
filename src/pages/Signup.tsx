import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Resolver } from "react-hook-form";
import { SignupHandler } from "@/services/LoginHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import Seo from "@/components/Seo";
type FormValues = {
  fullName: string;
  password: string;
  email: string;
  confirm_email: string;
};
interface Response<T = unknown> {
  message: string;
  status: string;
  response?: T;
}
const Signup: React.FC = () => {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data) {
    setLoader(true);
    try {
      const { fullName, email, password } = data;
      const response = (await SignupHandler(
        email,
        password,
        fullName
      )) as Response;
      if (response.status === "success") {
        toast.success("Logged In!");
        navigate("/u");
      } else toast.error(response.message);
    } catch (err) {
      toast.error(err);
    }
    setLoader(false);
  }

  return (
    <>
      {" "}
      <Seo
        title="Sign Up • LegalAI Assistant"
        description="Create your free LegalAI account: leverage Indian-law-trained AI to analyze documents, research similar cases, and answer your legal queries with local precision"
        canonical="https://kanun-legalai.vercel.app/signup"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-slate-400 mt-2">Join LegalAI Assistant today</p>
          </div>

          {/* Signup Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email / UserName
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email / username"
                    {...register("email")}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    {...register("password")}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirm_email")}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                disabled={loading}
              >
                {!loading ? "Create Account" : <Loader className="w-7" />}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
