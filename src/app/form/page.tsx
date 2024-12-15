"use client";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Zod for schema validation
import { zodResolver } from "@hookform/resolvers/zod"; // To connect Zod with React Hook Form

// Define the Zod schema for validation
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  image: z
    .instanceof(File)
    .refine((file) => {
      if (!file) return true;
      return file.type.startsWith("image/"); // Check if file type is an image
    }, "File must be an image")
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024; // Max file size 5MB
    }, "Image must be less than 5MB")
    .optional(),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology must be selected"),
});

type FormData = z.infer<typeof schema>;

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // To manually set values if needed
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  // Function to handle file change and update the form field value
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setValue("image", file); // set value to file or undefined
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form 1: Basic Input</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded-md"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded-md"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Image Field */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*" // To allow only image files
            className="w-full p-2 border rounded-md"
            onChange={handleImageChange} // Custom handler for file input
          />
          {errors.image && typeof errors.image.message === "string" && (
            <p className="text-red-500 text-xs">{errors.image.message}</p>
          )}
        </div>

        {/* Gender button */}
        <div>
          <label htmlFor="">Gender</label>
          <div>
            <label htmlFor="">
              <input
                type="radio"
                value="male"
                {...register("gender")}
                className="mr-2"
              />
              Male
            </label>
            <label htmlFor="">
              <input type="radio" value="female" {...register("gender")} />
              Female
            </label>
            <label htmlFor="">
              <input type="radio" value="other" {...register("gender")} />
              Other
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="">Technologies Known</label>
          <div>
            <div>
              <label htmlFor="">
                <input
                  type="checkbox"
                  value="HTML"
                  {...register("technologies")}
                  className="mr-2"
                />
                HTML
              </label>
            </div>
            <div>
              <label htmlFor="">
                <input
                  type="checkbox"
                  value="Css"
                  {...register("technologies")}
                  className="mr-2"
                />
                Css
              </label>
            </div>
            <div>
              <label htmlFor="">
                <input
                  type="checkbox"
                  value="Js"
                  {...register("technologies")}
                  className="mr-2"
                />
                Js
              </label>
            </div>
            <div>
              <label htmlFor="">
                <input
                  type="checkbox"
                  value="Python"
                  {...register("technologies")}
                  className="mr-2"
                />
                Python
              </label>
            </div>
          </div>
          {errors.technologies && (
            <p className="text-red-500 text-xs">
              {errors.technologies.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
