import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Please enter a valid email address.")
    .email("Please enter a valid email address.")
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .nonempty("Password is required"),
});

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  isAgreementChecked: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine(data => data.password === data.confPassword, {
  message: "Passwords don't match",
  path: ["confPassword"],
});



export const QueryFormSchema = z.object({
  selectProgramme: z.string(),
  selectSession: z.string(),
  queryTitle: z.string(),
  query: z.string().min(1 , {
    message: 'Query must not be empty',
  }).regex(/^[^!"`'#%&,:;<>=@{}~\$()*+\/\\?\[\]\^|]+$/, {
    message: 'Query must not contain special characters',
  }),
  queryType: z.string(),
});



export const ProfileFormSchema = z.object({
  firstName: z.string().nonempty({ message: "Please enter first name" }),
  phone:z.string().optional(),
  ageGroup: z.string().optional(),
  designation: z.string().optional(),
  website: z.string().optional(),
  profileMessage: z.string().optional(),
  lastName: z.string().nonempty({ message: "Please enter last name" }),
  industry: z.string().optional(),
  city: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  image: z.string().optional(),
  aboutMe: z.string().optional(),
  linkedIn: z.string().optional(),
  areasOfInterest: z.string().optional(),
  visitingCardApproval: z.boolean().optional()
});

export const FeedbackFromSchema = z.object({
  feedback: z.string().nonempty({ message: "Please enter a Query" }),
  experience: z.string(),
  willRecommend:z.boolean(),
});


export const RaiseQueryFormSchema = z.object({
  message: z.string().min(1, "Query should not be empty"),
  needCallBack: z.boolean(),
  phoneNumber: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), {
    message: "Invalid phone number. Please enter a 10-digit number.",
  }),
});
