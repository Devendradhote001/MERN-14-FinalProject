import React from "react";
import { useForm } from "react-hook-form";
import { userRegisterApi } from "../../features/actions/AuthActions";
import { useDispatch } from "react-redux";

const Register = ({ setToggle }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = dispatch(userRegisterApi(data));
      if (res) {
        console.log("okk from reg");
      }
    } catch (error) {
      console.log("error while registering user", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-xs bg-zinc-900 border border-zinc-700 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold text-white text-center mb-6">
          Instagram
        </h1>
        <p className="text-zinc-300 text-center mb-4">
          Sign up to see photos and videos from your friends.
        </p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mb-5 flex items-center justify-center gap-2"
          type="button"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            {/* Facebook icon SVG path */}
            <path
              d="M22.675 0h-21.35C.592 0 0 .592 0 1.326v21.348C0 23.408.592 24 1.325
            24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788
            4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504
            0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.408
            24 24 23.408 24 22.674V1.326C24 .592 23.408 0 22.675 0"
            />
          </svg>
          Log in with Facebook
        </button>
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="mx-3 text-zinc-400 text-sm font-semibold">OR</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Mobile Number or Email"
            {...register("email", { required: "Required" })}
          />
          {errors.emailOrMobile && (
            <span className="text-red-500 text-xs">
              {errors.emailOrMobile.message}
            </span>
          )}

          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Mobile"
            {...register("mobile", { required: "Required" })}
          />
          {errors.mobile && (
            <span className="text-red-500 text-xs">
              {errors.mobile.message}
            </span>
          )}

          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Full Name"
            {...register("fullName", { required: "Required" })}
          />
          {errors.fullname && (
            <span className="text-red-500 text-xs">
              {errors.fullname.message}
            </span>
          )}

          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Username"
            {...register("username", { required: "Required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-xs">
              {errors.username.message}
            </span>
          )}

          <div className="text-[10px] text-zinc-400 mt-1 mb-2">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <a className="text-blue-400" href="#">
              Learn More
            </a>
          </div>

          <div className="text-xs text-zinc-400 mb-2">
            By signing up, you agree to our{" "}
            <a className="text-blue-400" href="#">
              Terms
            </a>
            ,{" "}
            <a className="text-blue-400" href="#">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a className="text-blue-400" href="#">
              Cookies Policy
            </a>
            .
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mt-1"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="w-full max-w-xs bg-zinc-900 border border-zinc-700 rounded-lg p-6 mt-4 text-center">
        <span className="text-zinc-300 text-sm">
          Have an account?{" "}
          <p
            onClick={() => setToggle((prev) => !prev)}
            className="text-blue-400 font-semibold"
          >
            Log in
          </p>
        </span>
      </div>
    </div>
  );
};

export default Register;
