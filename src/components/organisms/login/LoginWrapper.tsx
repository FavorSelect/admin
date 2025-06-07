"use client";
import FormHeader from "@/components/molecules/login/FormHeader";
import LoginForm from "@/components/molecules/login/LoginForm";
import React from "react";

const LoginWrapper = () => {
  return (
    <div className="flex justify-center items-center h-screen font-montserrat overflow-hidden">
      <div className="w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
        <FormHeader className="text-center mb-4">Admin Login</FormHeader>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginWrapper;
