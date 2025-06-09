"use client";
import {
  useApproveSellerMutation,
  useGetPendingSellerByIdQuery,
  useRejectSellerMutation,
} from "@/store/api/sellerApi";
import React from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SellerInfoItem from "@/components/molecules/sellers/SellerInfoItem";
import ShopDescription from "@/components/molecules/sellers/ShopDescription";
import SellerDocumentLink from "@/components/molecules/sellers/SellerDocumentLink";
import SellerActionButtons from "@/components/molecules/sellers/SellerActionButtons";
import { Button } from "@/components/atoms/Button";
import { MoveLeft } from "lucide-react";

const PendingSellerDetailsWrapper = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const {
    data: pendingSellerDetails,
    isLoading,
    isError,
  } = useGetPendingSellerByIdQuery({ token, id });

  const [approveSeller, { isLoading: isApproving }] =
    useApproveSellerMutation();
  const [rejectSeller, { isLoading: isRejecting }] = useRejectSellerMutation();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading seller details.</p>;

  const seller = pendingSellerDetails?.seller;

  const handleApprove = async () => {
    try {
      const res = await approveSeller({ token, id }).unwrap();
      toast.success(res.message || "Seller approved successfully");
      router.push("/sellers");
    } catch (error: unknown) {
      console.error("Error approving seller:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Failed to approve seller.");
      } else {
        toast.error("Failed to approve seller. Please try again.");
      }
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectSeller({ token, id }).unwrap();
      toast.success(res.message || "Seller rejected successfully");
    } catch (error: unknown) {
      console.error("Error rejecting seller:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Failed to reject seller.");
      } else {
        toast.error("Failed to reject seller. Please try again.");
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Back Button */}
      <Button onClick={() => router.back()}>
        <MoveLeft size={20} />
      </Button>
      <h1 className="text-2xl font-bold text-gray-800">
        Seller Details - {seller?.sellerName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
        <SellerInfoItem label="Email" value={seller?.email} />
        <SellerInfoItem label="Contact" value={seller?.contactNumber} />
        <SellerInfoItem label="Status" value={seller?.status} />
        <SellerInfoItem label="Seller Name" value={seller?.sellerName} />
        <SellerInfoItem label="Shop Name" value={seller?.shopName} />
        <ShopDescription description={seller?.shopDescription || ""} />
        <SellerInfoItem label="Business Type" value={seller?.businessType} />
        <SellerInfoItem
          label="Business Address"
          value={seller?.businessAddress}
        />
        <SellerInfoItem label="City" value={seller?.city} />
        <SellerInfoItem label="State" value={seller?.state} />
        <SellerInfoItem label="Zip Code" value={seller?.zipCode} />
        <SellerInfoItem label="Country" value={seller?.countryName} />
        <SellerInfoItem
          label="Business Reg #"
          value={seller?.businessRegistrationNumber}
        />
        <SellerInfoItem
          label="Tax ID"
          value={seller?.taxIdentificationNumber}
        />
        <SellerInfoItem
          label="Is Verified"
          value={seller?.isVerified ? "Yes" : "No"}
        />
        <SellerInfoItem
          label="Is Approved"
          value={seller?.isApproved ? "Yes" : "No"}
        />
        <SellerInfoItem
          label="Membership Start"
          value={
            seller?.membershipStart
              ? format(new Date(seller.membershipStart), "dd MMM yyyy")
              : "N/A"
          }
        />
        <SellerInfoItem
          label="Membership End"
          value={
            seller?.membershipEnd
              ? format(new Date(seller.membershipEnd), "dd MMM yyyy")
              : "N/A"
          }
        />
        <SellerInfoItem
          label="Website URL"
          value={seller?.websiteURL || "N/A"}
        />

        <SellerDocumentLink
          label="Business License"
          url={seller?.businessLicenseDocument}
        />
        <SellerDocumentLink label="Tax Document" url={seller?.taxDocument} />
        <SellerDocumentLink label="Shop Logo" url={seller?.shopLogo} />

        <SellerInfoItem
          label="Created At"
          value={
            seller?.createdAt
              ? format(new Date(seller.createdAt), "dd MMM yyyy, hh:mm a")
              : "N/A"
          }
        />
        <SellerInfoItem
          label="Updated At"
          value={
            seller?.updatedAt
              ? format(new Date(seller.updatedAt), "dd MMM yyyy, hh:mm a")
              : "N/A"
          }
        />
      </div>
      <SellerActionButtons
        onApprove={handleApprove}
        onReject={handleReject}
        isApproving={isApproving}
        isRejecting={isRejecting}
      />
    </div>
  );
};

export default PendingSellerDetailsWrapper;
