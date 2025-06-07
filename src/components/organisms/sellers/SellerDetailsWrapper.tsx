"use client";
import React from "react";

const SellerDetailsWrapper = ({ id, token }: { id: string; token: string }) => {
  return (
    <div>
      SellerDetailsWrapper - ID: {id} and here is token {token}
    </div>
  );
};

export default SellerDetailsWrapper;
