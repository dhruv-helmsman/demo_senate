"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const schema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number can be at most 15 digits")
    .regex(/^\d+$/, "Mobile number must only contain digits"),
  passcode: z
    .string()
    .min(6, "Passcode must be at least 6 characters")
    .max(12, "Passcode can be at most 12 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full bg-white  rounded-lg shadow-lg">
        <div className="w-full md:w-3/5 p-4 flex justify-center items-center bg-pink-50">
          <Image
            src="/svg/SenateLogo.svg"
            alt="Senate Icon"
            width={300}
            height={300}
          />
        </div>
        <div className="w-full mt-40 p-8">
          <h1 className="text-3xl font-bold text-black mb-4 text-center">Welcome! </h1>
          <p className="text-center ">Please Sign in to access the Admin Panel.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Mobile Number Field */}
            <div className="mt-10 text-center">
              <label className="block text-sm font-medium mr-52">Mobile Number</label>
              <input
                {...register("mobile")}
                className="w-1/3 p-2 border rounded-md"
                type="text"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile.message}</p>
              )}
            </div>

            {/* Passcode Field */}
            <div className="mt-10 text-center">
              <label className="block text-sm font-medium mr-60">Passcode</label>
              <input
                {...register("passcode")}
                className="w-1/3 p-2 border rounded-md"
                type="password"
              />
              {errors.passcode && (
                <p className="text-red-500 text-xs">
                  {errors.passcode.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[300px] ml-[300px] bg-red-800 text-white py-2 rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
