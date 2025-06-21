import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetPasswordHandler } from "@/services/LoginHandler";
import { toast } from "@/components/ui/use-toast";

interface ResetPasswordResponse {
  status: string;
  message?: string;
}

const Settings = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data: any) {
    const res = (await ResetPasswordHandler(
      data.current_pass,
      data.new_pass
    )) as ResetPasswordResponse;
    if (res.status == "success") {
      toast.success("Password Changed Successfully");
    } else {
      toast.error(res.message || "An error occurred");
    }
    reset();
  }
  function onError(data: any) {
    console.log(data);
    Object.entries(data).forEach((d: [string, any]) => {
      console.log(d);
      toast.error(d[1].message);
    });
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="current_pass"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="current_pass"
              type="password"
              placeholder="Current Password"
              {...register("current_pass", {
                required: "Current Password is required",
              })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new_pass"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="new_pass"
              type="password"
              placeholder="New Password"
              {...register("new_pass", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Password
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
              onClick={() => navigate("/u")}
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
