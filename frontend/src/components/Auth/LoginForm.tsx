import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="w-full border rounded p-2"
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </div>

      <div className="space-y-1">
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
          className="w-full border rounded p-2"
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
