"use client";

import { useState } from "react";
import LogoLink from "../LogoLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import InputField from "./components/InputField";
import { authFormSchema } from "./AutForm.models";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/actions/user.actions";
import PlaidLink from "../PlaidLink";

const AuthForm = ({ formType }: { formType: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = authFormSchema(formType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      //Sign up with AppWrite & create plaid token

      if (formType === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,

          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);

        setUser(newUser);
      }

      if (formType === "log-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <LogoLink />

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link Account"
              : formType === "log-in"
              ? "Log In"
              : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {formType === "sign-up" && (
                <>
                  <div className="flex gap-4 justify-between">
                    <InputField
                      control={form.control}
                      name="firstName"
                      placeholder="ex: John"
                      label="First Name"
                    />
                    <InputField
                      control={form.control}
                      name="lastName"
                      placeholder="ex: Doe"
                      label="Last Name"
                    />
                  </div>

                  <InputField
                    control={form.control}
                    name="address1"
                    placeholder="Enter your specific address"
                    label="Address"
                  />
                  <InputField
                    control={form.control}
                    name="city"
                    placeholder="ex: Chicago"
                    label="City"
                  />
                  <div className="flex gap-4 justify-between">
                    <InputField
                      control={form.control}
                      name="state"
                      placeholder="ex: NY"
                      label="State"
                    />
                    <InputField
                      control={form.control}
                      name="postalCode"
                      placeholder="ex: 11101"
                      label="Postal Code"
                    />
                  </div>

                  <div className="flex gap-4 justify-between">
                    <InputField
                      control={form.control}
                      name="dateOfBirth"
                      placeholder="yyyy-mm-dd"
                      label="Date of Birth"
                    />
                    <InputField
                      control={form.control}
                      name="ssn"
                      placeholder="12345..."
                      label="SSN"
                    />
                  </div>
                </>
              )}

              <InputField
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <InputField
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />

              {formType === "sign-up" && (
                <InputField
                  control={form.control}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                />
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : formType === "log-in" ? (
                    "Log In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {formType === "log-in"
                ? "Don't have an account"
                : "Already have an account?"}
            </p>
            <Link
              href={formType === "log-in" ? "/sign-up" : "/log-in"}
              className="form-link"
            >
              {formType === "log-in" ? "Sign Up" : "Log In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
