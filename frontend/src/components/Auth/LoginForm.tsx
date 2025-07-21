import { useForm } from "react-hook-form";
import { postApi } from "../../utils/api";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { capitalize } from "../../utils/capitalize";
import { useToastStore } from "../../store/toastStore";

type LoginFormData = {
  email: string;
  password: string;
};

interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
interface LoginResponse {
  message: string;
  user: UserResponse;
}

interface LoginProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { addToast } = useToastStore();

  const onSubmit = async (data: LoginFormData) => {
    const { data: response, error } = await postApi<LoginResponse>(
      "/login",
      data
    );

    if (error) {
      console.error("Login failed:", error.message);
      navigate("/500");
    }
    if (response?.user) {
      setUser(response.user);
      addToast({
        message: `Welcome, ${capitalize(response.user.first_name)}!`,
        type: "success",
      });
      onClose();
    }
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
