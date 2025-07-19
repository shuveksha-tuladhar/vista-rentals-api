import { useForm } from "react-hook-form";

type SignupFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1">
        <input
          {...register("firstName", { required: true })}
          placeholder="First Name"
          className="w-full border rounded p-2"
        />
        {errors.firstName && <span className="text-red-500 text-sm">First name is required</span>}
      </div>

      <div className="space-y-1">
        <input
          {...register("middleName")}
          placeholder="Middle Name"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="space-y-1">
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
          className="w-full border rounded p-2"
        />
        {errors.lastName && <span className="text-red-500 text-sm">Last name is required</span>}
      </div>

      <div className="space-y-1">
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="w-full border rounded p-2"
        />
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
      </div>

      <div className="space-y-1">
        <input
          {...register("phone", { required: true })}
          placeholder="Phone"
          className="w-full border rounded p-2"
        />
        {errors.phone && <span className="text-red-500 text-sm">Phone number is required</span>}
      </div>

      <div className="space-y-1">
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
          className="w-full border rounded p-2"
        />
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
      </div>

      <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
