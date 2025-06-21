import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, Trash2, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ResetPasswordHandler } from "@/services/LoginHandler";
const Settings = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data) {
    interface resi {
      message?: string;
      status: string;
    }
    const res = (await ResetPasswordHandler(
      data.current_pass,
      data.new_pass
    )) as resi;
    if (res.status == "success") {
      toast.success("Password Changed Successfully");
    } else {
      toast.error(res.message);
    }
    reset();
  }
  function onError(data) {
    console.log(data);
    Object.entries(data).forEach((d) => {
      console.log(d);
      toast({ title: `Error in ${d[0]}`, description: `${d[1].message}` });
    });
  }
  // Mock user email - in real app, this would come from user context/auth
  const userEmail = useSelector((state) => state.user.email) || null;
  // const userEmail = "user@example.com";

  const handleDeleteData = () => {
    // Here you would implement data deletion logic
    toast({
      title: "Data Deleted",
      description: "All your data has been successfully deleted",
    });
  };

  const handleDeleteAccount = () => {
    // Here you would implement account deletion logic
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted",
      variant: "destructive",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/u")}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50 h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4 sm:space-y-6">
          {/* Account Information */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                Account Information
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm sm:text-base">
                View and manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-300 text-sm sm:text-base"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={userEmail}
                  disabled
                  className="bg-slate-800/50 border-slate-600/50 text-slate-300 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm sm:text-base">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="text-slate-300 text-sm sm:text-base"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    {...register("current_pass", {
                      required: "Current Password is required",
                    })}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-100 h-10 sm:h-11 text-sm sm:text-base focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-slate-300 text-sm sm:text-base"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      {...register("new_pass", {
                        required: "new password is required",
                      })}
                      className="bg-slate-800/50 border-slate-600/50 text-slate-100 h-10 sm:h-11 text-sm sm:text-base focus:border-blue-400 focus:ring-blue-400"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-slate-300 text-sm sm:text-base"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirm_new_pass", {
                        required: true,
                        validate: (value, formValues) => {
                          return (
                            value === formValues["new_pass"] ||
                            "new password and confirm password not same"
                          );
                        },
                      })}
                      className="bg-slate-800/50 border-slate-600/50 text-slate-100 h-10 sm:h-11 text-sm sm:text-base focus:border-blue-400 focus:ring-blue-400"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </form>

          {/* Danger Zone */}
          <Card className="bg-red-950/20 border-red-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-red-400 text-lg sm:text-xl">
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-300/70 text-sm sm:text-base">
                Irreversible actions that will permanently affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Delete Data Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-orange-600/50 text-orange-400 hover:bg-orange-600/10 hover:border-orange-500 h-10 sm:h-11 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
                    >
                      <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Delete Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-slate-700 max-w-sm sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-100">
                        Delete All Data
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        This will permanently delete all your chat history,
                        uploaded files, and analysis results. This action cannot
                        be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="bg-slate-700 text-slate-300 hover:bg-slate-600 border-slate-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteData}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Delete Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Delete Account Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-600/50 text-red-400 hover:bg-red-600/10 hover:border-red-500 h-10 sm:h-11 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-slate-700 max-w-sm sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-100">
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        This will permanently delete your account and all
                        associated data. You will not be able to recover your
                        account or data after this action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="bg-slate-700 text-slate-300 hover:bg-slate-600 border-slate-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
