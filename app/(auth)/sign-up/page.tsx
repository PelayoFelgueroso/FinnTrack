import AuthForm from "@/components/AuthForm/AuthForm";
import React from "react";

const SingUp = async () => {

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm formType="sign-up" />
    </section>
  );
};

export default SingUp;
